using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Dashboard.Calendar
{
    public class CalendarMeetingDTO:BaseDTO
    {
        public string Title {  get; set; }
        public DateTime Start{ get; set; }
        public DateTime End{ get; set; }
    }
}
