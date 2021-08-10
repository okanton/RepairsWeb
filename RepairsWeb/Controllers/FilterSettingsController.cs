using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepairsWeb.Data.Interfaces;
using RepairsWeb.Entities;
using System;

namespace RepairsWeb.Controllers
{
    public class FilterSettingsController : Controller
    {
        private readonly IFilterSettings filterSettings;

        public FilterSettingsController(IFilterSettings filterSettings)
        {
            this.filterSettings = filterSettings;
        }

        [HttpGet]
        public ActionResult<TimeConstraint> GetTimeConstraint(int taskType)
        {
            try
            {
                return Ok(filterSettings.GetTimeConstraint(taskType));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}