namespace GameShelf.Api.Models;

public class TradeOffer : IEntity
{
    public int Id { get; set; }
    public int WishlistItemId { get; set; }
    public int ProposerId { get; set; }
    public int RequestedGameId { get; set; }
    public DateTimeOffset MadeAt { get; set; }
    public string Status { get; set; } = "open";

    public WishlistItem WishlistItem { get; set; } = null!;
    public Member Proposer { get; set; } = null!;
    public Game RequestedGame { get; set; } = null!;
}
