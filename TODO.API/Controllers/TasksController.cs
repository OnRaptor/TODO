﻿using Domain.DTO;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TODO.API.Handlers.Commands;
using TODO.API.Handlers.Queries;

namespace TODO.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly IMediator _mediator;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="mediator"></param>
        public TasksController(IMediator mediator) => _mediator = mediator;

        [HttpPost("tasks")]
        public async Task<IActionResult> CreateTask(TaskDTO taskData)
            => Ok(await _mediator.Send(new CreateTaskCommand(taskData, User.Claims.FirstOrDefault().Value)));
        [HttpGet("tasks")]
        public async Task<IActionResult> GetUserTasks()
            => Ok(await _mediator.Send(new GetTasksQuery(User.Claims.FirstOrDefault().Value)));
    }
}