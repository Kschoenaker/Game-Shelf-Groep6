namespace GameShelf.Api.Models;

public class Game : IEntity
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Publisher { get; set; } = string.Empty;
    public int ReleaseYear { get; set; }
    public string Edition { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int MinPlayers { get; set; }
    public int MaxPlayers { get; set; }
    public int PlayingTimeMinutes { get; set; }
    public string BoxImageUrl { get; set; } = string.Empty;

    public ICollection<WishlistItem> WishlistItems { get; set; } = new List<WishlistItem>();
}
