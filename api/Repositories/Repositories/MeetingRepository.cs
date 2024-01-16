using System;
using DTO;

using KTMS.Infrastructure.DataBase;

using Microsoft.EntityFrameworkCore;
using Repositories.IRepositories;

namespace Repositories.Repositories
{
    public class MeetingRepository : IMeetingRepository
    {
        private KTMSDbContext _dbContext;


        public MeetingRepository(KTMSDbContext dashboardDbContext)
        {
            _dbContext = dashboardDbContext;
        }
        public async Task<List<MeetingDTO>> GetMeetings(string userName)
        {
            var MeetingByUsers = new List<MeetingDTO>();
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == userName);

            if(user!=null)
            {
                MeetingByUsers = await _dbContext.Meetings
                    .Where(m => m.Users.Contains(user))
                    .Select(m =>new MeetingDTO()
                    {
                        Name = m.Name
                    })
                    .ToListAsync();
            }

                return MeetingByUsers;
        }

    }
}

