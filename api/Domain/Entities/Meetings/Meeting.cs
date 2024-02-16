using System;

using Domain.Entities.Meeting;
using Domain.Entities.Teams;

namespace Domain.Entities.Meetings
{
	public class Meeting : BaseEntity
	{
		public string Name { get; set; } = string.Empty;
		public DateTime DateStart { get; set; } = DateTime.Now;
		public DateTime DateEnd { get; set; } = new DateTime(DateTime.Now.Ticks).AddMinutes(30);
		public List<User>? Users { get; set; }

		public List<Team> Teams { get; set; } = new List<Team>();
    }
}

