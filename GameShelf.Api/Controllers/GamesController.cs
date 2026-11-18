using GameShelf.Api.Dtos;
using GameShelf.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameShelf.Api.Controllers;

[ApiController]
[Route("api/games")]
public sealed class GamesController(ICatalogService catalog) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<GameOptionDto>>> GetAll(CancellationToken cancellationToken)
        => Ok(await catalog.GetGamesAsync(cancellationToken));
}
