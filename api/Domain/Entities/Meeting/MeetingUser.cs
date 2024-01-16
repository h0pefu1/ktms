using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Meeting
{
    public class MeetingUser:BaseEntity
    {
        public int MeetingId { get; set; }
        public int UserId { get; set; }
        public Meeting Meeting { get; set; }
        
            public User User { get; set; }
    }
}
