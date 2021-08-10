using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepairsWeb.Data.Interfaces;
using RepairsWeb.Entities;
using System;
using System.Threading.Tasks;

namespace RepairsWeb.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class RepairsController : Controller
    {
        private readonly IRepairs repairs;

        public RepairsController(IRepairs repairs)
        {
            this.repairs = repairs;
        }

        [HttpPost]
        public async Task<ActionResult<Repair>> GetRepairsByFilterParameters(FilterParameters filterParameters)
        {
            try
            {
                var result = await repairs.GetRepairsByFilterParameters(filterParameters);
                return Ok(result);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Repair> InsertNewRepair(Repair repair)
        {
            try
            {
                return Ok(repairs.InsertNewRepair(repair));
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Repair> ChangeRepairApprovalStatus(ApprovalStatusParameter approvalStatusParameter)
        {
            try
            {
                return Ok(repairs.ChangeApprovalStatus(approvalStatusParameter));
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<decimal> GetCompleteRepairsMoneyByPeriod(DateTime dateFrom, DateTime dateTo)
        {
            try
            {
                return Ok(repairs.GetCompleteRepairsMoneyByPeriod(dateFrom, dateTo));
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<decimal> GetEconomyRepairsMoneyForCurrentPeriod()
        {
            try
            {
                return Ok(repairs.GetEconomyRepairsMoneyForCurrentPeriod);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}