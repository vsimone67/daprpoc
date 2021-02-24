using System;
using System.Threading;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Dapr.Client;
using Microsoft.Extensions.Options;
using Mib.Processor.Application.Models;
using DaprPoc.Common.Dto;

namespace Fac.Service.Commands.Application.Commands
{
    public class ProcessMibCommandHandler : IRequestHandler<ProcessMibCommand>
    {
        private readonly ILogger<ProcessMibCommandHandler> _logger;
        private readonly IMapper _mapper;
        private readonly DaprClient _daprClient;
        private readonly IOptions<PubSubSettings> _settings;

        public ProcessMibCommandHandler(ILogger<ProcessMibCommandHandler> logger, IMapper mapper, DaprClient daprClient, IOptions<PubSubSettings> settings)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _daprClient = daprClient ?? throw new ArgumentNullException(nameof(daprClient));
            _settings = settings ?? throw new ArgumentNullException(nameof(settings));
        }

        public async Task<Unit> Handle(ProcessMibCommand request, CancellationToken cancellationToken)
        {
            _logger.LogDebug($"MibProcessor => Sending Topic: {_settings.Value.MibCompletedTopic}, PubSub Name: {_settings.Value.MibPubSub}");

            var mibCompleted = new MibCompleted()
            {
                Case = request.MibSubmitted.FacCase,
                MibId = 1233,
                Result = "Pass",
                UserConnectionId = request.MibSubmitted.UserConnectionId
            };

            await Task.Delay(2000); // pause 2 seconds to simulate processing
            await _daprClient.PublishEventAsync(_settings.Value.MibPubSub, _settings.Value.MibCompletedTopic, mibCompleted);

            _logger.LogDebug($"MibProcessor => Topic: {_settings.Value.MibCompletedTopic} sent");
            return new Unit();
        }

    }
}
