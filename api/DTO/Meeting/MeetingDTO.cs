using DTO.User;

namespace DTO;

public class MeetingDTO
{
    public string Name { get; set; }
    public DateTime DateStart{ get; set; }
    public DateTime DateEnd{ get; set; }
    public List<TeamDTO> Teams{ get; set; }
    public List<UserDTO> AdditionalUsers{ get; set; }
}
public class MeetingCreateDTO
{
    public int? Id { get; set; }
    public string Name { get; set; }
    public DateTime DateStart { get; set; }
    public DateTime DateEnd { get; set; }
    public List<int> Teams { get; set; }
    public List<int>? AdditionalUsers { get; set; }
}


