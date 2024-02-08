using System;

using DTO;
using DTO.Base;
using DTO.Dashboard.Calendar;

using KTMS.Infrastructure.DataBase;

using Microsoft.EntityFrameworkCore;
using Repositories.IRepositories;

namespace Repositories.Repositories
{
    public class DropDownRepository : IDropDownRepository
    {
        private KTMSDbContext _dbContext;


        public DropDownRepository(KTMSDbContext dashboardDbContext)
        {
            _dbContext = dashboardDbContext;
        }


        public async Task<List<DropDownDTO>> GetTeams()
        {
            return await _dbContext.Teams.Select(t => new DropDownDTO()
            {
                Label = t.Name,
                Value = t.Id
            }).ToListAsync();
        }

        public async Task<List<DropDownDTO>> GetUsers()
        {
            return await _dbContext.Users.Include(u=>u.Person).Select(t => new DropDownDTO()
            {
                Label = $"{t.Person.FirstName} {t.Person.LastName}",
                Value = t.Id
            }).ToListAsync();
        }
    }
}

