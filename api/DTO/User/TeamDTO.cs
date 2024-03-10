using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.User
{
    public class TeamDTO:BaseDTO
    {
        public string Name { get; set; }

        public List<PersonDTO>? Persons { get; set; }
    }

}
