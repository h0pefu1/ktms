using DTO.User;
using Infrastructure.Security;
using KTMS.Infrastructure.DataBase;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repositories.IRepositories;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;

namespace KTMSApi.Controllers
{
    [Route("api/profile")]
    [ApiController]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private  IProfileRepository _profileRepository;

        public ProfileController(IProfileRepository profileRepository)
        {
            _profileRepository = profileRepository;
        }

        [HttpGet("userteams")]
        public async Task<ActionResult> GetUserTeams()
        {
            try
            {
                var user = HttpContext.User.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Name);
                if (user == null)
                {
                    return StatusCode(401);
                }

                return Ok(
                  await  _profileRepository.GetTeams(user.Value)
                    );
            }
            catch(Exception ex)
            {
            return BadRequest(ex.Message);
            }
        }

        [HttpGet("useradditional")]
        public async Task<ActionResult> GetUserAdditional()
        {
            try
            {
                var user = HttpContext.User.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Name);
                if (user == null)
                {
                    return StatusCode(401);
                }

                return Ok(
                  await _profileRepository.GetUserProfileAdditionalInfo(user.Value)
                    );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("edit")]
        public async Task<ActionResult> EditUserAdditional(EditProfile editProfile)
        {
            try
            {
                var user = HttpContext.User.Claims.FirstOrDefault(u => u.Type == ClaimTypes.Name);
                if (user == null)
                {
                    return StatusCode(401);
                }
                return Ok(
                    await _profileRepository.UpdateUserProfile(editProfile)
                    );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
