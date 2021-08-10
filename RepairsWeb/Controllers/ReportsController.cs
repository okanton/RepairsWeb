using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepairsWeb.Data.Interfaces;
using RepairsWeb.Entities;

namespace RepairsWeb.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ReportsController : ControllerBase
    {
        private readonly IReports reports;

        public ReportsController(IReports reports)
        {
            this.reports = reports;
        }

        [HttpPost]
        public IActionResult GetCommonRepairsExcelReport(FilterParameters filterParameters)
        {
            try
            {
                var file = reports.GetCommonRepairsExcelReport(filterParameters);
                return File(file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult GetRepairsByCompanyExelReport(FilterParameters filterParameters)
        {
            try
            {
                var file = reports.GetRepairsByCompanyExcelReport(filterParameters);
                return File(file, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}