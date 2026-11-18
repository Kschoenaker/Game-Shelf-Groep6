using System.ComponentModel.DataAnnotations;

namespace GameShelf.Api.Dtos;

/// <summary>Wishlist item returned by the API.</summary>
public sealed record WishlistItemDto(
    int Id,
    int MemberId,
    string Owner,
    int GameId,
    string Game,
    int Priority,
    string Note,
    bool IsFulfilled,
    IReadOnlyList<TradeOfferDto> Offers);

/// <summary>Payload for adding a game to a member's wishlist.</summary>
public sealed record CreateWishlistItemDto
{
    [Range(1, int.MaxValue)]
    public int MemberId { get; init; }

    [Range(1, int.MaxValue)]
    public int GameId { get; init; }

    [Range(1, 3)]
    public int Priority { get; init; }

    [Required, StringLength(160)]
    public string Note { get; init; } = string.Empty;
}

/// <summary>Payload for replacing an existing wishlist item's editable details.</summary>
public sealed record UpdateWishlistItemDto
{
    [Range(1, int.MaxValue)]
    public int ActorMemberId { get; init; }

    [Range(1, int.MaxValue)]
    public int GameId { get; init; }

    [Range(1, 3)]
    public int Priority { get; init; }

    [Required, StringLength(160)]
    public string Note { get; init; } = string.Empty;
}

/// <summary>Offer returned by the API.</summary>
public sealed record TradeOfferDto(
    int Id,
    int ProposerId,
    string Proposer,
    int RequestedGameId,
    string RequestedGame,
    DateTimeOffset MadeAt,
    string Status);

/// <summary>Payload for proposing a game in exchange for a wanted game.</summary>
public sealed record CreateTradeOfferDto
{
    [Range(1, int.MaxValue)]
    public int ProposerId { get; init; }

    [Range(1, int.MaxValue)]
    public int RequestedGameId { get; init; }
}

/// <summary>Payload for changing an offer's status.</summary>
public sealed record UpdateTradeOfferStatusDto
{
    [Range(1, int.MaxValue)]
    public int ActorMemberId { get; init; }

    [Required, RegularExpression("^(accepted|rejected|cancelled)$")]
    public string Status { get; init; } = string.Empty;
}

/// <summary>Game option used by wishlist and trade forms.</summary>
public sealed record GameOptionDto(int Id, string Title, string Edition);

/// <summary>Member option used by the temporary development identity selector.</summary>
public sealed record MemberOptionDto(int Id, string Name);
