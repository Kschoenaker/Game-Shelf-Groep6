using GameShelf.Api.Data;
using GameShelf.Api.Repositories;
using GameShelf.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<ApiExceptionHandler>();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IWishlistService, WishlistService>();
builder.Services.AddScoped<ICatalogService, CatalogService>();
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()));

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();
app.UseCors();
app.MapControllers();
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

await SeedData.InitializeAsync(app);

app.MapGet("/", () => "GameShelf API is running");
app.Run();
