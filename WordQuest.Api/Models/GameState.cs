public class GameState
{
    public string GameId { get; set; } = Guid.NewGuid().ToString();

    public required string SecretWord { get; set; }

    public int Attempts { get; set; }

    public List<GuessResult> Guesses { get; set; } = new();

    public int MaxAttempts { get; set; } = 5;

    public bool IsGameOver { get; set; } = false;

    public int Difficulty { get; set; } = 3;

    public string Language { get; set; } = "en";

    public int WordLength { get; set; } = 5;

    public bool IsFromApi { get; set; }

}