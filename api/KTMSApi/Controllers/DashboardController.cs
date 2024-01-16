using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.IRepositories;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KTMSApi.Controllers
{

    [Route("api/dashboard")]
    [Authorize]
    public class DashboardController : Controller
    {

        private IMeetingRepository _meetingRepository;

        public DashboardController(IMeetingRepository meetingRepository)
        {
            _meetingRepository = meetingRepository;
        }

        [HttpGet("userMeetings")]
        public async Task<ActionResult> GetRooms()
        {
            var user = HttpContext.User.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Name);
            if(user != null)
            {

            return Ok(await _meetingRepository.GetMeetings(user.Value));
            }
            return NotFound("User not found");
        }
    }
}

