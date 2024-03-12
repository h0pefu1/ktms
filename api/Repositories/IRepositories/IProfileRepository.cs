using System;
using Domain.Entities;
using DTO;
using DTO.User;
using Infrastructure.Security;

namespace Repositories.IRepositories
{
	public interface IProfileRepository
	{
		Task<List<TeamDTO>> GetTeams(string userName);

		Task<UserProfileDTO> GetUserProfileAdditionalInfo(string userName);

        Task<Person> UpdateUserProfile(EditProfile editProfile);

	}
}

