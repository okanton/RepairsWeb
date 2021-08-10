using System.Net.Mail;
using System.Text;

namespace RepairsWeb.MailSender
{
    public sealed class MailMessageBuilder
    {
        private readonly MailMessage mailMessage = new();

        public MailMessageBuilder From(string address)
        {
            mailMessage.From = new MailAddress(address);
            return this;
        }

        public MailMessageBuilder From(string address, string displayName)
        {
            mailMessage.From = new MailAddress(address, displayName);
            return this;
        }

        public MailMessageBuilder From(MailAddress address)
        {
            mailMessage.From = address;
            return this;
        }

        public MailMessageBuilder To(string address)
        {
            mailMessage.To.Add(address);
            return this;
        }

        public MailMessageBuilder To(MailAddressCollection addresses)
        {
            foreach (var address in addresses)
            {
                mailMessage.To.Add(address);
            }
            return this;
        }

        public MailMessageBuilder Cc(string address)
        {
            mailMessage.CC.Add(address);
            return this;
        }

        public MailMessageBuilder Cc(MailAddressCollection addresses)
        {
            foreach (var address in addresses)
            {
                mailMessage.CC.Add(address);
            }
            return this;
        }

        public MailMessageBuilder Subject(string subject)
        {
            mailMessage.Subject = subject;
            return this;
        }

        public MailMessageBuilder Body(string body, Encoding encoding, bool isBodyHtml = true)
        {
            mailMessage.Body = body;
            mailMessage.BodyEncoding = encoding;
            mailMessage.IsBodyHtml = isBodyHtml;
            return this;
        }

        public MailMessageBuilder Attachment(string attachment)
        {
            mailMessage.Attachments.Add(new System.Net.Mail.Attachment(attachment));
            return this;
        }

        public MailMessageBuilder Attachment(AttachmentCollection attachments)
        {
            foreach (var attachment in attachments)
            {
                mailMessage.Attachments.Add(attachment);
            }
            return this;
        }

        public MailMessage Build()
        {
            return mailMessage;
        }
    }
}