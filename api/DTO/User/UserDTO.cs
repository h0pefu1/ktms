using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.User
{
    public class UserProfileDTO:BaseDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDay { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string About { get; set; }
}
