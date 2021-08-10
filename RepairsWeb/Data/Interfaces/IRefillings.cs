using RepairsWeb.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RepairsWeb.Data.Interfaces
{
    public interface IRefillings
    {
        public decimal GetEconomyRefillingsMoneyForCurrentPeriod { get; }

        public decimal GetCompleteRefillingsMoneyByPeriod(DateTime dateFrom, DateTime dateTo);

        public Task<IEnumerable<Refilling>> GetRefillingsByFilterParameters(FilterParameters filterParameters);

        public Refilling InsertNewRefilling(Refilling refilling);

        public Refilling ChangeApprovalStatus(ApprovalStatusParameter approvalStatusParameter);
    }
}