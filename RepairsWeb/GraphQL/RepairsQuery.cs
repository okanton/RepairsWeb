using HotChocolate;
using HotChocolate.Data;
using RepairsData.RepairsContext;
using RepairsData.RepairsContext.Models;
using RepairsWeb.Entities;
using System.Collections.Generic;
using System.Linq;

namespace RepairsWeb.GraphQL
{
    public class RepairsQuery
    {
        [UseDbContext(typeof(RepairsContext))]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        [GraphQLDescription("Получение всех ремонтов")]
        public IQueryable<Repair> GetRepairs([ScopedService] RepairsContext repairsContext) => (from repair in repairsContext.Repairs
                                                                                                join dev in repairsContext.DeviceTypes on repair.DeviceTypeId equals dev.Id
                                                                                                join addr in repairsContext.Addresses on repair.AddressId equals addr.Id
                                                                                                join org in repairsContext.Organizations on repair.OrganizationId equals org.Id
                                                                                                join status in repairsContext.ApprovalStatuses on repair.ApprovalStatusId equals status.Id
                                                                                                select new Repair
                                                                                                {
                                                                                                    Id = repair.Id,
                                                                                                    Address = new Entity { Id = addr.Id, Value = addr.Value },
                                                                                                    ApprovalStatus = new Entity { Id = status.Id, Value = status.Value },
                                                                                                    Comment = repair.Comment,
                                                                                                    ConfigurationUnitId = repair.ConfigurationUnitId,
                                                                                                    CreateDate = repair.CreateDate,
                                                                                                    ExecuteDate = repair.ExecuteDate,
                                                                                                    DeviceType = new Entity { Id = dev.Id, Value = dev.Value },
                                                                                                    Information = repair.Information,
                                                                                                    Model = repair.Model,
                                                                                                    Money = repair.Money,
                                                                                                    Organization = new Entity { Id = org.Id, Value = org.Value },
                                                                                                    Phone = repair.Phone,
                                                                                                    RequestNumber = repair.RequestNumber,
                                                                                                    Room = repair.Room,
                                                                                                    SerialNumber = repair.SerialNumber,
                                                                                                    Trouble = repair.Trouble
                                                                                                });

        [UseDbContext(typeof(RepairsContext))]
        [UseProjection]
        public IQueryable<Addresses> GetAddresses([ScopedService] RepairsContext repairsContext) => repairsContext.Addresses;

        [UseDbContext(typeof(RepairsContext))]
        [UseProjection]
        public IQueryable<Organizations> GetOrganizations([ScopedService] RepairsContext repairsContext) => repairsContext.Organizations;
    }
}