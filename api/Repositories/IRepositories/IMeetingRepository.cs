using System;
using DTO;
using DTO.Dashboard.Calendar;
using DTO.Meeting;

namespace Repositories.IRepositories
{
	public interface IMeetingRepository
	{
		Task<List<MeetingDTO>> GetMeetings(string userName);

		Task<List<CalendarMeetingDTO>> GetCalendarMeetings(string userName);

		Task<CalendarMeetingDTO> CreateMeeting(MeetingCreateDTO meeting);

		Task<List<UpcomingDTO>> GetUpcomingDTO(string userName);
    }
}

