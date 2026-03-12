public class PlayerState
{

    public string? PlayerId { get; set; }
    public string? ConnectionId { get; set; }

    public List<GuessResult> Guesses { get; set; } = new();

    public bool Finished { get; set; }

    public DateTime? SolvedAt { get; set; }

    public int Score { get; set; }
}