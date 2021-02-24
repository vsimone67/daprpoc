using System;
using System.Threading;
using MediatR;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace MibHub.Processor.Commands.Application.Commands
{
    public class ProcessMibCommandCommandHandler : IRequestHandler<ProcessMibCommand>
    {
        private readonly ILogger<ProcessMibCommandCommandHandler> _logger;
        private readonly IHubContext<MibHub.Processor.Application.Hubs.MibHub> _hubContext;

        public ProcessMibCommandCommandHandler(ILogger<ProcessMibCommandCommandHandler> logger, IHubContext<MibHub.Processor.Application.Hubs.MibHub> hubContext)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _hubContext = hubContext;
        }

        public async Task<Unit> Handle(ProcessMibCommand request, CancellationToken cancellationToken)
        {
            _logger.LogDebug("MibHubProcessor => Sending MIB completed message to hub user");

            // ! REMOVE ELSE AND ONLY SEND TO PERSON CONNECTED
            if (request.MibCompleted.UserConnectionId != null)
                await _hubContext.Clients.Client(request.MibCompleted.UserConnectionId).SendAsync("MibCompleted", request.MibCompleted);
            else
                await _hubContext.Clients.All.SendAsync("MibCompleted", request.MibCompleted);

            return new Unit();
        }

    }
}
