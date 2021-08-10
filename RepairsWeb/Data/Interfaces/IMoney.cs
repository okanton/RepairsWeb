using RepairsData.RepairsContext.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RepairsWeb.Data.Interfaces
{
    public interface IMoney
    {
        public decimal GetEconomyMoneyForCurrentPeriod(TaskTypesEnum taskTypes);

        public decimal GetCompleteMoneyByPeriod(DateTime dateFrom, DateTime dateTo, TaskTypesEnum taskTypes);
    }
}