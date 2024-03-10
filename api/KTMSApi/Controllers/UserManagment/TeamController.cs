using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KTMSApi.Controllers.UserManagment
{
    [Route("api/team")]
    [Authorize]
    public class TeamController : Controller
    {
        [HttpPost]
        public async Task<ActionResult> CreateTeam()
        {

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> AssingUsersToTeam()
        {
            return Ok();
        }

    }
    }
