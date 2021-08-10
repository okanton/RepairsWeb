using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RepairsWeb.Data.Interfaces;
using RepairsWeb.Entities;

namespace RepairsWeb.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class DirectoryController : ControllerBase
    {
        private readonly IDirectory directory;

        public DirectoryController(IDirectory directory)
        {
            this.directory = directory;
        }

        [HttpPost]
        public ActionResult<Entity> SaveAddress(Entity address)
        {
            try
            {
                return Ok(directory.SaveAddress(address));
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        public ActionResult<int> DeleteAddress(int addressId)
        {
            try
            {
                return Ok(directory.DeleteAddress(addressId));
            }
            catch (System.Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}