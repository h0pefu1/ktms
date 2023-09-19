using System;
using DTO;

namespace Repositories.IRepositories
{
	public interface IMeetingRepository
	{
		Task<List<MeetingDTO>> GetMeetings();
	}
}

