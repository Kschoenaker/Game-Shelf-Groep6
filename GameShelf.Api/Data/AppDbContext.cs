using GameShelf.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameShelf.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Member> Members => Set<Member>();
    public DbSet<Game> Games => Set<Game>();
    public DbSet<WishlistItem> WishlistItems => Set<WishlistItem>();
    public DbSet<TradeOffer> TradeOffers => Set<TradeOffer>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Member>(entity =>
        {
            entity.ToTable("MEMBER");
            entity.Property(member => member.Id).HasColumnName("member_id");
            entity.Property(member => member.Name).HasColumnName("name");
            entity.Property(member => member.Email).HasColumnName("email");
            entity.Property(member => member.PasswordHash).HasColumnName("password_hash");
            entity.Property(member => member.IsCommittee).HasColumnName("is_committee");
        });

        modelBuilder.Entity<Game>(entity =>
        {
            entity.ToTable("GAME");
            entity.Property(game => game.Id).HasColumnName("game_id");
            entity.Property(game => game.Title).HasColumnName("title");
            entity.Property(game => game.Publisher).HasColumnName("publisher");
            entity.Property(game => game.ReleaseYear).HasColumnName("release_year");
            entity.Property(game => game.Edition).HasColumnName("edition");
            entity.Property(game => game.Category).HasColumnName("category");
            entity.Property(game => game.MinPlayers).HasColumnName("min_players");
            entity.Property(game => game.MaxPlayers).HasColumnName("max_players");
            entity.Property(game => game.PlayingTimeMinutes).HasColumnName("playing_time_minutes");
            entity.Property(game => game.BoxImageUrl).HasColumnName("box_image_url");
        });

        modelBuilder.Entity<WishlistItem>(entity =>
        {
            entity.ToTable("WISHLIST_ITEM");
            entity.Property(item => item.Id).HasColumnName("wishlist_item_id");
            entity.Property(item => item.MemberId).HasColumnName("member_id");
            entity.Property(item => item.GameId).HasColumnName("game_id");
            entity.Property(item => item.Priority).HasColumnName("priority");
            entity.Property(item => item.Note).HasColumnName("note");
            entity.Property(item => item.IsFulfilled).HasColumnName("is_fulfilled");
        });

        modelBuilder.Entity<TradeOffer>(entity =>
        {
            entity.ToTable("TRADE_OFFER");
            entity.Property(offer => offer.Id).HasColumnName("offer_id");
            entity.Property(offer => offer.WishlistItemId).HasColumnName("wishlist_item_id");
            entity.Property(offer => offer.ProposerId).HasColumnName("proposer_id");
            entity.Property(offer => offer.RequestedGameId).HasColumnName("requested_game_id");
            entity.Property(offer => offer.MadeAt).HasColumnName("made_at");
            entity.Property(offer => offer.Status).HasColumnName("status");
        });

        modelBuilder.Entity<WishlistItem>()
            .HasOne(item => item.Member)
            .WithMany(member => member.WishlistItems)
            .HasForeignKey(item => item.MemberId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<WishlistItem>()
            .HasOne(item => item.Game)
            .WithMany(game => game.WishlistItems)
            .HasForeignKey(item => item.GameId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<TradeOffer>()
            .HasOne(offer => offer.WishlistItem)
            .WithMany(item => item.Offers)
            .HasForeignKey(offer => offer.WishlistItemId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<TradeOffer>()
            .HasOne(offer => offer.Proposer)
            .WithMany(member => member.TradeOffers)
            .HasForeignKey(offer => offer.ProposerId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<TradeOffer>()
            .HasOne(offer => offer.RequestedGame)
            .WithMany()
            .HasForeignKey(offer => offer.RequestedGameId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
