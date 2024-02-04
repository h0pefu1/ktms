using Microsoft.AspNetCore.Mvc;

using Repositories.IRepositories;

using System.Security.Claims;

namespace KTMSApi.Controllers
{
    [Route("api/dropdown")]
    public class DropDownController : Controller
    {
        private IDropDownRepository _dropDownRepository;

        public DropDownController(IDropDownRepository dropDownRepository)
        {
            _dropDownRepository = dropDownRepository;
        }

        [HttpGet("teams")]
        public async Task<ActionResult> GetTeams()
        {
            return Ok(await _dropDownRepository.GetTeams());
        }
        [HttpGet("users")]
        public async Task<ActionResult> GetUsers()
        {
            return Ok(await _dropDownRepository.GetUsers());
        }
    }
}
