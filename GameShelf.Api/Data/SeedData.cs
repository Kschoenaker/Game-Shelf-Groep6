using GameShelf.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameShelf.Api.Data;

public static class SeedData
{
    public static async Task InitializeAsync(WebApplication app)
    {
        await using var scope = app.Services.CreateAsyncScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        if (!await context.Members.AnyAsync())
        {
            context.Members.AddRange(
                new Member { Name = "Noor", Email = "noor@example.test", PasswordHash = "development-seed-no-login" },
                new Member { Name = "Rafael", Email = "rafael@example.test", PasswordHash = "development-seed-no-login" },
                new Member { Name = "Iris", Email = "iris@example.test", PasswordHash = "development-seed-no-login" }
            );
        }

        if (!await context.Games.AnyAsync())
        {
            context.Games.AddRange(
                new Game { Title = "Monopoly Classic", Publisher = "Hasbro", ReleaseYear = 2020, Edition = "English", Category = "Family", MinPlayers = 2, MaxPlayers = 6, PlayingTimeMinutes = 90 },
                new Game { Title = "Monopoly Builder", Publisher = "Hasbro", ReleaseYear = 2021, Edition = "English", Category = "Family", MinPlayers = 2, MaxPlayers = 4, PlayingTimeMinutes = 60 },
                new Game { Title = "Monopoly Junior", Publisher = "Hasbro", ReleaseYear = 2018, Edition = "Dutch", Category = "Children", MinPlayers = 2, MaxPlayers = 4, PlayingTimeMinutes = 45 },
                new Game { Title = "Monopoly Deal", Publisher = "Hasbro", ReleaseYear = 2008, Edition = "English", Category = "Card game", MinPlayers = 2, MaxPlayers = 5, PlayingTimeMinutes = 15 }
            );
        }

        await context.SaveChangesAsync();
    }
}
