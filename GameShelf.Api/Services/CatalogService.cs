using GameShelf.Api.Dtos;
using GameShelf.Api.Models;
using GameShelf.Api.Repositories;

namespace GameShelf.Api.Services;

public sealed class CatalogService(
    IRepository<Game> games,
    IRepository<Member> members) : ICatalogService
{
    // These small DTOs are for form options, not full catalog or account endpoints.
    public async Task<List<GameOptionDto>> GetGamesAsync(CancellationToken cancellationToken)
        => (await games.GetAllAsync(cancellationToken))
            .Select(game => new GameOptionDto(game.Id, game.Title, game.Edition))
            .ToList();

    public async Task<List<MemberOptionDto>> GetMembersAsync(CancellationToken cancellationToken)
        => (await members.GetAllAsync(cancellationToken))
            .Select(member => new MemberOptionDto(member.Id, member.Name))
            .ToList();
}
