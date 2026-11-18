using GameShelf.Api.Dtos;

namespace GameShelf.Api.Services;

public interface ICatalogService
{
    Task<List<GameOptionDto>> GetGamesAsync(CancellationToken cancellationToken);
    Task<List<MemberOptionDto>> GetMembersAsync(CancellationToken cancellationToken);
}
