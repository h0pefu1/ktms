using System;
namespace Domain.Entities.Teams
{
	public class Team : BaseEntity
	{
		public string Name { get; set; } = string.Empty;

		public virtual List<User> Users { get; set; }
	}
}

