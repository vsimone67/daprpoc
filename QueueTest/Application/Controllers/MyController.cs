using System;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using QueueTest.Application.Queries;

namespace QueueTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<MyController> _logger;

        public MyController(IMediator mediator, ILogger<MyController> logger)
        {
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpGet]
        [Route("MyRoute")]
        public async Task<ActionResult> MyRoute()
        {
            _logger.LogDebug("Begin");
            var data = await _mediator.Send(new MyQuery());
            _logger.LogDebug("End");
            return Ok(data);
        }
    }
}
