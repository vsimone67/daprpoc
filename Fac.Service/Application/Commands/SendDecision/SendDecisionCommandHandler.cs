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
    public class SendDecisionCommandHandler : IRequestHandler<SendDecisionCommand>
    {
        private readonly ILogger<SendDecisionCommandHandler> _logger;
        private readonly IMapper _mapper;
        private readonly DaprClient _daprClient;
        private readonly IOptions<PubSubSettings> _settings;

        public SendDecisionCommandHandler(ILogger<SendDecisionCommandHandler> logger, IMapper mapper, DaprClient daprClient, IOptions<PubSubSettings> settings)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _daprClient = daprClient ?? throw new ArgumentNullException(nameof(daprClient));
            _settings = settings ?? throw new ArgumentNullException(nameof(settings));
        }

        public async Task<Unit> Handle(SendDecisionCommand request, CancellationToken cancellationToken)
        {
            _logger.LogDebug($"Sending Topic: {_settings.Value.FacCaseDecistionTopic}, PubSub Name: {_settings.Value.PubSubName}");

            await _daprClient.PublishEventAsync(_settings.Value.PubSubName, _settings.Value.FacCaseDecistionTopic, request.CaseDecision);

            _logger.LogDebug($"Topic: {_settings.Value.FacCaseDecistionTopic} sent");
            return new Unit();
        }

    }
}
