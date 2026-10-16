
using api.Converters;
using api.Data;
using api.Interfaces;
using api.Repositories;
using api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new TimeOnlyJsonConverter()
        );
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<ProfessoresStore>();
builder.Services.AddSingleton<ProfessoresInitializer>();

builder.Services.AddSingleton<IProfessoresRepository, ProfessoresRepository>();
builder.Services.AddScoped<IProfessoresServices, ProfessoresServices>();



var app = builder.Build();

var initializer = app.Services.GetRequiredService<ProfessoresInitializer>();
initializer.inicializar();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
