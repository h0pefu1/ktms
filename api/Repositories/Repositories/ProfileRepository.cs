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
    }
}

