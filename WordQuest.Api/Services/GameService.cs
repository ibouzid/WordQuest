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
        Guesses = game.Guesses,
        IsGameOver = game.IsGameOver,
        MaxAttempts = game.MaxAttempts,
        SecretWord = game.IsGameOver ? game.SecretWord : null,
        IsFromApi = game.IsFromApi,
        Timer = game.Timer
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

    public async Task<GameDto> StartGame(int wordLength = 5, string language = "en", int difficulty = 3, int guessAttempts = 5, int timer = 0)
    {
        var word = await _wordService.GetRandomWord(wordLength, language, difficulty);

        var game = new GameState
        {
            GameId = Guid.NewGuid().ToString(),
            SecretWord = word.Word.ToUpper(),
            Difficulty = difficulty,
            Language = language,
            WordLength = wordLength,
            IsFromApi = word.IsFromApi,
            MaxAttempts = guessAttempts,
            Timer = timer
        };

        _games[game.GameId] = game;

        return MapToDto(game);
    }
    public GameDto? MakeGuess(string gameId, string guess)
    {
        var game = GetGame(gameId);
        Console.WriteLine($"Game {gameId}: Received guess '{guess}'");
        Console.WriteLine($"Game state before guess: {game.SecretWord}");
        if (game == null)
        {
            return null;
        }
        if (guess.Length != game.SecretWord.Length)
        {
            throw new Exception("Guess must match word length");
        }

        var secretWord = game.SecretWord;
        var feedback = new List<LetterState>();
        if (guess == secretWord)
        {
            feedback = Enumerable.Repeat(LetterState.Correct, secretWord.Length).ToList();
            game.Guesses.Add(new GuessResult
            {
                Guess = guess,
                Feedback = feedback
            });
            game.Attempts++;
            game.IsGameOver = true;
            return MapToDto(game);
        }
        for (int i = 0; i < guess.Length; i++)
        {
            if (guess[i] == secretWord[i])
            {
                feedback.Add(LetterState.Correct);
            }
            else if (secretWord.Contains(guess[i]))
            {
                feedback.Add(LetterState.Present);
            }
            else
            {
                feedback.Add(LetterState.Absent);
            }
        }

        game.Guesses.Add(new GuessResult
        {
            Guess = guess,
            Feedback = feedback
        });
        game.Attempts++;

        if (game.Attempts >= game.MaxAttempts)
        {
            game.IsGameOver = true;
        }

        return MapToDto(game);
    }
}