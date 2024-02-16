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

        public async Task<CalendarMeetingDTO> CreateMeeting(MeetingCreateDTO meeting)
        {
       
            var Meeting = await _dbContext.Meetings.FirstOrDefaultAsync(m => m.Id == meeting.Id);
            if(Meeting !=null && Meeting.Id > 0)
            {
                Meeting.DateStart = meeting.DateStart;
                Meeting.DateEnd = meeting.DateEnd;
                Meeting.Name = meeting.Name;
                if (meeting.AdditionalUsers != null && meeting.AdditionalUsers.Count > 0)
                {
                    Meeting.Users = _dbContext.Users.Where(item => meeting.AdditionalUsers.Contains(item.Id)).ToList();
                }
                Meeting.Teams = await _dbContext.Teams.Where(item => meeting.Teams.Contains(item.Id)).ToListAsync();
                _dbContext.Meetings.Update(Meeting);

            }
            else
            {
                Meeting = new Meeting();
                Meeting.DateStart = meeting.DateStart;
                Meeting.DateEnd = meeting.DateEnd;
                Meeting.Name = meeting.Name;
                if (meeting.AdditionalUsers != null && meeting.AdditionalUsers.Count > 0)
                {
                    Meeting.Users = _dbContext.Users.Where(item => meeting.AdditionalUsers.Contains(item.Id)).ToList();
                }
                Meeting.Teams = await _dbContext.Teams.Where(item=>meeting.Teams.Contains(item.Id)).ToListAsync();
                 _dbContext.Meetings.Add(Meeting);
         
                
            }
            _dbContext.SaveChanges();
            return new CalendarMeetingDTO()
            {
                Start= Meeting.DateStart,
                End = Meeting.DateEnd,
                Title= Meeting.Name,
                Id = Meeting.Id
            };
        }
    }
}

