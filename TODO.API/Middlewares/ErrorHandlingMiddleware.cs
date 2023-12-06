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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="next"></param>
        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        /// <summary>
        /// ПО промежуточного слоя конечной точки на предыдущей схеме выполняет конвейер фильтра
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ValidationException ex)
            {
                context.Response.ContentType = "application/problem+json";
                context.Response.StatusCode = 400;

                await context.Response.WriteAsync(JsonConvert.SerializeObject(ex.Errors
                    .Select(e => new ProblemDetail
                    {
                        PropertyName = e.PropertyName,
                        ErrorMessage = e.ErrorMessage
                    }).ToList()));

            }
            catch (BadHttpRequestException ex)
            {
                context.Response.ContentType = "application/problem+json";
                context.Response.StatusCode = 400;

                await context.Response.WriteAsync(ex.Message);
            }
        }
    }
}
