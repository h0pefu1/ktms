using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Teams
{
    public class TeamMeeting
    {
        public int TeamId { get; set; }
        public Team Team { get; set; }

        public int MeetingId { get; set; }
        public Domain.Entities.Meetings.Meeting Meeting { get; set; }
    }
}
