namespace GameShelf.Api.Models;

public class WishlistItem : IEntity
{
    public int Id { get; set; }
    public int MemberId { get; set; }
    public int GameId { get; set; }
    public int Priority { get; set; }
    public string Note { get; set; } = string.Empty;
    public bool IsFulfilled { get; set; }

    public Member Member { get; set; } = null!;
    public Game Game { get; set; } = null!;
    public ICollection<TradeOffer> Offers { get; set; } = new List<TradeOffer>();
}
