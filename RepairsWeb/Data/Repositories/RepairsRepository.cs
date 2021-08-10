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
    public class RepairsRepository : IRepairs
    {
        private readonly ILogger<RepairsRepository> logger;
        private readonly IMailSender mailSender;
        private readonly RepairsContext repairsContext;
        private readonly IRoleProvider roleProvider;
        private readonly IUserService userService;

        public RepairsRepository(RepairsContext repairsContext, IUserService userService, IMailSender mailSender, IRoleProvider roleProvider, ILogger<RepairsRepository> logger)
        {
            this.repairsContext = repairsContext;
            this.userService = userService;
            this.mailSender = mailSender;
            this.roleProvider = roleProvider;
            this.logger = logger;
        }

        public decimal GetEconomyRepairsMoneyForCurrentPeriod
        {
            get
            {
                try
                {
                    var currentLimit = repairsContext.Limits.FirstOrDefault(p => p.ServiceTypeId == (int)TaskTypesEnum.ЗаявкаНаРемонт
                                                                            && p.DateFrom <= DateTime.Today
                                                                            && p.DateTo >= DateTime.Today);

                    if (currentLimit != null)
                    {
                        var startYear = new DateTime(DateTime.Today.Year, 1, 1, 0, 0, 0);

                        var sumCostFromStartYear = repairsContext.Repairs.Where(p => p.ApprovalStatusId == (int)ApprovalStatusesEnum.Завершено
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

        public Repair ChangeApprovalStatus(ApprovalStatusParameter approvalStatusParameter)
        {
            try
            {
                logger.LogInformation("ChangeApprovalStatus");
                logger.LogInformation($"User: {userService.UserName}");
                logger.LogInformation($"ID: {approvalStatusParameter.Id}, StatusID: {approvalStatusParameter.ApprovalStatusId}");

                var approvableRepair = repairsContext.Repairs.FirstOrDefault(p => p.Id == approvalStatusParameter.Id);
                if (approvableRepair != null)
                {
                    approvableRepair.ApprovalStatusId = approvalStatusParameter.ApprovalStatusId;
                    approvableRepair.Money = approvalStatusParameter.Money;
                    approvableRepair.ExecuteDate = approvalStatusParameter.ApprovalStatusId == (int)ApprovalStatusesEnum.Завершено ? approvalStatusParameter.ExecuteDate : null;
                    approvableRepair.Comment = approvalStatusParameter.ApprovalStatusId == (int)ApprovalStatusesEnum.Завершено ? approvalStatusParameter.Comment : null;

                    var limit = repairsContext.Limits.FirstOrDefault(p => approvalStatusParameter.ExecuteDate >= p.DateFrom
                                                                          && approvalStatusParameter.ExecuteDate <= p.DateTo
                                                                          && p.ServiceTypeId == (int)TaskTypesEnum.ЗаявкаНаРемонт);
                    if (limit != null)
                        approvableRepair.LimitId = limit.Id;

                    repairsContext.SaveChanges();
                    logger.LogInformation("ChangeApprovalStatusSuccess");
                }
                var changedRepair = GetRepairById(approvableRepair.Id);
                mailSender.SendMail(changedRepair.Id, changedRepair.ApprovalStatus, changedRepair.ItUser.FullUserName, false, changedRepair.Attachment, changedRepair.Comment);
                return changedRepair;
            }
            catch (Exception ex)
            {
                SendError(ex);
                throw;
            }
        }

        public decimal GetCompleteRepairsMoneyByPeriod(DateTime dateFrom, DateTime dateTo)
        {
            try
            {
                var result = repairsContext.Repairs.Where(p => p.ApprovalStatusId == (int)ApprovalStatusesEnum.Завершено
                                                                   && p.ExecuteDate >= dateFrom
                                                                   && p.ExecuteDate <= dateTo).ToList().Sum(p => p.Money);
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<Repair>> GetRepairsByFilterParameters(FilterParameters filterParameters)
        {
            try
            {
                var roles = await roleProvider.GetRolesForUserSID(userService.UserSID);

                if (roles.Contains("User"))
                {
                    var objects = await roleProvider.GetIdSourceObjectsForUserSIDRole(userService.UserSID, "User", 0);

                    var result = await (from repair in repairsContext.Repairs
                                        join address in repairsContext.Addresses on repair.AddressId equals address.Id
                                        join status in repairsContext.ApprovalStatuses on repair.ApprovalStatusId equals status.Id
                                        join org in repairsContext.Organizations on repair.OrganizationId equals org.Id
                                        join devType in repairsContext.DeviceTypes on repair.DeviceTypeId equals devType.Id
                                        where (repair.ExecuteDate.Value.Date >= filterParameters.DateFrom.Value.Date
                                              && repair.ExecuteDate.Value.Date <= filterParameters.DateTo.Value.Date
                                              && repair.ApprovalStatusId == filterParameters.ApprovalStatusId)
                                              ||
                                              (repair.CreateDate.Date >= filterParameters.DateFrom.Value.Date
                                              && repair.CreateDate.Date <= filterParameters.DateTo.Value.Date
                                              && (filterParameters.AddressId == -1 || repair.AddressId == filterParameters.AddressId.Value)
                                              && (filterParameters.ApprovalStatusId == -1 || repair.ApprovalStatusId == filterParameters.ApprovalStatusId.Value)
                                              && (filterParameters.OrganizationId == -1 || repair.OrganizationId == filterParameters.OrganizationId.Value))
                                        select new Repair
                                        {
                                            Id = repair.Id,
                                            Money = repair.Money,
                                            ApprovalStatus = new Entity { Id = status.Id, Value = status.Value },
                                            ConfigurationUnitId = repair.ConfigurationUnitId,
                                            DeviceType = new Entity { Id = devType.Id, Value = devType.Value },
                                            Organization = new Entity { Id = org.Id, Value = org.Value },
                                            Phone = repair.Phone,
                                            Room = repair.Room,
                                            SerialNumber = repair.SerialNumber,
                                            CreateDate = repair.CreateDate,
                                            ExecuteDate = repair.ExecuteDate,
                                            RequestNumber = repair.RequestNumber,
                                            Address = new Entity { Id = address.Id, Value = address.Value },
                                            Model = repair.Model,
                                            Trouble = repair.Trouble,
                                            Client = new User { FullUserName = repair.Client, UserDepartment = repair.Department },
                                            ItUser = new User { FullUserName = repair.ItUser, UserDepartment = repair.ItUserDepartment },
                                            Information = repair.Information,
                                            Comment = repair.Comment
                                        }).Where(p => objects.Contains(p.Address.Id)).ToListAsync();

                    return result;
                }
                return new List<Repair>();
            }
            catch (Exception ex)
            {
                SendError(ex);
                throw;
            }
        }

        public Repair InsertNewRepair(Repair repair)
        {
            try
            {
                var user = userService.CurrentUserInformation;

                logger.LogInformation("InsertNewRepair");
                logger.LogInformation($"User: {user.UserName}");

                var newRepair = new Repairs
                {
                    AddressId = repair.Address.Id,
                    CreateDate = repair.CreateDate,
                    Client = repair.Client.FullUserName,
                    Department = repair.Client.UserDepartment,
                    ItUser = user.FullName,
                    ItUserDepartment = user.Department,
                    ApprovalStatusId = (int)ApprovalStatusesEnum.НаСогласовании,
                    RequestNumber = $"SC-{Utilities.GetNumbers(repair.RequestNumber)}",
                    DeviceTypeId = repair.DeviceType.Id,
                    Information = repair.Information,
                    Trouble = repair.Trouble,
                    Model = repair.Model,
                    Money = 0m,
                    OrganizationId = repair.Organization.Id,
                    Phone = repair.Phone,
                    Room = repair.Room,
                    SerialNumber = repair.SerialNumber,
                    ConfigurationUnitId = Utilities.GetNumbers(repair.ConfigurationUnitId)
                };

                repairsContext.Repairs.Add(newRepair);
                repairsContext.SaveChanges();

                logger.LogInformation("InsertNewRepairSuccess");
                logger.LogInformation($"NewRepairID: {newRepair.Id}");

                var addedRepair = GetRepairById(newRepair.Id);
                if (addedRepair != null)
                {
                    var attachment = MailBodyConstructor.GetRepairMailBody(new RepairMailBodyParameter
                    {
                        Id = addedRepair.Id,
                        RequestNumber = addedRepair.RequestNumber,
                        Trouble = addedRepair.Trouble,
                        ModelType = addedRepair.DeviceType.Value,
                        Model = addedRepair.Model,
                        SerialNumber = addedRepair.SerialNumber,
                        ClientFullName = addedRepair.Client.FullUserName,
                        ClientOrganization = addedRepair.Organization.Value,
                        ClientDepartment = addedRepair.Client.UserDepartment,
                        Address = addedRepair.Address.Value,
                        Room = addedRepair.Room,
                        ClientPhone = addedRepair.Phone,
                        Information = addedRepair.Information,
                        ItCreatorFullName = user.FullName,
                        ItCreatorPhone = user.Phone,
                        ItCreatorMobilePhone = user.MobilePhone,
                        ConfigurationUnitId = addedRepair.ConfigurationUnitId.ToString()
                    });
                    newRepair.Attachment = attachment;
                    repairsContext.SaveChanges();

                    mailSender.SendMail(addedRepair.Id, addedRepair.ApprovalStatus, addedRepair.ItUser.FullUserName, true, attachment, null);
                    return addedRepair;
                }
                else throw new Exception("Произошла ошибка на этапе добавления заявки на ремонт оборудования");
            }
            catch (Exception ex)
            {
                SendError(ex);
                throw;
            }
        }

        private Repair GetRepairById(int repairId)
        {
            return (from repair in repairsContext.Repairs
                    join address in repairsContext.Addresses on repair.AddressId equals address.Id
                    join status in repairsContext.ApprovalStatuses on repair.ApprovalStatusId equals status.Id
                    join devType in repairsContext.DeviceTypes on repair.DeviceTypeId equals devType.Id
                    join org in repairsContext.Organizations on repair.OrganizationId equals org.Id
                    where repair.Id == repairId
                    select new Repair
                    {
                        Id = repair.Id,
                        Address = new Entity { Id = address.Id, Value = address.Value },
                        ApprovalStatus = new Entity { Id = status.Id, Value = status.Value },
                        DeviceType = new Entity { Id = devType.Id, Value = devType.Value },
                        Organization = new Entity { Id = org.Id, Value = org.Value },
                        Information = repair.Information,
                        Phone = repair.Phone,
                        Room = repair.Room,
                        SerialNumber = repair.SerialNumber,
                        Money = repair.Money,
                        CreateDate = repair.CreateDate,
                        ExecuteDate = repair.ExecuteDate.Value,
                        RequestNumber = repair.RequestNumber,
                        Model = repair.Model,
                        Trouble = repair.Trouble,
                        Client = new User { FullUserName = repair.Client, UserDepartment = repair.Department },
                        ItUser = new User { FullUserName = repair.ItUser, UserDepartment = repair.ItUserDepartment },
                        Attachment = repair.Attachment,
                        ConfigurationUnitId = repair.ConfigurationUnitId,
                        Comment = repair.Comment
                    }).FirstOrDefault();
        }

        private void SendError(Exception ex)
        {
            logger.LogError($"Exception: {ex} / InnerException: {ex.InnerException}");
        }
    }
}