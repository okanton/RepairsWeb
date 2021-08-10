using RepairsWeb.Entities;
using System.Net.Mail;

namespace RepairsWeb.MailSender
{
    public interface IMailSender
    {
        /// <summary>
        /// Рассылка информации по статусу заявки на заправку
        /// </summary>
        /// <param name="id"></param>
        /// <param name="address"></param>
        /// <param name="approvalStatus"></param>
        /// <param name="itUserFullName"></param>
        /// <param name="isNewRequest"></param>
        /// <param name="comment"></param>
        /// <param name="count"></param>
        void SendMail(int id, string address, Entity approvalStatus, string itUserFullName, bool isNewRequest, string comment, int count = 0);

        /// <summary>
        /// Рассылка информации по статусу заявки на ремотн оборудования
        /// </summary>
        /// <param name="id"></param>
        /// <param name="approvalStatus"></param>
        /// <param name="itUserFullName"></param>
        /// <param name="isNewRequest"></param>
        /// <param name="attachment"></param>
        /// <param name="comment"></param>
        void SendMail(int id, Entity approvalStatus, string itUserFullName, bool isNewRequest, string attachment, string comment);
    }
}