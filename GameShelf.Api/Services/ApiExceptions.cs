namespace GameShelf.Api.Services;

public sealed class ResourceNotFoundException(string message) : Exception(message);

public sealed class ForbiddenException(string message) : Exception(message);

public sealed class BusinessRuleException(string message) : Exception(message);
