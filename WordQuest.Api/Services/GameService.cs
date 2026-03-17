using System.Collections.Concurrent;

public class GameService
{
    private readonly ConcurrentDictionary<string, GameState> _games = new();
    private readonly WordService _wordService;
    private GameDto MapToDto(GameState game)
    {
        return new GameDto
        {
            GameId = game.GameId,
            Difficulty = game.Difficulty,
            Language = game.Language,
            WordLength = game.WordLength,
            // Guesses = game.Guesses,
            IsGameOver = game.IsGameOver,
            MaxAttempts = game.MaxAttempts,
            SecretWord = game.IsGameOver ? game.SecretWord : null,
            IsFromApi = game.IsFromApi,
            Timer = game.Timer,
            Mode = game.Mode,
            Players = game.Players
        };
    }

    public GameService(WordService wordService)
    {
        _wordService = wordService;
    }
    public GameDto? GetGameDTO(string gameId)
    {
        if (_games.TryGetValue(gameId, out var game))
        {
            return MapToDto(game);
        }

        return null;
    }
    private GameState? GetGame(string gameId)
    {
        if (_games.TryGetValue(gameId, out var game))
        {
            return game;
        }

        return null;
    }
    public GameState EndGame(string gameId)
    {
        var game = GetGame(gameId);
        if (game == null)
        {
            return null;
        }
        else
        {
            game.IsGameOver = true;
            return game;
        }
    }

    public async Task<GameDto> StartGame(GameSettings settings)
    {
        var word = await _wordService.GetRandomWord(settings.WordLength, settings.Language, settings.Difficulty);

        var game = new GameState
        {
            GameId = Guid.NewGuid().ToString(),
            SecretWord = word.Word.ToUpper(),
            Difficulty = settings.Difficulty,
            Language = settings.Language,
            WordLength = settings.WordLength,
            IsFromApi = word.IsFromApi,
            MaxAttempts = settings.GuessAttempts,
            Timer = settings.Timer,
            Mode = settings.Mode,
            Players = new List<PlayerState>()
        };
        game.Players.Add(new PlayerState
        {
            PlayerId = settings.PlayerId
        });

        _games[game.GameId] = game;

        return MapToDto(game);
    }
    public GameDto? MakeGuess(string gameId, string guess, string playerId = "default")
    {
        var game = GetGame(gameId);
        if (game == null)
        {
            return null;
        }
        lock (game.Lock)
        {

            var secretWord = game.SecretWord;
            var secretLetters = secretWord.ToHashSet();
            var feedback = new List<LetterState>();
            var player = game.Players.FirstOrDefault(p => p.PlayerId == playerId);

            if (guess.Length != game.SecretWord.Length)
            {
                throw new Exception("Guess must match word length");
            }
            if (game.IsGameOver)
            {
                throw new Exception("Game already finished");
            }

            if (player?.Guesses.Count >= game.MaxAttempts)
            {
                throw new Exception("You have exhausted your guesses.");
            }


            if (player == null)
            {
                throw new Exception("Player not found");
            }
            if (guess == secretWord)
            {
                var gameSolved = game.Players.All(p => p.Guesses.Count == game.MaxAttempts);
                feedback = Enumerable.Repeat(LetterState.Correct, secretWord.Length).ToList();
                player.Guesses.Add(new GuessResult
                {
                    Guess = guess,
                    Feedback = feedback
                });
                game.IsGameOver = game.Mode == "SinglePlayer" ? true : gameSolved;
                return MapToDto(game);
            }
            for (int i = 0; i < guess.Length; i++)
            {
                if (guess[i] == secretWord[i])
                {
                    feedback.Add(LetterState.Correct);
                }
                else if (secretLetters.Contains(guess[i]))
                {
                    feedback.Add(LetterState.Present);
                }
                else
                {
                    feedback.Add(LetterState.Absent);
                }
            }

            player.Guesses.Add(new GuessResult
            {
                Guess = guess,
                Feedback = feedback
            });

            if (game.Players.All(p => p.Guesses.Count == game.MaxAttempts))
            {
                game.IsGameOver = true;
            }

            return MapToDto(game);
        }

    }

    public GameState? AddOrReconnectPlayer(string gameId, string connectionId, string playerId)
    {
        var game = GetGame(gameId);

        var player = game?.Players
            .FirstOrDefault(p => p.PlayerId == playerId);
        if (player == null && game != null)
        {
            player = new PlayerState
            {
                PlayerId = playerId,
                ConnectionId = connectionId
            };
            game.Players.Add(player);
        }
        if (player != null)
            player.ConnectionId = connectionId;

        return game;
    }
}