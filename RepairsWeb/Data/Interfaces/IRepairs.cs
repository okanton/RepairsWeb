using RepairsWeb.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RepairsWeb.Data.Interfaces
{
    public interface IRepairs
    {
        public Task<IEnumerable<Repair>> GetRepairsByFilterParameters(FilterParameters filterParameters);

        public Repair InsertNewRepair(Repair repair);

        public Repair ChangeApprovalStatus(ApprovalStatusParameter approvalStatusParameter);

        public decimal GetCompleteRepairsMoneyByPeriod(DateTime dateFrom, DateTime dateTo);

        public decimal GetEconomyRepairsMoneyForCurrentPeriod { get; }
    }
}