
namespace EventsApp.Data;

public class Registration
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string EmailAddress { get; set; }
    public int EventId { get; set; }
    public Event Event { get; set; }
}