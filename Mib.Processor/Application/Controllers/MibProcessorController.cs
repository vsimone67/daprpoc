using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Dapr;
using Dapr.Client;
using Fac.Service.Commands.Application.Commands;
using DaprPoc.Common.Dto;

namespace Mib.Processor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MibProcessorController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<MibProcessorController> _logger;

        public MibProcessorController(IMediator mediator, ILogger<MibProcessorController> logger)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [Topic("FacService", "FacSendMib")]
        [HttpPost("SubmitMib")]
        public async Task<IActionResult> SubmitMib([FromBody] MibSubmitted mib, [FromServices] DaprClient daprClient)
        {
            _logger.LogDebug($"MibProcessor => Processing MIB for Case {mib.FacCase.CaseNumber}");

            var data = await _mediator.Send(new ProcessMibCommand() { MibSubmitted = mib });
            _logger.LogDebug("MibProcessor => MIB has been processed");

            return Ok();
        }
    }



}
