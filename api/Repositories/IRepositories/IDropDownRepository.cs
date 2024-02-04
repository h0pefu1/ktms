using System;
using DTO;
using DTO.Base;
using DTO.Dashboard.Calendar;

namespace Repositories.IRepositories
{
	public interface IDropDownRepository
    {
        Task<List<DropDownDTO>> GetTeams();
        Task<List<DropDownDTO>> GetUsers();
    }
}

