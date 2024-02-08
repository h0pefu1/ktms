using System;
using DTO;
using DTO.Dashboard.Calendar;

namespace Repositories.IRepositories
{
	public interface IMeetingRepository
	{
		Task<List<MeetingDTO>> GetMeetings(string userName);

		Task<List<CalendarMeetingDTO>> GetCalendarMeetings(string userName);

		Task<MeetingDTO> CreateMeeting(MeetingCreateDTO meeting);

    }
}

