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
    public class RefillingsController : Controller
    {
        private readonly IRefillings refillings;

        public RefillingsController(IRefillings refillings)
        {
            this.refillings = refillings;
        }

        [HttpPost]
        public async Task<ActionResult<Refilling>> GetRefillingsByFilterParameters(FilterParameters filterParameters)
        {
            try
            {
                return Ok(await refillings.GetRefillingsByFilterParameters(filterParameters));
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Refilling> ChangeRefillingApprovalStatus(ApprovalStatusParameter approvalStatusParameter)
        {
            try
            {
                return Ok(refillings.ChangeApprovalStatus(approvalStatusParameter));
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Refilling> InsertNewRefilling(Refilling refilling)
        {
            try
            {
                return Ok(refillings.InsertNewRefilling(refilling));
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<decimal> GetCompleteRefillingsMoneyByPeriod(DateTime dateFrom, DateTime dateTo)
        {
            try
            {
                return Ok(refillings.GetCompleteRefillingsMoneyByPeriod(dateFrom, dateTo));
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<decimal> GetEconomyRefillingsMoneyForCurrentPeriod()
        {
            try
            {
                return Ok(refillings.GetEconomyRefillingsMoneyForCurrentPeriod);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}