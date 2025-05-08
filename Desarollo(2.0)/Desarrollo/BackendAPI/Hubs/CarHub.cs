using Microsoft.AspNetCore.SignalR;
using BackendAPI.Models;

namespace BackendAPI.Hubs
{
    public class CarHub : Hub
    {
        public async Task NotifyCarChange(string action, Car car)
        {
            await Clients.All.SendAsync("CarChanged", action, car);
        }
    }
}