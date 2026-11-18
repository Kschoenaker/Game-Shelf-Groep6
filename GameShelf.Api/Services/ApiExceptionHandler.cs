using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace GameShelf.Api.Services;

public sealed class ApiExceptionHandler(ILogger<ApiExceptionHandler> logger) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        var (statusCode, title) = exception switch
        {
            ResourceNotFoundException => (StatusCodes.Status404NotFound, "Not Found"),
            ForbiddenException => (StatusCodes.Status403Forbidden, "Forbidden"),
            BusinessRuleException => (StatusCodes.Status409Conflict, "Conflict"),
            _ => (0, string.Empty)
        };

        if (statusCode == 0)
        {
            return false;
        }

        logger.LogWarning(exception, "Request rejected: {Title}", title);
        httpContext.Response.StatusCode = statusCode;
        await httpContext.Response.WriteAsJsonAsync(new ProblemDetails
        {
            Status = statusCode,
            Title = title,
            Detail = exception.Message,
            Instance = httpContext.Request.Path
        }, cancellationToken);

        return true;
    }
}
