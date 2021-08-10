using RepairsData.RepairsContext;
using RepairsWeb.Data.Interfaces;
using System;
using System.Linq;

namespace RepairsWeb.Data.Repositories
{
    public class MoneyRepository : IMoney
    {
        private readonly RepairsContext repairsContext;

        public MoneyRepository(RepairsContext repairsContext)
        {
            this.repairsContext = repairsContext;
        }

        public decimal GetCompleteMoneyByPeriod(DateTime dateFrom, DateTime dateTo, TaskTypesEnum taskTypes)
        {
            try
            {
                return taskTypes switch
                {
                    TaskTypesEnum.ЗаявкаНаРемонт => GetCompleteRepairsMoneyByPeriod(dateFrom, dateTo),
                    TaskTypesEnum.ЗаявкаНаЗаправку => GetCompleteRefillingsMoneyByPeriod(dateFrom, dateTo),
                    _ => 0,
                };
            }
            catch (Exception)
            {
                throw;
            }
        }

        public decimal GetEconomyMoneyForCurrentPeriod(TaskTypesEnum taskTypes) =>
            taskTypes switch
            {
                TaskTypesEnum.ЗаявкаНаЗаправку => GetEconomyRepairsMoneyForCurrentPeriod,
                TaskTypesEnum.ЗаявкаНаРемонт => GetEconomyRefillingsMoneyForCurrentPeriod,
                _ => 0
            };

        private decimal GetEconomyRepairsMoneyForCurrentPeriod
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
                catch (Exception)
                {
                    throw;
                }
            }
        }

        private decimal GetEconomyRefillingsMoneyForCurrentPeriod
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
                catch (Exception)
                {
                    throw;
                }
            }
        }

        private decimal GetCompleteRefillingsMoneyByPeriod(DateTime dateFrom, DateTime dateTo) => repairsContext.Refillings.Where(p => p.ApprovalStatusId == (int)ApprovalStatusesEnum.Завершено
                                                                                                  && p.ExecuteDate >= dateFrom
                                                                                                  && p.ExecuteDate <= dateTo).ToList().Sum(p => p.Money);

        private decimal GetCompleteRepairsMoneyByPeriod(DateTime dateFrom, DateTime dateTo) => repairsContext.Repairs.Where(p => p.ApprovalStatusId == (int)ApprovalStatusesEnum.Завершено
                                                                                               && p.ExecuteDate >= dateFrom
                                                                                               && p.ExecuteDate <= dateTo).ToList().Sum(p => p.Money);
    }
}