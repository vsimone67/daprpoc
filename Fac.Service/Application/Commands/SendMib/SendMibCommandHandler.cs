using System;
using System.Threading;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Dapr.Client;
using Microsoft.Extensions.Options;
using Fac.Service.Application.Models;

namespace Fac.Service.Commands.Application.Commands
{
    public class SendMibCommandHandler : IRequestHandler<SendMibCommand>
    {
        private readonly ILogger<SendMibCommandHandler> _logger;
        private readonly IMapper _mapper;
        private readonly DaprClient _daprClient;
        private readonly IOptions<PubSubSettings> _settings;

        public SendMibCommandHandler(ILogger<SendMibCommandHandler> logger, IMapper mapper, DaprClient daprClient, IOptions<PubSubSettings> settings)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _daprClient = daprClient ?? throw new ArgumentNullException(nameof(daprClient));
            _settings = settings ?? throw new ArgumentNullException(nameof(settings));
        }

        public async Task<Unit> Handle(SendMibCommand request, CancellationToken cancellationToken)
        {
            _logger.LogDebug($"FacService/SendMibCommandHandler => Sending Topic: {_settings.Value.FacSendMibTopic}, PubSub Name: {_settings.Value.PubSubName}");

            await _daprClient.PublishEventAsync(_settings.Value.PubSubName, _settings.Value.FacSendMibTopic, request.MibToSubmit);

            _logger.LogDebug($"FacService/SendMibCommandHandler => Topic: {_settings.Value.FacSendMibTopic} sent");
            return new Unit();
        }

    }
}
