using GameShelf.Api.Models;

namespace GameShelf.Api.Repositories;

public interface IRepository<T> where T : class, IEntity
{
    Task<List<T>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<T?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    void Add(T entity);
    void Update(T entity);
    void Delete(T entity);
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
