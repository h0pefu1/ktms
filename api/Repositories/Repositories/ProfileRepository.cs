using System;
using Domain.Entities;
using DTO;
using DTO.User;
using Infrastructure.Security;
using KTMS.Infrastructure.DataBase;
using Microsoft.AspNetCore.Http.HttpResults;
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
                profileAdditional.Id = person.Id;
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

        public async Task<Person> UpdateUserProfile(EditProfile editProfile)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == editProfile.Id);
            if(user != null) 
            {
                var profile = await _dbContext.Persons.FirstOrDefaultAsync(u => u.Id == editProfile.Id);
                profile.Email = editProfile.email;
                profile.PhoneNumber = editProfile.phoneNumber;
                await _dbContext.SaveChangesAsync();
                return profile;
            }
            return null;
        }
    }
}

