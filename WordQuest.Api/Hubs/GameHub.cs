using Microsoft.AspNetCore.SignalR;

public class GameHub : Hub
{
    private readonly GameService _gameService;

    private readonly ILogger<GameHub> _logger;
    public GameHub(GameService gameService, ILogger<GameHub> logger)
    {
        _gameService = gameService;
        _logger = logger;
    }
    public async Task JoinGame(string gameId, string playerId)
{
    var connectionId = Context.ConnectionId;

    var game = _gameService.AddOrReconnectPlayer(gameId, connectionId, playerId);

    await Groups.AddToGroupAsync(connectionId, gameId);
    await Clients.Group(gameId).SendAsync("GameUpdated", game);
}

    public async Task MakeGuess(GuessRequest request)
    {
        var gameDto = _gameService.MakeGuess(request.GameId, request.Guess.ToUpper(), request.PlayerId);

        await Clients.Group(request.GameId).SendAsync("GameUpdated", gameDto);
    }
}