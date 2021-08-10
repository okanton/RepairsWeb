using Microsoft.EntityFrameworkCore;
using RepairsData.RepairsContext;
using RepairsData.RepairsContext.Models;
using RepairsWeb.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;

namespace RepairsWeb.Data.Repositories
{
    public class MailServiceRepository : IMailService
    {
        private readonly RepairsContext repairsContext;

        public MailServiceRepository(RepairsContext repairsContext)
        {
            this.repairsContext = repairsContext;
        }

        public IEnumerable<Mails> AllMails
        {
            get
            {
                try
                {
                    var result = repairsContext.Mails.ToList();
                    return result;
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        public int DeleteMail(int mailId)
        {
            try
            {
                var deleting = repairsContext.Mails.FirstOrDefault(p => p.Id == mailId);
                if (deleting != null)
                {
                    repairsContext.Mails.Remove(deleting);
                    repairsContext.SaveChanges();
                }
                return mailId;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public MailAddressCollection GetMailAddressesByMailType(TaskTypesEnum mailTypes)
        {
            var mails = repairsContext.Mails.Where(p => p.ServiceTypeId == (int)mailTypes && p.IsActive == true).ToList();
            var result = new MailAddressCollection();
            foreach (var mail in mails)
            {
                result.Add(mail.Mail);
            }
            return result;
        }

        public Mails SaveMail(Mails mail)
        {
            try
            {
                var currentMail = repairsContext.Mails.FirstOrDefault(p => p.Id == mail.Id);

                if (currentMail == null)
                    return AddNewMail(mail);
                else
                    return EditMail(mail);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private Mails AddNewMail(Mails mail)
        {
            var newMail = new Mails
            {
                Mail = mail.Mail,
                ServiceTypeId = mail.ServiceTypeId,
                Name = mail.Name,
                IsActive = mail.IsActive
            };

            repairsContext.Mails.Add(newMail);
            repairsContext.SaveChanges();

            var addedMail = repairsContext.Mails.FirstOrDefault(p => p.Id == newMail.Id);
            if (addedMail != null)
            {
                return addedMail;
            }
            else throw new Exception("Возникла ошибка на этапе добавления адреса рассылки");
        }

        private Mails EditMail(Mails mail)
        {
            try
            {
                var editingMail = repairsContext.Mails.FirstOrDefault(p => p.Id == mail.Id);

                editingMail.Mail = mail.Mail;
                editingMail.ServiceTypeId = mail.ServiceTypeId;
                editingMail.Name = mail.Name;
                editingMail.IsActive = mail.IsActive;
                repairsContext.SaveChanges();

                return editingMail;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}