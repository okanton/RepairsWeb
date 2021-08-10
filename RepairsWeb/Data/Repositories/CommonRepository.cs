using RepairsData.RepairsContext;
using RepairsData.RepairsContext.Models;
using RepairsWeb.Data.Interfaces;
using RepairsWeb.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RepairsWeb.Data.Repositories
{
    public class CommonRepository : ICommon
    {
        private readonly RepairsContext repairsContext;
        private readonly IRoleProvider roleProvider;
        private readonly IUserService userService;

        public CommonRepository(RepairsContext repairsContext, IRoleProvider roleProvider, IUserService userService)
        {
            this.repairsContext = repairsContext;
            this.roleProvider = roleProvider;
            this.userService = userService;
        }

        public IEnumerable<Addresses> Addresses
        {
            get
            {
                try
                {
                    var roles = roleProvider.GetRolesForUserSID(userService.UserSID).Result;

                    if (roles.Contains("Administrator"))
                    {
                        return repairsContext.Addresses.ToList();
                    }

                    if (roles.Contains("User"))
                    {
                        var objects = roleProvider.GetIdSourceObjectsForUserSIDRole(userService.UserSID, "User", 0).Result;
                        return repairsContext.Addresses.Where(p => objects.Contains(p.Id)).ToList();
                    }
                    return new List<Addresses>();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        public IEnumerable<ApprovalStatuses> AllApprovalStatuses
        {
            get
            {
                try
                {
                    return repairsContext.ApprovalStatuses.ToList();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        private IEnumerable<ApprovalStatuses> ApprovalStatusesByRole
        {
            get
            {
                try
                {
                    var roles = roleProvider.GetRolesForUserSID(userService.UserSID).Result;
                    if (roles.Contains("Administrator"))
                    {
                        return AllApprovalStatuses;
                    }
                    else if (roles.Contains("RequestManager"))
                    {
                        return AllApprovalStatuses.Where(p => p.Id != (int)ApprovalStatusesEnum.Завершено).ToList();
                    }
                    else
                    {
                        return AllApprovalStatuses.Where(p => p.Id != (int)ApprovalStatusesEnum.Завершено
                                                                    && p.Id != (int)ApprovalStatusesEnum.НаСогласовании
                                                                    && p.Id != (int)ApprovalStatusesEnum.Отклонено
                                                                    && p.Id != (int)ApprovalStatusesEnum.Согласовано).ToList();
                    }
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        public IEnumerable<DeviceTypes> DeviceTypes
        {
            get
            {
                try
                {
                    return repairsContext.DeviceTypes.ToList();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        public IEnumerable<Organizations> Organizations
        {
            get
            {
                try
                {
                    return repairsContext.Organizations.ToList();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }

        public UserAccessInformation AccessInformation
        {
            get
            {
                try
                {
                    var roles = roleProvider.GetRolesForUserSID(userService.UserSID).Result;

                    if (roles.Contains("User"))
                    {
                        var user = userService.CurrentUserInformation;

                        var result = new UserAccessInformation
                        {
                            IsAuth = true,
                            Roles = roles,
                            ApprovalStatusesByRoles = ApprovalStatusesByRole,
                            UserName = user.UserName,
                            UserFullName = user.FullName
                        };
                        return result;
                    }
                    else return new UserAccessInformation();
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }
    }
}