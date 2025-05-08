// filepath: c:\Users\felia\Desktop\Desarollo(2.0)\Desarrollo\BackendAPI\Models\WeatherForecast.cs
namespace BackendAPI.Models;

public class WeatherForecast
{
    public DateOnly Date { get; set; }
    public int TemperatureC { get; set; }
    public string? Summary { get; set; }
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}