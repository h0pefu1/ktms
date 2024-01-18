using System;

using DTO;
using DTO.User;

using KTMS.Infrastructure.DataBase;

using Microsoft.EntityFrameworkCore;
using Repositories.IRepositories;

namespace Repositories.Repositories
{
    public class ProfileRepository : IProfileRepository
    {
        private KTMSDbContext _dbContext;
        public ProfileRepository(KTMSDbContext dashboardDbContext)
        {
            _dbContext = dashboardDbContext;
        }

        public async Task<List<TeamDTO>> GetTeams(string userName)
        {
            var teamsList = new List<TeamDTO>();
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == userName);

            if (user != null)
            {
                teamsList = await _dbContext.Teams
                    .Where(m => m.Users.Contains(user))
                    .Select(m => new TeamDTO()
                    {
                        Id= m.Id,
                        Name = m.Name
                    })
                    .ToListAsync();
            }
            return teamsList;
        }

        public async Task<UserProfileDTO> GetUserProfileAdditionalInfo(string userName)
        {
            var user = await _dbContext.Users
               . Include(p=>p.Person)
                .FirstOrDefaultAsync(u => u.UserName == userName);
            var profileAdditional = new UserProfileDTO();
            if (user != null)
            {
                var person = await _dbContext.Persons.FirstOrDefaultAsync(u => u.Id == user.Person.Id);
                profileAdditional.FirstName = person.FirstName;
                profileAdditional.LastName= person.LastName;
                profileAdditional.BirthDay = person.BirthDay;
                profileAdditional.PhoneNumber = person.PhoneNumber;
                profileAdditional.About = person.About;
                profileAdditional.Email= person.Email;
                return profileAdditional;
            }
            return null;
        }
    }
}

