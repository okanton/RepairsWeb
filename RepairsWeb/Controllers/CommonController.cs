using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepairsData.RepairsContext.Models;
using RepairsWeb.Data.Interfaces;
using RepairsWeb.Entities;
using System;
using System.Collections.Generic;

namespace RepairsWeb.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class CommonController : Controller
    {
        private readonly ICommon common;

        public CommonController(ICommon common)
        {
            this.common = common;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Addresses>> GetAddresses()
        {
            try
            {
                return Ok(common.Addresses);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<Organizations>> GetOrganizations()
        {
            try
            {
                return Ok(common.Organizations);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<DeviceTypes>> GetDeviceTypes()
        {
            try
            {
                return Ok(common.DeviceTypes);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<ApprovalStatuses>> GetApprovalStatuses()
        {
            try
            {
                return Ok(common.AllApprovalStatuses);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        public ActionResult<UserAccessInformation> GetAccess()
        {
            try
            {
                return Ok(common.AccessInformation);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}