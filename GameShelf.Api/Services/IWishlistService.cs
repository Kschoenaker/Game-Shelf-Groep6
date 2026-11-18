using GameShelf.Api.Dtos;

namespace GameShelf.Api.Services;

public interface IWishlistService
{
    Task<List<WishlistItemDto>> GetAllAsync(CancellationToken cancellationToken);
    Task<WishlistItemDto?> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task<WishlistItemDto> CreateAsync(CreateWishlistItemDto dto, CancellationToken cancellationToken);
    Task<WishlistItemDto?> UpdateAsync(int id, UpdateWishlistItemDto dto, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(int id, int actorMemberId, CancellationToken cancellationToken);
    Task<TradeOfferDto> CreateOfferAsync(int wishlistItemId, CreateTradeOfferDto dto, CancellationToken cancellationToken);
    Task<TradeOfferDto?> GetOfferByIdAsync(int offerId, CancellationToken cancellationToken);
    Task<TradeOfferDto?> UpdateOfferStatusAsync(int offerId, UpdateTradeOfferStatusDto dto, CancellationToken cancellationToken);
}
