using System;
using System.Threading.Tasks;
using Dapr;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MibHub.Processor.Commands.Application.Commands;
using DaprPoc.Common.Dto;

namespace MibHub.Processor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MibHubController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<MibHubController> _logger;

        public MibHubController(IMediator mediator, ILogger<MibHubController> logger)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [Topic("MibProcessor", "MibCompleted")]
        [HttpPost("MibCompleted")]
        public async Task<IActionResult> MibCompleted([FromBody] MibCompleted mib)
        {
            _logger.LogDebug($"MibHubProcessor => Mib Processing Is Done Case #: {mib.Case.CaseNumber}, MIB Result: {mib.Result}");
            await _mediator.Send(new ProcessMibCommand() { MibCompleted = mib });
            _logger.LogDebug("MibHubProcessor => MIB has been processed");

            return Ok();
        }
    }
}
