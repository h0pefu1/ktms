﻿using Domain.Entities;
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
        public virtual DbSet<Team> Teams { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<TokenModel> Tokens { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Person> Persons { get; set; }
 
    }

}

