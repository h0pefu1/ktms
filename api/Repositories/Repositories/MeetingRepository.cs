using System;
using DTO;
using Infrastructure.DataBase;
using Microsoft.EntityFrameworkCore;
using Repositories.IRepositories;

namespace Repositories.Repositories
{
    public class MeetingRepository : IMeetingRepository
    {
        private DashboardDbContext _dbContext;


        public MeetingRepository(DashboardDbContext dashboardDbContext)
        {
            _dbContext = dashboardDbContext;
        }
        public async Task<List<MeetingDTO>> GetMeetings()
        {
            var stackOfTeams = new Stack<int>(new[] { 1, 2, 3 });

            var meetingDTOs = new List<MeetingDTO>();

            while (stackOfTeams.Count > 0)
            {
                var teamId = stackOfTeams.Pop();

                var items = await _dbContext.Meetings
                    .Include(m => m.MeetingType)
                    .Include(m => m.Team)
                    .Where(t => t.Team.Id == teamId)
                    .Select(m => new MeetingDTO()
                    {
                        Team = m.Team.Name,
                        Status = m.Id % 2 == 0 ? "Ongoing" : "Incoming",
                        DatePlanned = m.DatePlanned,
                    }).ToListAsync();

                meetingDTOs.AddRange(items);
            }

            return meetingDTOs;
        }

    }
}

