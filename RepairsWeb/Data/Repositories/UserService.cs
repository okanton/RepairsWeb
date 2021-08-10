using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using RepairsWeb.Data.Interfaces;
using RepairsWeb.Entities;
using System;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.Net.Mail;
using System.Runtime.Versioning;
using System.Security.Claims;
using System.Security.Principal;

namespace RepairsWeb.Data.Repositories
{
    [SupportedOSPlatform("windows")]
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor accessor;
        private readonly ILogger<UserService> logger;

        public UserService(IHttpContextAccessor accessor, ILogger<UserService> logger)
        {
            this.accessor = accessor;
            this.logger = logger;
        }

        public string UserName
        {
            get => accessor.HttpContext.User.Identity.Name ?? Environment.UserName;
        }

        public Person CurrentUserInformation => GetUserInformationBySid(UserSID);

        public Person GetUserInformationBySid(SecurityIdentifier sid)
        {
            var context = new PrincipalContext(ContextType.Domain, "ad.ies-holding.com");
            var user = UserPrincipal.FindByIdentity(context, sid.Value);
            var properties = GetADAttributes(user.SamAccountName).Properties;

            var person = new Person
            {
                UserName = user.SamAccountName,
                FullName = user.DisplayName,
                Address = GetValueFromProperty(properties, "streetAddress"),
                Company = GetValueFromProperty(properties, "company"),
                Department = GetValueFromProperty(properties, "telephoneAssistant"),
                Mail = GetValueFromProperty(properties, "mail"),
                MobilePhone = GetValueFromProperty(properties, "mobile"),
                OfficePosition = GetValueFromProperty(properties, "title"),
                Phone = GetValueFromProperty(properties, "pager"),
                Room = GetValueFromProperty(properties, "physicalDeliveryOfficeName")
            };
            return person;
        }

        private string GetValueFromProperty(ResultPropertyCollection properties, string parameter)
        {
            return properties.Contains(parameter) ? properties[parameter][0].ToString() : string.Empty;
        }

        public SecurityIdentifier UserSID
        {
            get
            {
                var claim = accessor.HttpContext.User.FindFirst(ClaimTypes.PrimarySid);

                if (claim != null)
                {
                    return new SecurityIdentifier(claim.Value);
                }
                logger.LogError("SID пользователя не определен");
                throw new Exception("SID пользователя не определен");
            }
        }

        public string UserNameWithinDomain => UserName.Contains("IES") ? UserName : string.Format("IES\\{0}", UserName);

        public string UserNameWithoutDomain => !UserName.Contains("IES") ? UserName : UserName.Remove(0, 4);

        public string UserFullName
        {
            get
            {
                var properties = GetADAttributes(UserNameWithoutDomain).Properties;
                if (properties.Contains("name"))
                    return properties["name"][0].ToString();
                else return string.Empty;
            }
        }

        public string UserMail
        {
            get
            {
                var properties = GetADAttributes(UserNameWithoutDomain).Properties;
                if (properties.Contains("mail"))
                    return properties["mail"][0].ToString();
                else return string.Empty;
            }
        }

        public string UserPhone
        {
            get
            {
                var properties = GetADAttributes(UserNameWithoutDomain).Properties;
                if (properties.Contains("pager"))
                    return properties["pager"][0].ToString();
                else return string.Empty;
            }
        }

        public string UserMobilePhone
        {
            get
            {
                var properties = GetADAttributes(UserNameWithoutDomain).Properties;
                if (properties.Contains("mobile"))
                    return properties["mobile"][0].ToString();
                else return string.Empty;
            }
        }

        public string UserDepartment
        {
            get
            {
                var properties = GetADAttributes(UserNameWithoutDomain).Properties;
                if (properties.Contains("telephoneAssistant"))
                    return properties["telephoneAssistant"][0].ToString();
                else return string.Empty;
            }
        }

        public string UserCompany
        {
            get
            {
                var properties = GetADAttributes(UserNameWithoutDomain).Properties;
                if (properties.Contains("company"))
                    return properties["company"][0].ToString();
                else
                    return string.Empty;
            }
        }

        public string UserAddress
        {
            get
            {
                var properties = GetADAttributes(UserNameWithoutDomain).Properties;
                if (properties.Contains("streetAddress"))
                    return properties["streetAddress"][0].ToString();
                else
                    return string.Empty;
            }
        }

        public string UserRoom
        {
            get
            {
                var properties = GetADAttributes(UserNameWithoutDomain).Properties;
                if (properties.Contains("physicalDeliveryOfficeName"))
                    return properties["physicalDeliveryOfficeName"][0].ToString();
                else
                    return string.Empty;
            }
        }

        public string UserPosition
        {
            get
            {
                var properties = GetADAttributes(UserNameWithoutDomain).Properties;
                if (properties.Contains("title"))
                    return properties["title"][0].ToString();
                else
                    return string.Empty;
            }
        }

        public SecurityIdentifier GetUserSIDByFullUserName(string fullName)
        {
            var properties = GetADAttributes(fullName, true).Properties;
            if (properties.Contains("objectSid"))
                return new SecurityIdentifier((byte[])properties["objectSid"][0], 0);
            return null;
        }

        public MailAddressCollection GetEmailByFullName(string fullName)
        {
            var result = GetADAttributes(fullName, true);

            var email = new MailAddressCollection();
            if (result.Properties.Contains("mail"))
            {
                email.Add(result.Properties["mail"][0].ToString());
            }

            return email;
        }

        private static SearchResult GetADAttributes(string userName, bool isFullUserName = false)
        {
            string[] propertiesToLoad = new[] { "title",    //Должность
                                                "name",     //ФИО
                                                "pager",    //Рабочий телефон
                                                "mobile",   //Мобильный телефон
                                                "mail",     //Почта
                                                "telephoneAssistant", //Отдел
                                                "company", //Компания
                                                "streetAddress", //Улица
                                                "physicalDeliveryOfficeName", //Комната
                                                "objectSid"
                                              };

            if (userName != null)
            {
                var entry = new DirectoryEntry();

                var search = new DirectorySearcher(entry)
                {
                    Filter = isFullUserName ? $"(cn={userName}*)" : $"(&(objectCategory=person)(objectClass=user)(sAMAccountName={userName}))"
                };
                search.PropertiesToLoad.AddRange(propertiesToLoad);

                return search.FindOne();
            }
            return null;
        }
    }
}