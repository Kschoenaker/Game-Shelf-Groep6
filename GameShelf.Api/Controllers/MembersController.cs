using GameShelf.Api.Dtos;
using GameShelf.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameShelf.Api.Controllers;

[ApiController]
[Route("api/members")]
public sealed class MembersController(ICatalogService catalog) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<MemberOptionDto>>> GetAll(CancellationToken cancellationToken)
        => Ok(await catalog.GetMembersAsync(cancellationToken));
}
