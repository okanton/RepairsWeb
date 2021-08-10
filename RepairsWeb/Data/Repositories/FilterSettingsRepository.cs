using RepairsData.RepairsContext;
using RepairsWeb.Data.Interfaces;
using RepairsWeb.Entities;
using System;
using System.Linq;

namespace RepairsWeb.Data.Repositories
{
    public class FilterSettingsRepository : IFilterSettings
    {
        private readonly RepairsContext repairsContext;

        public FilterSettingsRepository(RepairsContext repairsContext)
        {
            this.repairsContext = repairsContext;
        }

        public TimeConstraint GetTimeConstraint(int taskType)
        {
            try
            {
                switch (taskType)
                {
                    case (int)TaskTypesEnum.ЗаявкаНаРемонт:
                        {
                            return new TimeConstraint
                            {
                                MinDate = repairsContext.Repairs.Min(p => p.CreateDate).Date,
                                TaskType = (int)TaskTypesEnum.ЗаявкаНаРемонт
                            };
                        }
                    case (int)TaskTypesEnum.ЗаявкаНаЗаправку:
                        {
                            return new TimeConstraint
                            {
                                MinDate = repairsContext.Refillings.Min(p => p.CreateDate).Date,
                                TaskType = (int)TaskTypesEnum.ЗаявкаНаЗаправку
                            };
                        }
                    default:
                        return new TimeConstraint
                        {
                            MinDate = DateTime.MinValue,
                            TaskType = -1
                        };
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}