public class WordService
{
    private readonly HttpClient _http;
    private readonly string[] _fallbackWords;

    public WordService(HttpClient http)
    {
        _http = http;
        _fallbackWords = new[] { "APPLE", "BEACH", "BRAIN", "CLOUD", "DREAM", "EARTH", "FROST", "GHOST", "HONEY", "ISLES" };
    }

    public async Task<RandomWordResult> GetRandomWord(int length = 5, string language = "en", int difficulty = 3)
    {
        try
        {
            var url = $"https://random-word-api.herokuapp.com/word?length={length}&lang={language}&diff={difficulty}";
            var words = await _http.GetFromJsonAsync<string[]>(url);

            if (words != null && words.Length > 0)
                return new RandomWordResult
                {
                    Word = words[0].ToUpper(),
                    IsFromApi = true
                };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Random word API failed: {ex.Message}");
        }

        var fallback = _fallbackWords
            .Where(w => w.Length == length)
            .ToList();

        var chosen = fallback.Any()
            ? fallback[Random.Shared.Next(fallback.Count)]
            : "STUCK";

        return new RandomWordResult
        {
            Word = chosen.ToUpper(),
            IsFromApi = false
        };
    }
}
