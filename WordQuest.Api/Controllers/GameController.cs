using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase
{
    private readonly GameService _gameService;
    private readonly ILogger<GameController> _logger;

    public GameController(GameService gameService, ILogger<GameController> logger)
    {
        _gameService = gameService;
        _logger = logger;
    }

    [HttpPost("start")]
    public async Task<IActionResult> StartGame([FromBody] GameSettings request)
    {
        var game = await _gameService.StartGame(request);
        return Ok(game);
    }
    [HttpPost("end")]
    public async Task<IActionResult> EndGame([FromBody] GameEndRequest request)
    {
        var game = _gameService.EndGame(request.GameId);
        return Ok(game);
    }

    [HttpPost("guess")]
    public async Task<IActionResult> MakeGuess([FromBody] GuessRequest request)
    {
        var game = _gameService.MakeGuess(request.GameId, request.Guess.ToUpper(), request.PlayerId);

        _logger.LogInformation("Game {GameId}: Received guess '{Guess}'", request.GameId, request.Guess);
        _logger.LogInformation("Game: {Game}", game);
        return Ok(game);
    }
    [HttpGet("{gameId}")]
    public IActionResult GetGame(string gameId)
    {
        var game = _gameService.GetGameDTO(gameId);

        if (game == null)
            return NotFound();

        return Ok(game);
    }
}