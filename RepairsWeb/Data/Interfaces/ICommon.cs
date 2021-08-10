using RepairsData.RepairsContext.Models;
using RepairsWeb.Entities;
using System.Collections.Generic;

namespace RepairsWeb.Data.Interfaces
{
    public interface ICommon
    {
        public IEnumerable<Addresses> Addresses { get; }

        public IEnumerable<ApprovalStatuses> AllApprovalStatuses { get; }

        public IEnumerable<DeviceTypes> DeviceTypes { get; }

        public IEnumerable<Organizations> Organizations { get; }

        public UserAccessInformation AccessInformation { get; }
    }
}