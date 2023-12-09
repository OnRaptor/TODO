using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;
using TODO.API.Common;

namespace TODO.API.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (BadHttpRequestException ex)
            {
                context.Response.ContentType = "application/problem+json";
                context.Response.StatusCode = 400;

                await context.Response.WriteAsync(ex.Message);
            }
            catch (FormatException ex)
            {
                context.Response.ContentType = "application/problem+json";
                context.Response.StatusCode = 400;

                await context.Response.WriteAsync(ex.Message);
            }
        }
    }
}
