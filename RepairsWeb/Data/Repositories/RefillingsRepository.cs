using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RepairsData.RepairsContext;
using RepairsData.RepairsContext.Models;
using RepairsWeb.Data.Interfaces;
using RepairsWeb.Entities;
using RepairsWeb.Extentions;
using RepairsWeb.MailSender;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Versioning;
using System.Threading.Tasks;

namespace RepairsWeb.Data.Repositories
{
    [SupportedOSPlatform("windows")]
    public class RefillingsRepository : IRefillings
    {
        private readonly ILogger<RepairsRepository> logger;
        private readonly IMailSender mailSender;
        private readonly RepairsContext repairsContext;
        private readonly IRoleProvider roleProvider;
        private readonly IUserService userService;

        public RefillingsRepository(RepairsContext repairsContext, IUserService userService, IMailSender mailSender, IRoleProvider roleProvider, ILogger<RepairsRepository> logger)
        {
            this.repairsContext = repairsContext;
            this.userService = userService;
            this.mailSender = mailSender;
            this.roleProvider = roleProvider;
            this.logger = logger;
        }

        public decimal GetEconomyRefillingsMoneyForCurrentPeriod
        {
            get
            {
                try
                {
                    var currentLimit = repairsContext.Limits.FirstOrDefault(p => p.ServiceTypeId == (int)TaskTypesEnum.ЗаявкаНаЗаправку
                                                                             && p.DateFrom <= DateTime.Today
                                                                             && p.DateTo >= DateTime.Today);

                    if (currentLimit != null)
                    {
                        var startYear = new DateTime(DateTime.Today.Year, 1, 1, 0, 0, 0);

                        var sumCostFromStartYear = repairsContext.Refillings.Where(p => p.ApprovalStatusId == (int)ApprovalStatusesEnum.Завершено
                                                                   && p.ExecuteDate >= startYear
                                                                   && p.ExecuteDate <= DateTime.Today)
                                                                .Sum(m => m.Money);

                        var economy = currentLimit.Limit * DateTime.Today.Month - sumCostFromStartYear;
                        return economy;
                    }

                    return 0;
                }
                catch (Exception ex)
                {
                    SendError(ex);
                    throw;
                }
            }
        }

        public Refilling ChangeApprovalStatus(ApprovalStatusParameter approvalStatusParameter)
        {
            try
            {
                var approvableRefilling = repairsContext.Refillings.FirstOrDefault(p => p.Id == approvalStatusParameter.Id);
                if (approvableRefilling != null)
                {
                    approvableRefilling.ApprovalStatusId = approvalStatusParameter.ApprovalStatusId;
                    approvableRefilling.Money = approvalStatusParameter.Money;
                    approvableRefilling.ExecuteDate = approvalStatusParameter.ApprovalStatusId == (int)ApprovalStatusesEnum.Завершено ? approvalStatusParameter.ExecuteDate : null;
                    approvableRefilling.Comment = approvalStatusParameter.ApprovalStatusId == (int)ApprovalStatusesEnum.Завершено ? approvalStatusParameter.Comment : null;

                    var limit = repairsContext.Limits.FirstOrDefault(p => approvalStatusParameter.ExecuteDate >= p.DateFrom
                                                                         && approvalStatusParameter.ExecuteDate <= p.DateTo
                                                                         && p.ServiceTypeId == (int)TaskTypesEnum.ЗаявкаНаЗаправку);
                    if (limit != null)
                        approvableRefilling.LimitId = limit.Id;

                    repairsContext.SaveChanges();
                }
                var changedRefilling = GetRefillingById(approvableRefilling.Id);
                mailSender.SendMail(changedRefilling.Id, changedRefilling.Address.Value, changedRefilling.ApprovalStatus, changedRefilling.ItUser.FullUserName, false, changedRefilling.Comment, changedRefilling.Count);

                return changedRefilling;
            }
            catch (Exception ex)
            {
                SendError(ex);
                throw;
            }
        }

        public decimal GetCompleteRefillingsMoneyByPeriod(DateTime dateFrom, DateTime dateTo)
        {
            try
            {
                var result = repairsContext.Refillings.Where(p => p.ApprovalStatusId == (int)ApprovalStatusesEnum.Завершено
                                                                   && p.ExecuteDate >= dateFrom
                                                                   && p.ExecuteDate <= dateTo).ToList().Sum(p => p.Money);
                return result;
            }
            catch (Exception ex)
            {
                SendError(ex);
                throw;
            }
        }

        public async Task<IEnumerable<Refilling>> GetRefillingsByFilterParameters(FilterParameters filterParameters)
        {
            try
            {
                var objects = await roleProvider.GetIdSourceObjectsForUserSIDRole(userService.UserSID, "User", 0);

                var result = await (from refilling in repairsContext.Refillings
                                    join address in repairsContext.Addresses on refilling.AddressId equals address.Id
                                    join apprSt in repairsContext.ApprovalStatuses on refilling.ApprovalStatusId equals apprSt.Id
                                    where (refilling.ExecuteDate.Value.Date >= filterParameters.DateFrom.Value.Date
                                          && refilling.ExecuteDate.Value.Date <= filterParameters.DateTo.Value.Date
                                          && refilling.ApprovalStatusId == filterParameters.ApprovalStatusId)
                                          ||
                                          ((refilling.CreateDate.Date >= filterParameters.DateFrom.Value.Date)
                                          && (refilling.CreateDate.Date <= filterParameters.DateTo.Value.Date)
                                          && (filterParameters.AddressId == -1 || refilling.AddressId == filterParameters.AddressId.Value)
                                          && (filterParameters.ApprovalStatusId == -1 || refilling.ApprovalStatusId == filterParameters.ApprovalStatusId.Value))
                                    select new Refilling
                                    {
                                        Id = refilling.Id,
                                        Address = new Entity { Id = address.Id, Value = address.Value },
                                        ApprovalStatus = new Entity { Id = apprSt.Id, Value = apprSt.Value },
                                        Count = refilling.Count,
                                        CreateDate = refilling.CreateDate,
                                        ExecuteDate = refilling.ExecuteDate,
                                        Money = refilling.Money,
                                        ItUser = new User { FullUserName = refilling.ItUser, UserDepartment = refilling.ItUserDepartment },
                                        Comment = refilling.Comment
                                    }).Where(p => objects.Contains(p.Address.Id)).ToListAsync();
                return result;
            }
            catch (Exception ex)
            {
                SendError(ex);
                throw;
            }
        }

        public Refilling InsertNewRefilling(Refilling refilling)
        {
            try
            {
                var user = userService.CurrentUserInformation;
                var newRefilling = new Refillings
                {
                    AddressId = refilling.Address.Id,
                    ApprovalStatusId = (int)ApprovalStatusesEnum.НаСогласовании,
                    Count = refilling.Count,
                    CreateDate = DateTime.Now,
                    Money = 0,
                    ItUser = user.FullName,
                    ItUserDepartment = user.Department
                };
                repairsContext.Refillings.Add(newRefilling);
                repairsContext.SaveChanges();

                var addedRefiling = GetRefillingById(newRefilling.Id);

                if (addedRefiling != null)
                {
                    mailSender.SendMail(addedRefiling.Id, addedRefiling.Address.Value, addedRefiling.ApprovalStatus, addedRefiling.ItUser.FullUserName, true, null, addedRefiling.Count);
                    return addedRefiling;
                }
                else throw new Exception("Произошла ошибка на этапе добавления заявки на заправку");
            }
            catch (Exception ex)
            {
                SendError(ex);
                throw;
            }
        }

        private Refilling GetRefillingById(int refillingId)
        {
            return (from refilling in repairsContext.Refillings
                    join address in repairsContext.Addresses on refilling.AddressId equals address.Id
                    join apprSt in repairsContext.ApprovalStatuses on refilling.ApprovalStatusId equals apprSt.Id
                    where refilling.Id == refillingId
                    select new Refilling
                    {
                        Id = refilling.Id,
                        Address = new Entity { Id = address.Id, Value = address.Value },
                        ApprovalStatus = new Entity { Id = apprSt.Id, Value = apprSt.Value },
                        Count = refilling.Count,
                        CreateDate = refilling.CreateDate,
                        Money = refilling.Money,
                        ExecuteDate = refilling.ExecuteDate.Value,
                        ItUser = new User { FullUserName = refilling.ItUser, UserDepartment = refilling.ItUserDepartment },
                        Comment = refilling.Comment
                    }).FirstOrDefault();
        }

        private void SendError(Exception ex)
        {
            logger.LogError(ex.GetErrorString());
        }
    }
}