using RepairsData.RepairsContext;
using RepairsData.RepairsContext.Models;
using RepairsWeb.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RepairsWeb.Data.Repositories
{
    public class LimitsRepository : ILimits
    {
        private readonly RepairsContext repairsContext;

        public LimitsRepository(RepairsContext repairsContext)
        {
            this.repairsContext = repairsContext;
        }

        public Limits SaveLimit(Limits limit)
        {
            var limitsInBase = repairsContext.Limits.FirstOrDefault(p => p.Id == limit.Id);
            if (limitsInBase == null) return AddNewLimit(limit);
            else return EditLimit(limit);
        }

        private Limits AddNewLimit(Limits limit)
        {
            try
            {
                var newLimit = new Limits
                {
                    DateFrom = limit.DateFrom,
                    DateTo = limit.DateTo,
                    Limit = limit.Limit,
                    ServiceTypeId = limit.ServiceTypeId
                };

                repairsContext.Add(newLimit);
                repairsContext.SaveChanges();
                return newLimit;
            }
            catch (Exception)
            {
                throw;
            }
        }

        private Limits EditLimit(Limits limit)
        {
            try
            {
                var lim = repairsContext.Limits.FirstOrDefault(p => p.Id == limit.Id);
                if (lim != null)
                {
                    lim.DateFrom = limit.DateFrom;
                    lim.DateTo = limit.DateTo;
                    lim.Limit = limit.Limit;
                    lim.ServiceTypeId = limit.ServiceTypeId;
                    repairsContext.SaveChanges();
                }

                return lim;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<Limits> GetLimitsByPeriods(DateTime dateFrom, DateTime dateTo)
        {
            try
            {
                var result = repairsContext.Limits.Where(p => (p.DateFrom <= dateFrom && p.DateTo >= dateFrom) || (p.DateFrom <= dateTo && p.DateTo >= dateTo)).ToList();
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public IEnumerable<Limits> CurrentLimitCost
        {
            get
            {
                try
                {
                    var currentLimits = repairsContext.Limits.Where(p => p.DateFrom <= DateTime.Today && p.DateTo >= DateTime.Today).ToList();

                    return currentLimits;
                }
                catch (Exception)
                {
                    throw;
                }
            }
        }
    }
}