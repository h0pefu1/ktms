using System;
using Domain.Entities.Meeting;
using Domain.Entities.Teams;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DataBase
{
	public class DashboardDbContext :DbContext
    {

        public DashboardDbContext(DbContextOptions<DashboardDbContext> options) : base(options)
        {

        }
        public DashboardDbContext()
     : base()
        {

        }

        public virtual DbSet<Meeting> Meetings { get; set; }

        public virtual DbSet<MeetingType> MeetingTypes { get; set; }

        public virtual DbSet<Team> Teams { get; set; }
    }
}

