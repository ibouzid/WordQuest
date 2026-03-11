public class GameDto
{
    public string GameId { get; set; }
    public List<GuessResult> Guesses { get; set; } = new();
    public bool IsGameOver { get; set; }
    public int MaxAttempts { get; set; }
    public int Timer { get; set; }
    public int Difficulty { get; set; }

    public string Language { get; set; }

    public int WordLength { get; set; }

    public string? SecretWord { get; set; }

    public bool IsFromApi { get; set; }

}