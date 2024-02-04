using DTO.User;

namespace DTO;

public class MeetingDTO
{
    public string Name { get; set; }
    public DateTime DateStart{ get; set; }
    public DateTime DateEnd{ get; set; }
    public List<TeamDTO> Teams{ get; set; }
}

