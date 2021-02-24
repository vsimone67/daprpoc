using System;
using System.Collections.Generic;
using MediatR;
using QueueTest.Application.Dto;

namespace QueueTest.Application.Commands
{
    public class MyCommand : IRequest<MyDto>
    {

    }
}
