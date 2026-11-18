namespace GameShelf.Api.Models;

public class Member : IEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public bool IsCommittee { get; set; }

    public ICollection<WishlistItem> WishlistItems { get; set; } = new List<WishlistItem>();
    public ICollection<TradeOffer> TradeOffers { get; set; } = new List<TradeOffer>();
}
