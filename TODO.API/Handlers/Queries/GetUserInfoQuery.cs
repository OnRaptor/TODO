using DB.Models;
using MediatR;

namespace TODO.API.Handlers.Queries
{
    public record GetUserInfoQuery(string token) : IRequest<User>;
    public class GetUserInfoQueryHandler : IRequestHandler<GetUserInfoQuery, User>
    {
        public async Task<User> Handle(GetUserInfoQuery request, CancellationToken cancellationToken)
        {
            return new User();
        }
    }
}
