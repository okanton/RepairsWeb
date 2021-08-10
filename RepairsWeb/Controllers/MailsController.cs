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
    public class MailsController : ControllerBase
    {
        private readonly IMailService mailService;

        public MailsController(IMailService mailService)
        {
            this.mailService = mailService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Mails>> GetAllMails()
        {
            try
            {
                return Ok(mailService.AllMails);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public ActionResult<Mails> SaveMail(Mails mail)
        {
            try
            {
                return Ok(mailService.SaveMail(mail));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        public ActionResult<int> DeleteMail(int mailId)
        {
            try
            {
                return Ok(mailService.DeleteMail(mailId));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}