using System;

using Domain.Entities;
using Domain.Entities.Meetings;
using Domain.Entities.Teams;

using DTO;
using DTO.Dashboard.Calendar;

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

        public async Task<List<CalendarMeetingDTO>> GetCalendarMeetings(string userName)
        {
            var MeetingByUsers = new List<CalendarMeetingDTO>();
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserName == userName);

            if (user != null)
            {
                MeetingByUsers = await _dbContext.Meetings
                    .Where(m => m.Users.Contains(user))
                    .Select(m => new CalendarMeetingDTO()
                    {
                        Title= m.Name,
                        Start = m.DateStart,
                        End = m.DateEnd,
                        Id = m.Id,

                    })
                    .ToListAsync();
            }

            return MeetingByUsers;
        }

        public async Task<MeetingDTO> CreateMeeting(MeetingCreateDTO meeting)
        {
            var Meeting = await _dbContext.Meetings.FirstOrDefaultAsync(m => m.Id == meeting.Id);
            if(Meeting !=null && Meeting.Id > 0)
            {
                Meeting.DateStart = meeting.DateStart;
                Meeting.DateEnd = meeting.DateEnd;
                Meeting.Name = meeting.Name;
                Meeting.TeamMeetings = meeting.Teams.Select(item => new TeamMeeting()
                {
                    MeetingId = Meeting.Id,
                    TeamId = item
                }).ToList();
                if(meeting.AdditionalUsers  != null && meeting.AdditionalUsers.Count > 0)
                {
                    Meeting.Users = meeting.AdditionalUsers.Select(item => new User()
                    {
                        Id = item
                    }).ToList();
                }
                 _dbContext.Update(Meeting);
            }
            else
            {
                Meeting.DateStart = meeting.DateStart;
                Meeting.DateEnd = meeting.DateEnd;
                Meeting.Name = meeting.Name;
                if (meeting.AdditionalUsers != null && meeting.AdditionalUsers.Count > 0)
                {
                    Meeting.Users = meeting.AdditionalUsers.Select(item => new User()
                    {
                        Id = item
                    }).ToList();
                }
                await _dbContext.AddAsync(Meeting);
                Meeting.TeamMeetings = meeting.Teams.Select(item => new TeamMeeting()
                {
                    MeetingId = Meeting.Id,
                    TeamId = item
                }).ToList();
            }
            return new MeetingDTO()
            {
                DateStart = Meeting.DateStart,
                DateEnd = Meeting.DateEnd,
                Name = Meeting.Name,
                AdditionalUsers = Meeting.Users.Select(item => new DTO.User.UserDTO() { FullName = item.UserName, Id = item.Id }).ToList(),
                Teams = Meeting.TeamMeetings.Select(item => new DTO.User.TeamDTO() { Id = item.TeamId, Name = item.Team.Name }).ToList()
            };
        }
    }
}

