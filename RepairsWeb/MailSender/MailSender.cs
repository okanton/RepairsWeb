using Microsoft.Extensions.Options;
using RepairsWeb.Data.Interfaces;
using RepairsWeb.Entities;
using RepairsWeb.Extentions;
using System;
using System.Net.Mail;
using System.Runtime.Versioning;
using System.Text;

namespace RepairsWeb.MailSender
{
    [SupportedOSPlatform("windows")]
    public class MailSender : IMailSender
    {
        private readonly IOptions<SmtpSettings> smtpOptions;
        private readonly IOptions<RepairsSettings> applicationOptions;
        private readonly IRoleProvider roleProvider;
        private readonly IMailService mailService;
        private readonly IUserService userService;

        private MailAddressCollection mailsCcAdmins = new();

        public MailSender(IOptions<SmtpSettings> smtpOptions, IOptions<RepairsSettings> applicationOptions, IRoleProvider roleProvider, IMailService mailService, IUserService userService)
        {
            this.smtpOptions = smtpOptions;
            this.applicationOptions = applicationOptions;
            this.roleProvider = roleProvider;
            this.mailService = mailService;
            this.userService = userService;
        }

        private SmtpClient GetInstance()
        {
            try
            {
                return new SmtpClient(smtpOptions.Value.Host, smtpOptions.Value.Port);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async void SendMail(int id, string address, Entity approvalStatus, string itUserFullName, bool isNewRequest, string comment, int count = 0)
        {
            try
            {
                mailsCcAdmins = Utilities.GetMailAddresses(await roleProvider.GetMaisByRole("Administrator"));

                if (approvalStatus.Id == (int)ApprovalStatusesEnum.Согласовано)
                {
                    SendMailForExecuter(address, count);
                    SendMailForItUser(id, address, approvalStatus.Value, itUserFullName, isNewRequest, count, comment);
                }
                else
                {
                    SendMailForItUser(id, address, approvalStatus.Value, itUserFullName, isNewRequest, count, comment);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async void SendMail(int id, Entity approvalStatus, string itUserFullName, bool isNewRequest, string attachment, string comment)
        {
            try
            {
                mailsCcAdmins = Utilities.GetMailAddresses(await roleProvider.GetMaisByRole("Administrator"));
                if (approvalStatus.Id == (int)ApprovalStatusesEnum.Согласовано)
                {
                    SendMailForExecuter(attachment);
                    SendMailForItUser(id, approvalStatus.Value, itUserFullName, isNewRequest, attachment, comment);
                }
                else
                {
                    SendMailForItUser(id, approvalStatus.Value, itUserFullName, isNewRequest, attachment, comment);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        private void SendMailForExecuter(string address, int count)
        {
            var subject = string.Format("Заявка на заправку картриджей для площадки {0}", address);
            var generalText = MailBodyConstructor.GetMailHeader($"Прошу организовать заправку картриджей в количестве {count} штук");
            var sign = MailBodyConstructor.GetSignature(userService.CurrentUserInformation);
            var mailBody = generalText + sign;
            var mailsTo = mailService.GetMailAddressesByMailType(TaskTypesEnum.ЗаявкаНаЗаправку);

            var mailMessage = new MailMessageBuilder()
                   .From(applicationOptions.Value.From, applicationOptions.Value.Title)
                   .To(mailsTo)
                   .Subject(subject)
                   .Body(mailBody, Encoding.UTF8)
                   .Cc(mailsCcAdmins)
                   .Cc(applicationOptions.Value.MailDeveloper)
                   .Build();

            var smtp = GetInstance();
            smtp.SendMailAsync(mailMessage);
        }

        private void SendMailForExecuter(string attachment)
        {
            var subject = "Заявка на ремонт оборудования";
            var header = MailBodyConstructor.GetMailHeader("Прошу принять заявку на ремонт оборудования");
            var sign = MailBodyConstructor.GetSignature(userService.CurrentUserInformation);
            var mailBody = header + attachment + sign;
            var mailsTo = mailService.GetMailAddressesByMailType(TaskTypesEnum.ЗаявкаНаРемонт);
            var mailMessage = new MailMessageBuilder()
                   .From(applicationOptions.Value.From, applicationOptions.Value.Title)
                   .To(mailsTo)
                   .Subject(subject)
                   .Body(mailBody, Encoding.UTF8)
                   .Cc(applicationOptions.Value.MailDeveloper)
                   .Build();

            var smtp = GetInstance();
            smtp.SendMailAsync(mailMessage);
        }

        private async void SendMailForItUser(int id, string address, string status, string fullUserName, bool isNewRequest, int count, string comment)
        {
            string subject;
            string mailBody;
            MailAddressCollection mailsTo;
            var sign = MailBodyConstructor.GetSignature(userService.CurrentUserInformation);

            if (isNewRequest)
            {
                mailsTo = Utilities.GetMailAddresses(await roleProvider.GetMaisByRole("RequestManager"));
                subject = "Согласование заправки картриджей";
                var mainText = MailBodyConstructor.GetMailHeader($"Прошу согласовать заявку № {id} на заправку {count} картриджей для площадки {address}");
                var link = MailBodyConstructor.GetLink(TaskTypesEnum.ЗаявкаНаЗаправку);
                mailBody = mainText + link + sign;
            }
            else
            {
                subject = string.Format("Статус выполнения заявки на заправку № {0}", id);
                var mainText = MailBodyConstructor.GetMailHeader($"Статус согласования по заявке № {id} изменен на {status}");
                var mailComment = comment != null ? MailBodyConstructor.GetMailComment(comment) : null;
                mailBody = mainText + mailComment + sign;
                mailsTo = userService.GetEmailByFullName(fullUserName);
            }

            var mailMessage = new MailMessageBuilder()
                   .From(applicationOptions.Value.From, applicationOptions.Value.Title)
                   .To(mailsTo)
                   .Subject(subject)
                   .Body(mailBody, Encoding.UTF8)
                   .Cc(mailsCcAdmins)
                   .Cc(applicationOptions.Value.MailDeveloper)
                   .Build();

            var smtp = GetInstance();
            await smtp.SendMailAsync(mailMessage);
        }

        private async void SendMailForItUser(int id, string status, string fullUserName, bool isNewRequest, string attachment, string comment)
        {
            string subject;
            string mailBody;
            MailAddressCollection mailsTo;
            var sign = MailBodyConstructor.GetSignature(userService.CurrentUserInformation);

            if (isNewRequest)
            {
                mailsTo = Utilities.GetMailAddresses(await roleProvider.GetMaisByRole("RequestManager"));
                subject = "Согласование ремонта оборудования";
                var mailHeader = MailBodyConstructor.GetMailHeader("Прошу согласовать заявку на ремонт оборудования");
                mailBody = mailHeader + attachment + sign;
            }
            else
            {
                subject = string.Format("Статус выполнения заявки на ремонт № {0}", id);
                var header = MailBodyConstructor.GetMailHeader(string.Format("Статус согласования по заявке № {0} изменен на {1}", id, status));
                var mailComment = comment != null ? MailBodyConstructor.GetMailComment(comment) : null;
                mailBody = header + mailComment + attachment + sign;
                mailsTo = userService.GetEmailByFullName(fullUserName);
            }

            var mailMessage = new MailMessageBuilder()
                   .From(applicationOptions.Value.From, applicationOptions.Value.Title)
                   .To(mailsTo)
                   .Subject(subject)
                   .Body(mailBody, Encoding.UTF8)
                   .Cc(mailsCcAdmins)
                   .Cc(applicationOptions.Value.MailDeveloper)
                   .Build();

            var smtp = GetInstance();
            await smtp.SendMailAsync(mailMessage);
        }
    }
}