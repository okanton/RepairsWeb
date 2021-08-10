using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepairsData.RepairsContext.Models;
using RepairsWeb.Data.Interfaces;
using System;
using System.Collections.Generic;

namespace RepairsWeb.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class LimitsController : ControllerBase
    {
        private readonly ILimits limits;

        public LimitsController(ILimits limits)
        {
            this.limits = limits;
        }

        [HttpPost]
        public ActionResult<Limits> SaveLimit(Limits limit)
        {
            try
            {
                return Ok(limits.SaveLimit(limit));
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<Limits>> GetLimitsByPeriod(DateTime dateFrom, DateTime dateTo)
        {
            try
            {
                return Ok(limits.GetLimitsByPeriods(dateFrom, dateTo));
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<Limits>> GetCurrentLimitCost()
        {
            try
            {
                return Ok(limits.CurrentLimitCost);
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}