var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddHttpClient<WordService>(client =>
{
    client.Timeout = TimeSpan.FromSeconds(10);
});

builder.Services.AddSingleton<GameService>();
const string myAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(myAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:5173", 
                "https://word-quest-ibouzids-projects.vercel.app"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
});

builder.Services.AddSignalR();

var app = builder.Build();
app.UseCors(myAllowSpecificOrigins);
app.UseRouting(); 
app.MapControllers();
app.MapHub<GameHub>("/gamehub");

app.Run();