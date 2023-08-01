using EventsApp.API.Dtos;
using EventsApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventsApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public partial class EventsController : ControllerBase
{
    private readonly EventsContext _context;

    public EventsController(EventsContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Event> GetAll()
    {
        return _context.Events;
    }

    [HttpPost]
    [Authorize]
    public int Create(NewEventDto newEventDto)
    {
        var newEvent = new Event
        {
            Name = newEventDto.Name,
            Description = newEventDto.Description,
            StartTime = newEventDto.StartTime,
            EndTime = newEventDto.EndTime,
            Location = newEventDto.Location
        };

        _context.Events.Add(newEvent);
        _context.SaveChanges();

        return newEvent.Id;
    }

    [HttpGet("{eventId}")]
    [Authorize]
    public async Task<IActionResult> GetEventById(int eventId)
    {
        var evnt = await _context.Events.AsNoTracking().Where(e => e.Id == eventId).Select(e => new
        {
            e.Id,
            e.Name,
            e.Description,
            e.Location,
            e.StartTime,
            e.EndTime,
            Registrations = e.Registrations.Select(r => new
            {
                r.Id,
                r.Name,
                r.EmailAddress,
                r.PhoneNumber
            })
        }).FirstOrDefaultAsync();


        return Ok(evnt);
    }


    [HttpPost("{eventId}/register")]
    public async Task<IActionResult> Register(UserInput userInput, int eventId)
    {
        var existingRegistrations = await _context.Registrations.AnyAsync(x => x.EmailAddress == userInput.Email && x.EventId == eventId);

        if (existingRegistrations)
        {
            return BadRequest(new {message="You have already registered for this event"});
        }


        var registration = new Registration
        {
            Name = userInput.Name,
            EmailAddress = userInput.Email,
            PhoneNumber = userInput.Phone,
            EventId = eventId
        };

        _context.Registrations.Add(registration);
        _context.SaveChanges();

        return Ok(registration.Id);
    }
}