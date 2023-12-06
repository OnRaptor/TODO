using DB.Models;
using Domain.DTO;
using MediatR;
using TODO.API.Services;

namespace TODO.API.Handlers.Queries
{
    public record GetUserInfoQuery(string? userId) : IRequest<UserDTO>;
    public class GetUserInfoQueryHandler : IRequestHandler<GetUserInfoQuery, UserDTO>
    {
        public UserService _userService;
        public GetUserInfoQueryHandler(UserService _userService)
        {
            this._userService = _userService;
        }
        public async Task<UserDTO> Handle(GetUserInfoQuery request, CancellationToken cancellationToken)
        {
            if (request.userId == null) 
                throw new BadHttpRequestException("No token");
            var user = await _userService.FindUserByUUID(request.userId);
            return new UserDTO() { Name = user!.UserName };
        }
    }
}
