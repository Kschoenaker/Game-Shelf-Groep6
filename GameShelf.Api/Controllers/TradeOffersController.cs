using GameShelf.Api.Dtos;
using GameShelf.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameShelf.Api.Controllers;

[ApiController]
[Route("api/tradeoffers")]
public sealed class TradeOffersController(IWishlistService wishlist) : ControllerBase
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<TradeOfferDto>> GetById(int id, CancellationToken cancellationToken)
    {
        var offer = await wishlist.GetOfferByIdAsync(id, cancellationToken);
        return offer is null ? NotFound() : Ok(offer);
    }

    [HttpPut("{id:int}/status")]
    public async Task<ActionResult<TradeOfferDto>> UpdateStatus(
        int id,
        UpdateTradeOfferStatusDto dto,
        CancellationToken cancellationToken)
    {
        var updated = await wishlist.UpdateOfferStatusAsync(id, dto, cancellationToken);
        return updated is null ? NotFound() : Ok(updated);
    }
}
