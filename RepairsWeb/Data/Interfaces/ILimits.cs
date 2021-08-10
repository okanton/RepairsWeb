using RepairsData.RepairsContext.Models;
using System;
using System.Collections.Generic;

namespace RepairsWeb.Data.Interfaces
{
    public interface ILimits
    {
        public Limits SaveLimit(Limits limit);

        public IEnumerable<Limits> GetLimitsByPeriods(DateTime dateFrom, DateTime dateTo);

        public IEnumerable<Limits> CurrentLimitCost { get; }
    }
}