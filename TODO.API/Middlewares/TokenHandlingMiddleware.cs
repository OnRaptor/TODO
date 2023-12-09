using System.IdentityModel.Tokens.Jwt;

namespace TODO.API.Middlewares
{
    public class TokenHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        public TokenHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task Invoke(HttpContext context)
        {
            if (context.User.Identity.IsAuthenticated)
            {
                var token = context.Request.Headers.FirstOrDefault(i => i.Key == "Authorization").Value.FirstOrDefault()?.Split("Bearer")[1].Trim();
                if (token != null)
                {
                    var validTo = new JwtSecurityTokenHandler().ReadJwtToken(token).ValidTo;
                    if (DateTime.Now > validTo.ToLocalTime())
                    {
                        context.Response.StatusCode = 400;
                        await context.Response.WriteAsync("Token expired");
                        return;
                    }
                }
            }

            await _next(context);
        }
    }
}
