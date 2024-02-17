using DTO;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.IRepositories;
using System.Security.Claims;

namespace KTMSApi.Controllers
{
    [Route("api/calendar")]
    [Authorize]
    public class CalendarController : Controller
    {

        private IMeetingRepository _meetingRepository;

        public CalendarController(IMeetingRepository meetingRepository)
        {
            _meetingRepository = meetingRepository;
        }
    

        [HttpGet("getcalendarmeetings")]
        public async Task<ActionResult> GetCalendarMeetings()
        {
            var user = HttpContext.User.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Name);
            if (user != null)
            {

                return Ok(await _meetingRepository.GetCalendarMeetings(user.Value));
            }
            return NotFound("User not found");
        }
    }
}
