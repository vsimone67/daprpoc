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
    [Route("[controller]")]
    [ApiController]
    public class MibHubProcessorController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<MibHubProcessorController> _logger;

        public MibHubProcessorController(IMediator mediator, ILogger<MibHubProcessorController> logger)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [Topic("mibprocessor", "mibcompleted")]
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
