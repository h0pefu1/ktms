﻿using System;
using Domain.Entities.Teams;

namespace Domain.Entities.Meeting
{
	public class Meeting : BaseEntity
	{

		public string Name { get; set; }

		public Team Team { get; set; }

		public MeetingType MeetingType { get; set; }

		public DateTime DatePlanned { get; set; }
	}
}

