using Domain.Entities;
using Domain.Entities.Meeting;
using Domain.Entities.Teams;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Diagnostics.Tracing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KTMS.Infrastructure.DataBase
{
    public class KTMSDbContext : DbContext
    {
        public KTMSDbContext(DbContextOptions<KTMSDbContext> options) : base(options)
        {

        }
        public KTMSDbContext()
     : base()
        {

        }

        public virtual DbSet<Domain.Entities.Meetings.Meeting> Meetings { get; set; }
        public virtual DbSet<MeetingType> MeetingTypes { get; set; }
        public virtual DbSet<Team> Teams { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<TokenModel> Tokens { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Person> Persons { get; set; }
        public DbSet<TeamMeeting> TeamMeetings { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TeamMeeting>()
                .HasKey(tm => new { tm.TeamId, tm.MeetingId });

            modelBuilder.Entity<TeamMeeting>()
                .HasOne(tm => tm.Team)
                .WithMany(t => t.TeamMeetings)
                .HasForeignKey(tm => tm.TeamId);

            modelBuilder.Entity<TeamMeeting>()
                .HasOne(tm => tm.Meeting)
                .WithMany(m => m.TeamMeetings)
                .HasForeignKey(tm => tm.MeetingId);
        }
    }

}

