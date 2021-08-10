using RepairsWeb.Entities;

namespace RepairsWeb.Data.Interfaces
{
    public interface IReports
    {
        public byte[] GetCommonRepairsExcelReport(FilterParameters filterParameters);

        public byte[] GetRepairsByCompanyExcelReport(FilterParameters filterParameters);
    }
}