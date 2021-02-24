using System;
using System.Threading.Tasks;
using DaprPoc.Common.Dto;
using Fac.Service.Application.Models;
using Fac.Service.Commands.Application.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Fac.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<FacController> _logger;

        public FacController(IMediator mediator, ILogger<FacController> logger)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpPost]
        [Route("SubmitMib")]
        public async Task<ActionResult> SubmitMib([FromBody] MibSubmitted mibToSubmit)
        {
            _logger.LogDebug("FacService => Submitting MIB for processing");
            var data = await _mediator.Send(new SendMibCommand() { MibToSubmit = mibToSubmit });
            _logger.LogDebug("FacService => MIB has been sent");
            return Ok(data);
        }

        [HttpPost]
        [Route("SendFacCaseDecision")]
        public async Task<ActionResult> SendFacCaseDecision([FromBody] FacCaseDecision caseDecision)
        {
            _logger.LogDebug("FacService => Submitting Fac case decison");
            var data = await _mediator.Send(new SendDecisionCommand() { CaseDecision = caseDecision });
            _logger.LogDebug("FacService => Case has been sent");
            return Ok(data);
        }

        [HttpPost]
        [Route("SubmitFacCase")]
        public async Task<ActionResult> SubmitFacCase([FromBody] FacCaseSubmitted caseToSubmit)
        {
            _logger.LogDebug($"FacService => Submitting Fac SubmitCase {caseToSubmit.Case.CaseNumber}, action type: {caseToSubmit.Action}");
            var data = await _mediator.Send(new SubmitCaseCommand() { CaseToSubmit = caseToSubmit });
            _logger.LogDebug("FacService => Case has been sumbitted");
            return Ok(data);
        }
    }
}
