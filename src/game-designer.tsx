import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Crosshair, Swords, Map, Gamepad2, Sparkles, Users, ChevronRight, ChevronLeft,
  Check, Rocket, Zap, Trophy, Download, Copy, CheckCircle2
} from "lucide-react";

// ─── DATA ───────────────────────────────────────────────────────────
const STEPS = [
  { id: "welcome", label: "Start", icon: Rocket },
  { id: "name", label: "Name", icon: Sparkles },
  { id: "theme", label: "Theme", icon: Map },
  { id: "style", label: "Style", icon: Gamepad2 },
  { id: "weapons", label: "Weapons", icon: Crosshair },
  { id: "maps", label: "Maps", icon: Map },
  { id: "modes", label: "Modes", icon: Swords },
  { id: "special", label: "Special", icon: Zap },
  { id: "team", label: "Team", icon: Users },
  { id: "review", label: "Review", icon: Trophy },
];

const THEMES = [
  { id: "military", label: "Military Base", desc: "Realistic army base with vehicles, bunkers, and barracks", emoji: "🪖" },
  { id: "scifi", label: "Sci-Fi Space Station", desc: "Futuristic space station with laser beams and zero gravity zones", emoji: "🚀" },
  { id: "paintball", label: "Paintball Park", desc: "Colourful outdoor paintball arena with inflatable cover", emoji: "🎨" },
  { id: "zombie", label: "Zombie Apocalypse", desc: "Abandoned city overrun by zombies — survive together", emoji: "🧟" },
  { id: "pirate", label: "Pirate Island", desc: "Tropical island with ships, cannons, and treasure", emoji: "🏴‍☠️" },
  { id: "cyberpunk", label: "Neon City", desc: "Dark cyberpunk city with neon lights and rooftop battles", emoji: "🌆" },
  { id: "medieval", label: "Castle Siege", desc: "Medieval castles, towers, and drawbridges", emoji: "🏰" },
  { id: "school", label: "Nerf War School", desc: "A massive school building turned into a Nerf arena", emoji: "🏫" },
];

const STYLES = [
  { id: "fast", label: "Fast & Arcade", desc: "Run-and-gun, respawn quickly, constant action like Arsenal", emoji: "⚡" },
  { id: "tactical", label: "Tactical & Strategic", desc: "Slower, plan your moves, teamwork matters like CS2", emoji: "🧠" },
  { id: "chaos", label: "Total Chaos", desc: "Explosions everywhere, crazy weapons, maximum fun", emoji: "💥" },
  { id: "stealth", label: "Stealth & Sneaky", desc: "Hide, sneak, ambush — patience wins", emoji: "🥷" },
];

const WEAPONS = [
  { id: "pistol", label: "Pistol", desc: "Reliable sidearm, quick draw", icon: "🔫", category: "Basic" },
  { id: "ar", label: "Assault Rifle", desc: "All-rounder, medium range", icon: "🎯", category: "Basic" },
  { id: "shotgun", label: "Shotgun", desc: "Devastating up close", icon: "💪", category: "Basic" },
  { id: "smg", label: "SMG", desc: "Fast fire rate, run & spray", icon: "🔥", category: "Basic" },
  { id: "sniper", label: "Sniper Rifle", desc: "One shot, long range", icon: "🎯", category: "Special" },
  { id: "rpg", label: "Rocket Launcher", desc: "Big boom, splash damage", icon: "🚀", category: "Special" },
  { id: "minigun", label: "Minigun", desc: "Slow to spin up, unstoppable", icon: "⚙️", category: "Special" },
  { id: "crossbow", label: "Crossbow", desc: "Silent, precise, satisfying", icon: "🏹", category: "Special" },
  { id: "raygun", label: "Ray Gun", desc: "Sci-fi energy blasts", icon: "⚡", category: "Crazy" },
  { id: "gravity", label: "Gravity Gun", desc: "Fling objects and players", icon: "🌀", category: "Crazy" },
  { id: "freeze", label: "Freeze Ray", desc: "Slow enemies down to a crawl", icon: "❄️", category: "Crazy" },
  { id: "portal", label: "Portal Gun", desc: "Teleport across the map", icon: "🟣", category: "Crazy" },
];

const MAP_THEMES = [
  { id: "warehouse", label: "Abandoned Warehouse", desc: "Close quarters, lots of corners and crates", emoji: "🏭" },
  { id: "rooftops", label: "City Rooftops", desc: "Jump between buildings, vertically layered", emoji: "🏢" },
  { id: "jungle", label: "Dense Jungle", desc: "Trees, rivers, hidden paths through foliage", emoji: "🌴" },
  { id: "arctic", label: "Arctic Outpost", desc: "Snow, ice, limited visibility in blizzards", emoji: "🏔️" },
  { id: "underground", label: "Underground Bunker", desc: "Tunnels, vents, tight corridors", emoji: "🕳️" },
  { id: "arena", label: "Gladiator Arena", desc: "Open circular arena, nowhere to hide", emoji: "🏟️" },
  { id: "spaceship", label: "Crashed Spaceship", desc: "Alien wreckage with weird gravity zones", emoji: "🛸" },
  { id: "mall", label: "Shopping Mall", desc: "Multiple floors, escalators, shops to hide in", emoji: "🛍️" },
];

const GAME_MODES = [
  { id: "ffa", label: "Free-For-All", desc: "Every player for themselves — most kills wins", emoji: "👤" },
  { id: "tdm", label: "Team Deathmatch", desc: "Red vs Blue — team with most kills wins", emoji: "⚔️" },
  { id: "gungame", label: "Gun Game", desc: "Get a kill, get a new weapon — like Arsenal", emoji: "🔄" },
  { id: "ctf", label: "Capture the Flag", desc: "Steal the enemy flag and bring it home", emoji: "🚩" },
  { id: "koth", label: "King of the Hill", desc: "Control the zone to score points", emoji: "👑" },
  { id: "infected", label: "Infected", desc: "One player starts as zombie, infects others", emoji: "🧟" },
];

const SPECIAL_FEATURES = [
  { id: "colorzones", label: "Colour Zones", desc: "Floor zones that give you different weapons when you step on them — zones shuffle every 60 seconds", emoji: "🎨" },
  { id: "lowgrav", label: "Low Gravity Zones", desc: "Parts of the map have reduced gravity — jump super high", emoji: "🌙" },
  { id: "powerups", label: "Power-Up Drops", desc: "Random crates drop with speed boosts, shields, and double damage", emoji: "📦" },
  { id: "destructible", label: "Destructible Map", desc: "Walls and objects break when shot — the map changes as you play", emoji: "💣" },
  { id: "vehicles", label: "Vehicles", desc: "Drive jeeps, tanks, or hover bikes around the map", emoji: "🚗" },
  { id: "abilities", label: "Special Abilities", desc: "Each player picks a unique ability: dash, shield, invisibility, or heal", emoji: "✨" },
  { id: "shrink", label: "Shrinking Zone", desc: "The playable area shrinks over time like a battle royale", emoji: "🔴" },
  { id: "none", label: "Keep It Simple", desc: "No gimmicks — just pure shooting skill", emoji: "🎯" },
];

const TEAM_SIZES = [
  { id: "2v2", label: "2v2", desc: "Small and intense", emoji: "👥" },
  { id: "4v4", label: "4v4", desc: "Perfect for a friend group", emoji: "👥👥" },
  { id: "5v5", label: "5v5", desc: "Competitive standard", emoji: "🏆" },
  { id: "8ffa", label: "8 Player FFA", desc: "Chaos with 8 players", emoji: "🎮" },
  { id: "10ffa", label: "10 Player FFA", desc: "Maximum madness", emoji: "💥" },
];

// ─── COMPONENTS ─────────────────────────────────────────────────────

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-1 w-full max-w-lg mx-auto" data-testid="step-indicator">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div key={i} className="flex-1 flex items-center">
          <div
            className={`h-1.5 w-full rounded-full transition-all duration-300 ${
              i < currentStep ? "bg-primary" : i === currentStep ? "bg-primary/50 progress-active" : "bg-muted"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

function SelectionCard({
  selected,
  onClick,
  emoji,
  label,
  desc,
  testId,
}: {
  selected: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
  desc: string;
  testId: string;
}) {
  return (
    <button
      onClick={onClick}
      data-testid={testId}
      className={`selection-card relative text-left p-4 rounded-xl border-2 transition-all ${
        selected
          ? "border-primary bg-primary/10 glow-cyan"
          : "border-border/50 bg-card hover:border-primary/40 hover:bg-card/80"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">{emoji}</span>
        <div className="min-w-0">
          <p className={`font-semibold text-sm ${selected ? "text-primary" : "text-foreground"}`}>{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
        </div>
      </div>
      {selected && (
        <div className="absolute top-2 right-2">
          <Check className="w-4 h-4 text-primary" />
        </div>
      )}
    </button>
  );
}

function MultiSelectCard({
  selected,
  onClick,
  emoji,
  label,
  desc,
  category,
  testId,
}: {
  selected: boolean;
  onClick: () => void;
  emoji: string;
  label: string;
  desc: string;
  category?: string;
  testId: string;
}) {
  return (
    <button
      onClick={onClick}
      data-testid={testId}
      className={`selection-card relative text-left p-3 rounded-lg border-2 transition-all ${
        selected
          ? "border-primary bg-primary/10"
          : "border-border/50 bg-card hover:border-primary/40"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className="text-xl flex-shrink-0">{emoji}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className={`font-medium text-sm ${selected ? "text-primary" : "text-foreground"}`}>{label}</p>
            {category && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{category}</Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
        </div>
        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          selected ? "border-primary bg-primary" : "border-muted-foreground/30"
        }`}>
          {selected && <Check className="w-3 h-3 text-primary-foreground" />}
        </div>
      </div>
    </button>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────

export default function GameDesigner() {
  const [step, setStep] = useState(0);
  const [designerNames, setDesignerNames] = useState("");
  const [gameName, setGameName] = useState("");
  const [tagline, setTagline] = useState("");
  const [theme, setTheme] = useState("");
  const [gameStyle, setGameStyle] = useState("");
  const [weapons, setWeapons] = useState<string[]>([]);
  const [mapThemes, setMapThemes] = useState<string[]>([]);
  const [gameModes, setGameModes] = useState<string[]>([]);
  const [specialFeature, setSpecialFeature] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const buildDesignObject = () => {
    return {
      gameName,
      tagline,
      designerNames,
      theme: getLookup(THEMES, theme)?.label || theme,
      themeId: theme,
      gameStyle: getLookup(STYLES, gameStyle)?.label || gameStyle,
      gameStyleId: gameStyle,
      weapons: weapons.map(w => ({ id: w, name: WEAPONS.find(x => x.id === w)?.label || w, category: WEAPONS.find(x => x.id === w)?.category || "" })),
      mapThemes: mapThemes.map(m => ({ id: m, name: MAP_THEMES.find(x => x.id === m)?.label || m })),
      gameModes: gameModes.map(m => ({ id: m, name: GAME_MODES.find(x => x.id === m)?.label || m })),
      specialFeature: getLookup(SPECIAL_FEATURES, specialFeature)?.label || specialFeature,
      specialFeatureId: specialFeature,
      specialFeatureDesc: getLookup(SPECIAL_FEATURES, specialFeature)?.desc || "",
      teamSize: getLookup(TEAM_SIZES, teamSize)?.label || teamSize,
      teamSizeId: teamSize,
      submittedAt: new Date().toISOString(),
    };
  };

  const handleSubmit = () => {
    const design = buildDesignObject();
    // Download JSON file
    const blob = new Blob([JSON.stringify(design, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${gameName.toLowerCase().replace(/\s+/g, "-")}-game-design.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSubmitted(true);
  };

  const handleCopyToClipboard = async () => {
    const design = buildDesignObject();
    try {
      await navigator.clipboard.writeText(JSON.stringify(design, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text from a textarea
      const textArea = document.createElement("textarea");
      textArea.value = JSON.stringify(design, null, 2);
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleWeapon = (id: string) => {
    setWeapons((prev) => prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]);
  };

  const toggleMap = (id: string) => {
    setMapThemes((prev) => prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]);
  };

  const toggleMode = (id: string) => {
    setGameModes((prev) => prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]);
  };

  const canAdvance = () => {
    switch (STEPS[step].id) {
      case "welcome": return designerNames.trim().length > 0;
      case "name": return gameName.trim().length > 0;
      case "theme": return theme !== "";
      case "style": return gameStyle !== "";
      case "weapons": return weapons.length >= 3;
      case "maps": return mapThemes.length >= 1;
      case "modes": return gameModes.length >= 1;
      case "special": return specialFeature !== "";
      case "team": return teamSize !== "";
      case "review": return true;
      default: return false;
    }
  };

  const goNext = () => {
    if (step < STEPS.length - 1 && canAdvance()) setStep(step + 1);
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const getLookup = (arr: typeof THEMES, id: string) => arr.find((i) => i.id === id);

  // ─── SUCCESS SCREEN ──────────────────────────────────────────────
  if (submitted) {
    const design = buildDesignObject();
    return (
      <div className="min-h-screen gradient-gaming grid-bg flex items-center justify-center p-6">
        <div className="w-full max-w-lg text-center space-y-6">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="text-xl font-bold text-primary glow-text-cyan">{gameName}</h1>
          <p className="text-muted-foreground text-sm">
            Your game design file has been downloaded. Send it to Dad so the build crew can turn your vision into a real Roblox game.
          </p>
          <div className="bg-card border border-border rounded-xl p-5 text-left space-y-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Design Summary</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Theme:</span> <span className="text-foreground">{design.theme}</span></div>
              <div><span className="text-muted-foreground">Style:</span> <span className="text-foreground">{design.gameStyle}</span></div>
              <div><span className="text-muted-foreground">Team:</span> <span className="text-foreground">{design.teamSize}</span></div>
              <div><span className="text-muted-foreground">Weapons:</span> <span className="text-foreground">{design.weapons.length} selected</span></div>
              <div><span className="text-muted-foreground">Maps:</span> <span className="text-foreground">{design.mapThemes.length} selected</span></div>
              <div><span className="text-muted-foreground">Modes:</span> <span className="text-foreground">{design.gameModes.length} selected</span></div>
            </div>
            {tagline && (
              <p className="text-xs italic text-muted-foreground pt-2 border-t border-border">"{tagline}"</p>
            )}
          </div>

          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">What to do next</p>
            <div className="space-y-2 text-sm text-left">
              <p className="text-foreground">1. A JSON file was just downloaded to your computer</p>
              <p className="text-foreground">2. Send that file to Dad, or use the copy button below</p>
              <p className="text-foreground">3. Dad pastes it into the AI build tool and your game gets built</p>
            </div>
          </div>

          <div className="flex gap-3 justify-center flex-wrap">
            <Button
              onClick={handleSubmit}
              variant="outline"
              className="gap-2"
              data-testid="button-download-again"
            >
              <Download className="w-4 h-4" />
              Download Again
            </Button>
            <Button
              onClick={handleCopyToClipboard}
              variant="outline"
              className="gap-2"
              data-testid="button-copy"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy to Clipboard"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => { setSubmitted(false); setStep(0); setGameName(""); setTagline(""); setTheme(""); setGameStyle(""); setWeapons([]); setMapThemes([]); setGameModes([]); setSpecialFeature(""); setTeamSize(""); setDesignerNames(""); setCopied(false); }}
              data-testid="button-new-design"
            >
              Design Another Game
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ─── WIZARD ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen gradient-gaming grid-bg flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Crosshair className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground tracking-tight">Game Design Studio</h1>
              <p className="text-[11px] text-muted-foreground">Roblox FPS Builder</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Step {step + 1} of {STEPS.length}
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="px-6 py-3">
        <div className="max-w-2xl mx-auto">
          <StepIndicator currentStep={step} totalSteps={STEPS.length} />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">

          {/* STEP 0: WELCOME */}
          {STEPS[step].id === "welcome" && (
            <div className="space-y-6" data-testid="step-welcome">
              <div className="text-center space-y-3">
                <div className="text-5xl">🎮</div>
                <h2 className="text-xl font-bold text-foreground">Design Your FPS Game</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Answer a few questions about the game you want to build. Pick your weapons, maps, modes, and style — then we'll build it in Roblox Studio.
                </p>
              </div>
              <div className="max-w-sm mx-auto space-y-3">
                <label className="text-sm font-medium text-foreground">Who's designing this game?</label>
                <Input
                  placeholder="Your names (e.g. Jake & Tom)"
                  value={designerNames}
                  onChange={(e) => setDesignerNames(e.target.value)}
                  className="bg-card border-border text-center"
                  data-testid="input-designer-names"
                />
                <p className="text-xs text-muted-foreground text-center">Your names will be in the game credits</p>
              </div>
            </div>
          )}

          {/* STEP 1: NAME */}
          {STEPS[step].id === "name" && (
            <div className="space-y-6" data-testid="step-name">
              <div className="text-center space-y-2">
                <div className="text-4xl">✨</div>
                <h2 className="text-xl font-bold text-foreground">Name Your Game</h2>
                <p className="text-sm text-muted-foreground">Every great game needs a great name. Make it memorable.</p>
              </div>
              <div className="max-w-sm mx-auto space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Game Name</label>
                  <Input
                    placeholder="e.g. CHROMABLAST, Shadow Strike, Neon Warfare"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    className="bg-card border-border text-center text-lg font-semibold"
                    data-testid="input-game-name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Tagline <span className="text-muted-foreground font-normal">(optional)</span></label>
                  <Input
                    placeholder="e.g. The colours decide your fate"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="bg-card border-border text-center"
                    data-testid="input-tagline"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: THEME */}
          {STEPS[step].id === "theme" && (
            <div className="space-y-5" data-testid="step-theme">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-foreground">Pick Your World</h2>
                <p className="text-sm text-muted-foreground">What setting do you want your game in?</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {THEMES.map((t) => (
                  <SelectionCard
                    key={t.id}
                    selected={theme === t.id}
                    onClick={() => setTheme(t.id)}
                    emoji={t.emoji}
                    label={t.label}
                    desc={t.desc}
                    testId={`theme-${t.id}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: STYLE */}
          {STEPS[step].id === "style" && (
            <div className="space-y-5" data-testid="step-style">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-foreground">How Should It Feel?</h2>
                <p className="text-sm text-muted-foreground">Pick the overall pace and vibe of your game</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {STYLES.map((s) => (
                  <SelectionCard
                    key={s.id}
                    selected={gameStyle === s.id}
                    onClick={() => setGameStyle(s.id)}
                    emoji={s.emoji}
                    label={s.label}
                    desc={s.desc}
                    testId={`style-${s.id}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: WEAPONS */}
          {STEPS[step].id === "weapons" && (
            <div className="space-y-5" data-testid="step-weapons">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-foreground">Choose Your Arsenal</h2>
                <p className="text-sm text-muted-foreground">
                  Pick at least 3 weapons. Mix basic, special, and crazy ones.
                  <span className="text-primary ml-1">{weapons.length} selected</span>
                </p>
              </div>
              {["Basic", "Special", "Crazy"].map((cat) => (
                <div key={cat} className="space-y-2">
                  <p className="text-xs uppercase tracking-wider font-medium text-muted-foreground">{cat} Weapons</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {WEAPONS.filter((w) => w.category === cat).map((w) => (
                      <MultiSelectCard
                        key={w.id}
                        selected={weapons.includes(w.id)}
                        onClick={() => toggleWeapon(w.id)}
                        emoji={w.icon}
                        label={w.label}
                        desc={w.desc}
                        testId={`weapon-${w.id}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 5: MAPS */}
          {STEPS[step].id === "maps" && (
            <div className="space-y-5" data-testid="step-maps">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-foreground">Design Your Battlegrounds</h2>
                <p className="text-sm text-muted-foreground">
                  Pick 1-3 map themes. We'll build them out for you.
                  <span className="text-primary ml-1">{mapThemes.length} selected</span>
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MAP_THEMES.map((m) => (
                  <MultiSelectCard
                    key={m.id}
                    selected={mapThemes.includes(m.id)}
                    onClick={() => toggleMap(m.id)}
                    emoji={m.emoji}
                    label={m.label}
                    desc={m.desc}
                    testId={`map-${m.id}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: GAME MODES */}
          {STEPS[step].id === "modes" && (
            <div className="space-y-5" data-testid="step-modes">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-foreground">How Do You Win?</h2>
                <p className="text-sm text-muted-foreground">
                  Pick your game modes. You can have more than one.
                  <span className="text-primary ml-1">{gameModes.length} selected</span>
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GAME_MODES.map((m) => (
                  <MultiSelectCard
                    key={m.id}
                    selected={gameModes.includes(m.id)}
                    onClick={() => toggleMode(m.id)}
                    emoji={m.emoji}
                    label={m.label}
                    desc={m.desc}
                    testId={`mode-${m.id}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: SPECIAL FEATURE */}
          {STEPS[step].id === "special" && (
            <div className="space-y-5" data-testid="step-special">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-foreground">Your Secret Weapon</h2>
                <p className="text-sm text-muted-foreground">Pick one special feature that makes YOUR game different from everyone else's</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SPECIAL_FEATURES.map((f) => (
                  <SelectionCard
                    key={f.id}
                    selected={specialFeature === f.id}
                    onClick={() => setSpecialFeature(f.id)}
                    emoji={f.emoji}
                    label={f.label}
                    desc={f.desc}
                    testId={`special-${f.id}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 8: TEAM SIZE */}
          {STEPS[step].id === "team" && (
            <div className="space-y-5" data-testid="step-team">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold text-foreground">How Many Players?</h2>
                <p className="text-sm text-muted-foreground">How big do you want each match to be?</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                {TEAM_SIZES.map((t) => (
                  <SelectionCard
                    key={t.id}
                    selected={teamSize === t.id}
                    onClick={() => setTeamSize(t.id)}
                    emoji={t.emoji}
                    label={t.label}
                    desc={t.desc}
                    testId={`team-${t.id}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 9: REVIEW */}
          {STEPS[step].id === "review" && (
            <div className="space-y-5" data-testid="step-review">
              <div className="text-center space-y-2">
                <div className="text-4xl">🏆</div>
                <h2 className="text-xl font-bold text-foreground">Your Game Design</h2>
                <p className="text-sm text-muted-foreground">Here's everything you've designed. Ready to build?</p>
              </div>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Game name header */}
                <div className="bg-primary/10 border-b border-border px-5 py-4 text-center">
                  <h3 className="text-lg font-bold text-primary glow-text-cyan">{gameName}</h3>
                  {tagline && <p className="text-xs text-muted-foreground mt-1 italic">"{tagline}"</p>}
                  <p className="text-xs text-muted-foreground mt-2">Designed by {designerNames}</p>
                </div>
                {/* Details */}
                <div className="p-5 space-y-4">
                  <ReviewRow label="World" value={getLookup(THEMES, theme)?.label || theme} emoji={getLookup(THEMES, theme)?.emoji} />
                  <ReviewRow label="Style" value={getLookup(STYLES, gameStyle)?.label || gameStyle} emoji={getLookup(STYLES, gameStyle)?.emoji} />
                  <ReviewRow label="Team Size" value={getLookup(TEAM_SIZES, teamSize)?.label || teamSize} emoji={getLookup(TEAM_SIZES, teamSize)?.emoji} />

                  <div className="border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2">Weapons ({weapons.length})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {weapons.map((w) => {
                        const weapon = WEAPONS.find((x) => x.id === w);
                        return weapon ? (
                          <Badge key={w} variant="secondary" className="text-xs gap-1">
                            {weapon.icon} {weapon.label}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2">Maps ({mapThemes.length})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {mapThemes.map((m) => {
                        const map = MAP_THEMES.find((x) => x.id === m);
                        return map ? (
                          <Badge key={m} variant="secondary" className="text-xs gap-1">
                            {map.emoji} {map.label}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2">Game Modes ({gameModes.length})</p>
                    <div className="flex flex-wrap gap-1.5">
                      {gameModes.map((m) => {
                        const mode = GAME_MODES.find((x) => x.id === m);
                        return mode ? (
                          <Badge key={m} variant="secondary" className="text-xs gap-1">
                            {mode.emoji} {mode.label}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <div className="border-t border-border pt-3">
                    <ReviewRow label="Special Feature" value={getLookup(SPECIAL_FEATURES, specialFeature)?.label || specialFeature} emoji={getLookup(SPECIAL_FEATURES, specialFeature)?.emoji} />
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer Nav */}
      <footer className="border-t border-border/50 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={step === 0}
            className="text-muted-foreground"
            data-testid="button-back"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Button>

          {STEPS[step].id === "review" ? (
            <Button
              onClick={handleSubmit}
              className="bg-primary text-primary-foreground font-semibold px-6 glow-cyan"
              data-testid="button-submit"
            >
              <Rocket className="w-4 h-4 mr-2" /> Go Build It
            </Button>
          ) : (
            <Button
              onClick={goNext}
              disabled={!canAdvance()}
              className="bg-primary text-primary-foreground font-semibold px-6"
              data-testid="button-next"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}

function ReviewRow({ label, value, emoji }: { label: string; value?: string; emoji?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</span>
      <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
        {emoji && <span>{emoji}</span>}
        {value}
      </span>
    </div>
  );
}
