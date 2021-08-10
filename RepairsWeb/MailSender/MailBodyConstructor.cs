using RepairsWeb.Entities;
using System.IO;
using System.Runtime.Versioning;

namespace RepairsWeb.MailSender
{
    [SupportedOSPlatform("windows")]
    public static class MailBodyConstructor
    {
        public static string GetLink(TaskTypesEnum taskType)
        {
            var mailBody = string.Empty;
            var templatePath = @".\MailSender\HTMLTemplates\Link.html";
            using (StreamReader reader = new(templatePath))
            {
                mailBody = reader.ReadToEnd();
            }

            mailBody = mailBody.Replace("{taskType}", taskType == TaskTypesEnum.ЗаявкаНаРемонт ? "repairs" : "refillings");

            return mailBody;
        }

        public static string GetSignature(Person user)
        {
            var mailBody = string.Empty;
            var templatePath = @".\MailSender\HTMLTemplates\Signature.html";
            using (StreamReader reader = new(templatePath))
            {
                mailBody = reader.ReadToEnd();
            }

            mailBody = mailBody.Replace("{itPositionSign}", user.OfficePosition.ToLower());
            mailBody = mailBody.Replace("{itFullNameSign}", user.FullName);
            mailBody = mailBody.Replace("{itPhoneSign}", user.Phone);
            mailBody = mailBody.Replace("{itMobilePhoneSign}", user.MobilePhone);
            mailBody = mailBody.Replace("{itMailSign}", user.Mail);

            return mailBody;
        }

        public static string GetMailHeader(string textHeader)
        {
            return $"<h3 style=\"font - family: Calibri; margin-left: 10px;\">{textHeader}</h3>";
        }

        public static string GetMailComment(string comment)
        {
            return $"<h3 style=\"font - family: Calibri; margin-left: 10px;\">Добавлен комментарий: {comment}</h3>";
        }

        public static string GetRepairMailBody(RepairMailBodyParameter bodyParameter)
        {
            var mailBody = string.Empty;
            var templatePath = @".\MailSender\HTMLTemplates\RepairTemplate.html";
            using (StreamReader reader = new(templatePath))
            {
                mailBody = reader.ReadToEnd();
            }

            mailBody = mailBody.Replace("{id}", bodyParameter.Id.ToString());
            mailBody = mailBody.Replace("{requestNumber}", bodyParameter.RequestNumber);
            mailBody = mailBody.Replace("{trouble}", bodyParameter.Trouble);
            mailBody = mailBody.Replace("{modelType}", bodyParameter.ModelType);
            mailBody = mailBody.Replace("{model}", bodyParameter.Model);
            mailBody = mailBody.Replace("{serialNumber}", bodyParameter.SerialNumber);
            mailBody = mailBody.Replace("{clientFullName}", bodyParameter.ClientFullName);
            mailBody = mailBody.Replace("{clientOrganization}", bodyParameter.ClientOrganization);
            mailBody = mailBody.Replace("{clientDepartment}", bodyParameter.ClientDepartment);
            mailBody = mailBody.Replace("{address}", bodyParameter.Address);
            mailBody = mailBody.Replace("{room}", bodyParameter.Room);
            mailBody = mailBody.Replace("{clientPhone}", bodyParameter.ClientPhone);
            mailBody = mailBody.Replace("{itCreatorFullName}", bodyParameter.ItCreatorFullName);
            mailBody = mailBody.Replace("{itCreatorPhone}", bodyParameter.ItCreatorPhone);
            mailBody = mailBody.Replace("{itCreatorMobilePhone}", bodyParameter.ItCreatorMobilePhone);
            mailBody = mailBody.Replace("{information}", bodyParameter.Information);
            mailBody = mailBody.Replace("{configurationUnitId}", bodyParameter.ConfigurationUnitId);

            return mailBody;
        }

        public static string GetRefillingMailBody(RefillingMailBodyParameter bodyParameter)
        {
            var mailBody = string.Empty;
            var templatePath = @".\MailSender\HTMLTemplates\RefillingTemplate.html";
            using (StreamReader reader = new(templatePath))
            {
                mailBody = reader.ReadToEnd();
            }

            mailBody = mailBody.Replace("{id}", bodyParameter.Id.ToString());
            mailBody = mailBody.Replace("{amountOfCartstr}", bodyParameter.CountCartridge.ToString());
            mailBody = mailBody.Replace("{addressstr}", bodyParameter.Address);

            return mailBody;
        }
    }
}