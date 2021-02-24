using System;
using System.Collections.Generic;
using MediatR;
using QueueTest.Application.Dto;

namespace QueueTest.Application.Queries
{
    public class MyQuery : IRequest<List<MyDto>>
    {

    }
}
