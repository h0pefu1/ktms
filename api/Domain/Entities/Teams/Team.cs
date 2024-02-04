
using Domain.Entities.Meeting;

using System;
namespace Domain.Entities.Teams
{
	public class Team : BaseEntity
	{
		public string Name { get; set; } = string.Empty;

		public virtual List<User> Users { get; set; }
		public  List<Domain.Entities.Meetings.Meeting> Meetings { get; set; }
	}
}

