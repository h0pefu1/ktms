using Domain.Entities.Meetings;
using Domain.Entities.Meeting;
using Domain.Entities.Teams;

using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User
    {
        public User()
        {
        }

        public User(int _Id)
        {
            Id = _Id;
        }
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PasswordSalt { get; set; }
        public string PasswordHash { get; set; }
        public Role Role { get; set; }
        public Person Person { get; set; }

        public List<Domain.Entities.Meetings.Meeting> Meetings { get; set; }
        public virtual List<Team> Teams { get; set; }

        [JsonIgnore]
        public ICollection<TokenModel> Tokens { get; }
    }
}
