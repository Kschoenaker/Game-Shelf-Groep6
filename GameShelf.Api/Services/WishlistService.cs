using GameShelf.Api.Dtos;
using GameShelf.Api.Models;
using GameShelf.Api.Repositories;

namespace GameShelf.Api.Services;

public sealed class WishlistService(
    IRepository<WishlistItem> wishlistItems,
    IRepository<TradeOffer> tradeOffers,
    IRepository<Member> members,
    IRepository<Game> games) : IWishlistService
{
    // Member IDs in write requests are temporary demo identities until authentication exists.
    public async Task<List<WishlistItemDto>> GetAllAsync(CancellationToken cancellationToken)
    {
        var items = await wishlistItems.GetAllAsync(cancellationToken);
        var offers = await tradeOffers.GetAllAsync(cancellationToken);
        var memberLookup = (await members.GetAllAsync(cancellationToken)).ToDictionary(member => member.Id);
        var gameLookup = (await games.GetAllAsync(cancellationToken)).ToDictionary(game => game.Id);
        var offersByItem = offers.GroupBy(offer => offer.WishlistItemId)
            .ToDictionary(group => group.Key, group => group.ToList());

        return items.OrderBy(item => item.Id).Select(item => ToDto(
            item,
            memberLookup,
            gameLookup,
            offersByItem.TryGetValue(item.Id, out var itemOffers) ? itemOffers.OrderBy(offer => offer.Id) : [],
            memberLookup)).ToList();
    }

    public async Task<WishlistItemDto?> GetByIdAsync(int id, CancellationToken cancellationToken)
    {
        var item = await wishlistItems.GetByIdAsync(id, cancellationToken);
        if (item is null)
        {
            return null;
        }

        var offers = (await tradeOffers.GetAllAsync(cancellationToken))
            .Where(offer => offer.WishlistItemId == item.Id)
            .OrderBy(offer => offer.Id);
        var memberLookup = (await members.GetAllAsync(cancellationToken)).ToDictionary(member => member.Id);
        var gameLookup = (await games.GetAllAsync(cancellationToken)).ToDictionary(game => game.Id);
        return ToDto(item, memberLookup, gameLookup, offers, memberLookup);
    }

    public async Task<WishlistItemDto> CreateAsync(
        CreateWishlistItemDto dto,
        CancellationToken cancellationToken)
    {
        var owner = await members.GetByIdAsync(dto.MemberId, cancellationToken)
            ?? throw new ResourceNotFoundException("Member was not found.");
        var game = await games.GetByIdAsync(dto.GameId, cancellationToken)
            ?? throw new ResourceNotFoundException("Game was not found.");

        var item = new WishlistItem
        {
            MemberId = owner.Id,
            GameId = game.Id,
            Priority = dto.Priority,
            Note = dto.Note.Trim()
        };

        wishlistItems.Add(item);
        await wishlistItems.SaveChangesAsync(cancellationToken);
        return new WishlistItemDto(item.Id, owner.Id, owner.Name, game.Id, game.Title, item.Priority, item.Note, false, []);
    }

    public async Task<WishlistItemDto?> UpdateAsync(
        int id,
        UpdateWishlistItemDto dto,
        CancellationToken cancellationToken)
    {
        var item = await wishlistItems.GetByIdAsync(id, cancellationToken);
        if (item is null)
        {
            return null;
        }

        if (dto.ActorMemberId != item.MemberId)
        {
            throw new ForbiddenException("Only the wishlist owner can update this item.");
        }

        if (item.IsFulfilled)
        {
            throw new BusinessRuleException("A fulfilled wishlist item cannot be changed.");
        }

        var existingOffers = (await tradeOffers.GetAllAsync(cancellationToken))
            .Where(offer => offer.WishlistItemId == item.Id)
            .ToList();
        if (existingOffers.Count > 0 && dto.GameId != item.GameId)
        {
            throw new BusinessRuleException("The wanted game cannot be changed after an offer has been made.");
        }

        var game = await games.GetByIdAsync(dto.GameId, cancellationToken)
            ?? throw new ResourceNotFoundException("Game was not found.");

        item.GameId = game.Id;
        item.Priority = dto.Priority;
        item.Note = dto.Note.Trim();
        await wishlistItems.SaveChangesAsync(cancellationToken);

        return await GetByIdAsync(item.Id, cancellationToken);
    }

    public async Task<bool> DeleteAsync(
        int id,
        int actorMemberId,
        CancellationToken cancellationToken)
    {
        var item = await wishlistItems.GetByIdAsync(id, cancellationToken);
        if (item is null)
        {
            return false;
        }

        if (actorMemberId != item.MemberId)
        {
            throw new ForbiddenException("Only the wishlist owner can delete this item.");
        }

        var hasOffers = (await tradeOffers.GetAllAsync(cancellationToken))
            .Any(offer => offer.WishlistItemId == item.Id);
        if (hasOffers || item.IsFulfilled)
        {
            throw new BusinessRuleException("A wishlist item with trade history cannot be deleted.");
        }

        wishlistItems.Delete(item);
        await wishlistItems.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<TradeOfferDto> CreateOfferAsync(
        int wishlistItemId,
        CreateTradeOfferDto dto,
        CancellationToken cancellationToken)
    {
        var item = await wishlistItems.GetByIdAsync(wishlistItemId, cancellationToken)
            ?? throw new ResourceNotFoundException("Wishlist item was not found.");
        var proposer = await members.GetByIdAsync(dto.ProposerId, cancellationToken)
            ?? throw new ResourceNotFoundException("Member was not found.");
        var requestedGame = await games.GetByIdAsync(dto.RequestedGameId, cancellationToken)
            ?? throw new ResourceNotFoundException("Game was not found.");

        if (item.IsFulfilled)
        {
            throw new BusinessRuleException("A fulfilled wishlist item cannot receive new offers.");
        }

        if (item.MemberId == proposer.Id)
        {
            throw new BusinessRuleException("A member cannot make an offer on their own wishlist item.");
        }

        var offer = new TradeOffer
        {
            WishlistItemId = item.Id,
            ProposerId = proposer.Id,
            RequestedGameId = requestedGame.Id,
            MadeAt = DateTimeOffset.UtcNow,
            Status = "open"
        };

        tradeOffers.Add(offer);
        await tradeOffers.SaveChangesAsync(cancellationToken);
        return ToDto(offer, proposer, requestedGame);
    }

    public async Task<TradeOfferDto?> GetOfferByIdAsync(int offerId, CancellationToken cancellationToken)
    {
        var offer = await tradeOffers.GetByIdAsync(offerId, cancellationToken);
        if (offer is null)
        {
            return null;
        }

        var proposer = await members.GetByIdAsync(offer.ProposerId, cancellationToken)
            ?? throw new ResourceNotFoundException("Member was not found.");
        var requestedGame = await games.GetByIdAsync(offer.RequestedGameId, cancellationToken)
            ?? throw new ResourceNotFoundException("Game was not found.");

        return ToDto(offer, proposer, requestedGame);
    }

    public async Task<TradeOfferDto?> UpdateOfferStatusAsync(
        int offerId,
        UpdateTradeOfferStatusDto dto,
        CancellationToken cancellationToken)
    {
        var offer = await tradeOffers.GetByIdAsync(offerId, cancellationToken);
        if (offer is null)
        {
            return null;
        }

        var item = await wishlistItems.GetByIdAsync(offer.WishlistItemId, cancellationToken)
            ?? throw new ResourceNotFoundException("Wishlist item was not found.");
        var proposer = await members.GetByIdAsync(offer.ProposerId, cancellationToken)
            ?? throw new ResourceNotFoundException("Member was not found.");
        var requestedGame = await games.GetByIdAsync(offer.RequestedGameId, cancellationToken)
            ?? throw new ResourceNotFoundException("Game was not found.");

        if (offer.Status != "open")
        {
            throw new BusinessRuleException("Only open offers can change status.");
        }

        if (dto.Status == "cancelled")
        {
            if (dto.ActorMemberId != offer.ProposerId)
            {
                throw new ForbiddenException("Only the member who made an offer can cancel it.");
            }
        }
        else
        {
            if (dto.ActorMemberId != item.MemberId)
            {
                throw new ForbiddenException("Only the wishlist owner can accept or reject an offer.");
            }

            if (item.IsFulfilled)
            {
                throw new BusinessRuleException("A fulfilled wishlist item cannot receive a response.");
            }
        }

        offer.Status = dto.Status;
        if (dto.Status == "accepted")
        {
            item.IsFulfilled = true;
            var allOffers = await tradeOffers.GetAllAsync(cancellationToken);
            var allItems = await wishlistItems.GetAllAsync(cancellationToken);
            var sameWantedGameItemIds = allItems
                .Where(candidate => candidate.GameId == item.GameId)
                .Select(candidate => candidate.Id)
                .ToHashSet();

            // Close offers that can no longer be accepted on this item or for this same wanted game.
            foreach (var competingOffer in allOffers.Where(candidate =>
                        candidate.Id != offer.Id &&
                        candidate.Status == "open" &&
                        (candidate.WishlistItemId == item.Id ||
                        (candidate.ProposerId == offer.ProposerId &&
                        sameWantedGameItemIds.Contains(candidate.WishlistItemId)))))
            {
                competingOffer.Status = "cancelled";
            }
        }

        await tradeOffers.SaveChangesAsync(cancellationToken);
        return ToDto(offer, proposer, requestedGame);
    }

    private static WishlistItemDto ToDto(
        WishlistItem item,
        IReadOnlyDictionary<int, Member> membersById,
        IReadOnlyDictionary<int, Game> gamesById,
        IEnumerable<TradeOffer> itemOffers,
        IReadOnlyDictionary<int, Member> membersForOffers)
    {
        // Map entities to API DTOs so EF navigation properties and account fields stay internal.
        var offers = itemOffers.Select(offer => ToDto(
            offer,
            membersForOffers[offer.ProposerId],
            gamesById[offer.RequestedGameId])).ToList();

        return new WishlistItemDto(
            item.Id,
            item.MemberId,
            membersById[item.MemberId].Name,
            item.GameId,
            gamesById[item.GameId].Title,
            item.Priority,
            item.Note,
            item.IsFulfilled,
            offers);
    }

    private static TradeOfferDto ToDto(TradeOffer offer, Member proposer, Game requestedGame)
        => new(offer.Id, proposer.Id, proposer.Name, requestedGame.Id, requestedGame.Title, offer.MadeAt, offer.Status);
}
