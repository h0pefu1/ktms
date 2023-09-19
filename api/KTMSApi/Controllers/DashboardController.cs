using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Repositories.IRepositories;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KTMSApi.Controllers
{

    [Route("api/dashboard")]
    public class DashboardController : Controller
    {

        private IMeetingRepository _meetingRepository;

        public DashboardController(IMeetingRepository meetingRepository)
        {
            _meetingRepository = meetingRepository;
        }




        //TO DO Get user from token
        [HttpGet("rooms")]
        public async Task<ActionResult> GetRooms()
        {
            return Ok(await _meetingRepository.GetMeetings());
        }
    }
}

