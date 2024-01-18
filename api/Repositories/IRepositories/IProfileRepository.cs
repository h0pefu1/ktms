using System;
using DTO;
using DTO.User;

namespace Repositories.IRepositories
{
	public interface IProfileRepository
	{
		Task<List<TeamDTO>> GetTeams(string userName);

		Task<UserProfileDTO> GetUserProfileAdditionalInfo(string userName);
	}
}

