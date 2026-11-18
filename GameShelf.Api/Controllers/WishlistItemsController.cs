using System.ComponentModel.DataAnnotations;
using GameShelf.Api.Dtos;
using GameShelf.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameShelf.Api.Controllers;

[ApiController]
[Route("api/wishlistitems")]
public sealed class WishlistItemsController(IWishlistService wishlist) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<WishlistItemDto>>> GetAll(CancellationToken cancellationToken)
        => Ok(await wishlist.GetAllAsync(cancellationToken));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<WishlistItemDto>> GetById(int id, CancellationToken cancellationToken)
    {
        var item = await wishlist.GetByIdAsync(id, cancellationToken);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<WishlistItemDto>> Create(
        CreateWishlistItemDto dto,
        CancellationToken cancellationToken)
    {
        var created = await wishlist.CreateAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<WishlistItemDto>> Update(
        int id,
        UpdateWishlistItemDto dto,
        CancellationToken cancellationToken)
    {
        var updated = await wishlist.UpdateAsync(id, dto, cancellationToken);
        return updated is null ? NotFound() : Ok(updated);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(
        int id,
        [FromQuery, Range(1, int.MaxValue)] int actorMemberId,
        CancellationToken cancellationToken)
    {
        var deleted = await wishlist.DeleteAsync(id, actorMemberId, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }

    [HttpPost("{id:int}/offers")]
    public async Task<ActionResult<TradeOfferDto>> CreateOffer(
        int id,
        CreateTradeOfferDto dto,
        CancellationToken cancellationToken)
    {
        var created = await wishlist.CreateOfferAsync(id, dto, cancellationToken);
        return Created($"/api/tradeoffers/{created.Id}", created);
    }
}
