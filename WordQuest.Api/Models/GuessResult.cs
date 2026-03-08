public class GuessResult
{
    public string Guess { get; set; } = "";
    public List<LetterState> Feedback { get; set; } = new();
}