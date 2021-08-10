using RepairsData.RepairsContext.Models;
using System.Collections.Generic;
using System.Net.Mail;

namespace RepairsWeb.Data.Interfaces
{
    public interface IMailService
    {
        public IEnumerable<Mails> AllMails { get; }

        public int DeleteMail(int mailId);

        public MailAddressCollection GetMailAddressesByMailType(TaskTypesEnum mailTypes);

        public Mails SaveMail(Mails mail);
    }
}