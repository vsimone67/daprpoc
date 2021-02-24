using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace MibHub.Processor.Application.Hubs
{
    public class MibHub : Hub
    {
        private readonly ILogger<MibHub> _logger;
        private readonly IMediator _mediator;
        public MibHub(IMediator mediator, ILogger<MibHub> logger)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        public override async Task OnConnectedAsync()
        {
            _logger.LogDebug($"Client Connected, ID => {Context.ConnectionId}");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);

            _logger.LogDebug($"Client DisConnected, ID => {Context.ConnectionId}");
        }

        // these are called from outside the hub
        public string GetConnectionId() => Context.ConnectionId;

    }
}
