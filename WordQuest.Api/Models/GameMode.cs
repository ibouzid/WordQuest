public readonly record struct GameMode(string Value)
{
    public static readonly GameMode SinglePlayer = new("SinglePlayer");
    public static readonly GameMode Multiplayer = new("Multiplayer");
    public override string ToString() => Value;
}
