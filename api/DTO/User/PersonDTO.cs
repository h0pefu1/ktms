using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.User
{
    public class PersonDTO:BaseDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<TeamDTO>? Teams { get; set; }
        
    }
}
