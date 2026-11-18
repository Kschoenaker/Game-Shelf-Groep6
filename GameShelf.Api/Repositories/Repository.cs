using GameShelf.Api.Data;
using GameShelf.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameShelf.Api.Repositories;

public class Repository<T>(AppDbContext context) : IRepository<T> where T : class, IEntity
{
    public Task<List<T>> GetAllAsync(CancellationToken cancellationToken = default)
        => context.Set<T>().ToListAsync(cancellationToken);

    public Task<T?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        => context.Set<T>().FirstOrDefaultAsync(entity => entity.Id == id, cancellationToken);

    public void Add(T entity) => context.Set<T>().Add(entity);

    public void Update(T entity) => context.Set<T>().Update(entity);

    public void Delete(T entity) => context.Set<T>().Remove(entity);

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        => context.SaveChangesAsync(cancellationToken);
}
