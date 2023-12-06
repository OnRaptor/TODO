using Domain.DTO;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TODO.API.Handlers.Commands;
using TODO.API.Handlers.Queries;

namespace TODO.API.Controllers
{
    [Route("api/")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="mediator"></param>
        public UserController(IMediator mediator) => _mediator = mediator;

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserCommand request)
            => Ok(await _mediator.Send(request));

        [HttpPost("login")]
        public async Task<IActionResult> Login(AuthUserCommand request)
            => Ok(await _mediator.Send(request));

        [Authorize]
        [HttpGet("userinfo")]
        public async Task<IActionResult> GetUserInfo()
            => Ok(await _mediator.Send(new GetUserInfoQuery(User?.Claims.FirstOrDefault()?.Value)));
    }
}
