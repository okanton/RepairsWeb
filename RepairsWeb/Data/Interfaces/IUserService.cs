using RepairsWeb.Entities;
using System.Net.Mail;
using System.Security.Principal;

namespace RepairsWeb.Data.Interfaces
{
    public interface IUserService
    {
        public string UserNameWithinDomain { get; }

        public string UserNameWithoutDomain { get; }

        public string UserName { get; }

        public SecurityIdentifier UserSID { get; }

        public string UserFullName { get; }

        public string UserMail { get; }

        public string UserPhone { get; }

        public string UserMobilePhone { get; }

        public string UserDepartment { get; }

        public string UserCompany { get; }

        public string UserAddress { get; }

        public string UserRoom { get; }

        public string UserPosition { get; }

        public MailAddressCollection GetEmailByFullName(string fullName);

        public Person GetUserInformationBySid(SecurityIdentifier sid);

        public Person CurrentUserInformation { get; }

        public SecurityIdentifier GetUserSIDByFullUserName(string fullName);
    }
}