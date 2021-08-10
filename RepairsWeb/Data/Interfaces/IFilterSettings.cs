using RepairsWeb.Entities;

namespace RepairsWeb.Data.Interfaces
{
    public interface IFilterSettings
    {
        public TimeConstraint GetTimeConstraint(int taskType);
    }
}