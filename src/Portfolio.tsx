import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type CSSProperties,
} from "react";
import {
  Rocket,
  Gamepad2,
  Play,
  Video,
  Mail,
  Phone,
  Github,
  Linkedin,
  ChevronDown,
  ExternalLink,
  Copy,
  Check,
  Dices,
  CircleDollarSign,
  Radio,
  Sparkles,
  X,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { CONSOLE_IMG } from "./assets.js";
import "./Portfolio.css";

/* ---------------------------------------------------------
   NOTE FOR NANDAN:
   Every project below points at this same placeholder link.
   Swap DUMMY_LINK for your real demo/video links once you
   have them — since every card reuses this one constant,
   updating it here updates every "Play demo" / "Watch video"
   button in one go. Give individual projects their own link
   by overriding demoUrl / videoUrl on that project entry.
--------------------------------------------------------- */
const DUMMY_LINK = "https://example.com/your-game-link";

/* ---------------------------------------------------------
   NOTE FOR NANDAN:
   Replace every DEMO_URL / VIDEO_URL below with your real
   playable-demo link and your real video-demo link.
   They are clearly marked with "your-" so they're easy to find.
   BG_VIDEO_URL is the looping crash-game background video —
   swap it for your own clip any time.
--------------------------------------------------------- */

const BG_VIDEO_URL =
  "https://cdn.shopify.com/videos/c/o/v/d718f9a3df91490bbdd2d738e65fb57c.mp4";

interface Project {
  id: string;
  name: string;
  tag: string;
  accent: string;
  icon: LucideIcon;
  thumb?: string;
  desc: string;
  stack: string[];
  demoUrl: string;
  videoUrl: string;
}

interface ExperienceEntry {
  company: string;
  role: string;
  place: string;
  time: string;
  bullets: string[];
}

const PROJECTS: Project[] = [
  {
    id: "gems",
    name: "Fortune Gems 2",
    tag: "Slot",
    accent: "#F5B843",
    icon: Sparkles,
    thumb: "/games/fortune-gems-2.jpg",
    desc: "3x3 reel slot with Wild symbols and a weighted Bonus Wheel — GSAP-eased spin, bounce-corrected snap, dynamic multiplier popups.",
    stack: ["PixiJS", "TypeScript", "GSAP", "Howler", "REST API"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "mines",
    name: "Mines",
    tag: "Crash",
    accent: "#33E1FF",
    icon: CircleDollarSign,
    thumb: "/games/mines.jpg",
    desc: "Configurable mines-count grid with live cash-out, real-time payout ticking, and full bet-history tracking over sockets.",
    stack: ["PixiJS", "React", "Socket.IO", "MVC", "GSAP"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "aviator",
    name: "Aviator & Jetx",
    tag: "Crash",
    accent: "#FF4D7D",
    icon: Rocket,
    thumb: "/games/aviator.jpg",
    desc: "Multiplier crash game — three-phase round cycle (Idle / Running / Crashed), live socket sync, flight & particle FX. Ships alongside a JetX-style rocket variant on the same engine.",
    stack: ["PixiJS", "React", "Socket.IO", "GSAP", "Howler"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "crash-royale",
    name: "Crash Royale",
    tag: "Crash",
    accent: "#FF8A3D",
    icon: Rocket,
    thumb: "/games/crash-royale.jpg",
    desc: "Multiplayer crash variant with a shared live curve, dual bet slots per player, auto cash-out, and a scrolling all-bets ledger.",
    stack: ["React", "TypeScript", "Socket.IO", "Canvas"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "jetx",
    name: "JetX",
    tag: "Crash",
    accent: "#FF3D71",
    icon: Rocket,
    thumb: "/games/jetx.jpg",
    desc: "Rocket-flight crash game with dual bet panels, auto-bet/auto-collect, and a live stakes feed for every player at the table.",
    stack: ["PixiJS", "React", "Socket.IO", "GSAP"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "chicken-road-2",
    name: "Chicken Road 2",
    tag: "Crash",
    accent: "#F5B843",
    icon: Rocket,
    thumb: "/games/chicken-road-2.jpg",
    desc: "Lane-by-lane crossing game with per-difficulty multiplier curves, live wins ticker, and configurable risk levels.",
    stack: ["PixiJS", "React", "Socket.IO"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "plinko",
    name: "Plinko",
    tag: "Physics",
    accent: "#8B5CF6",
    icon: Dices,
    thumb: "/games/plinko.jpg",
    desc: "Physics-based Plinko game with realistic collisions, smooth ball animations, particle effects, glowing trails, and x0–x12 multiplier buckets.",
    stack: ["PixiJS", "React Hooks", "JavaScript"],
    demoUrl: "https://plinko-demo-three.vercel.app/",
    videoUrl: DUMMY_LINK,
  },
  {
    id: "lines",
    name: "Lines",
    tag: "Physics",
    accent: "#33E6A8",
    icon: Dices,
    thumb: "/games/lines.jpg",
    desc: "Risk slider mini-game — three independently seeded bars with live win/lose zones and a combined multiplier readout.",
    stack: ["React", "TypeScript", "Canvas"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "mini-roulette",
    name: "Mini Roulette",
    tag: "Table",
    accent: "#33E1FF",
    icon: CircleDollarSign,
    thumb: "/games/mini-roulette.jpg",
    desc: "12-pocket roulette table with a chip tray, quick even/odd/half bets, and a paytable-driven single-zero wheel.",
    stack: ["React", "PixiJS", "REST API"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "double-wheel",
    name: "Double Wheel",
    tag: "Table",
    accent: "#F5B843",
    icon: Dices,
    thumb: "/games/double-wheel.jpg",
    desc: "Dual synchronized prize wheels with shared multiplier segments, Wild pockets, and a live top-wins/history panel.",
    stack: ["React", "TypeScript", "GSAP", "Socket.IO"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "color-game",
    name: "Color Game",
    tag: "Table",
    accent: "#FF4D7D",
    icon: Layers,
    thumb: "/games/color-game.jpg",
    desc: "Dice-in-a-box color betting game with animated payout tiers and a live bet-and-race feed of every round.",
    stack: ["React", "GSAP", "Socket.IO"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "roulette-fusion",
    name: "Roulette Fusion",
    tag: "Live",
    accent: "#8B5CF6",
    icon: CircleDollarSign,
    thumb: "/games/roulette-fusion.jpg",
    desc: "Live-dealer roulette table UI over a video feed — full number grid, dozens/columns, chip stack, and player history.",
    stack: ["React", "WebRTC", "REST API"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "super-over-vr",
    name: "Super Over VR",
    tag: "Live",
    accent: "#33E6A8",
    icon: Layers,
    thumb: "/games/super-over-vr.jpg",
    desc: "Cricket-themed live betting table — card-driven runs/wickets outcomes, live payout table, and per-team odds panel.",
    stack: ["React", "TypeScript", "Socket.IO"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "dice-live",
    name: "Live Dice Table",
    tag: "Live",
    accent: "#FF8A3D",
    icon: Dices,
    thumb: "/games/dice-live.jpg",
    desc: "Live-dealer dice table with a full 1-36 number grid, quick-pick shape/color side bets, and a switchable layout.",
    stack: ["React", "WebRTC", "Socket.IO"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "double-roll",
    name: "Double Roll",
    tag: "Instant",
    accent: "#33E1FF",
    icon: CircleDollarSign,
    thumb: "/games/double-roll.jpg",
    desc: "Fast-paced number strip with color-tiered payouts (x2 / x14 / x2), a scrolling history rail, and live leaderboards.",
    stack: ["React", "TypeScript", "Canvas"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "heads-and-tails",
    name: "Heads & Tails",
    tag: "Instant",
    accent: "#F5B843",
    icon: Sparkles,
    thumb: "/games/heads-and-tails.jpg",
    desc: "Coin-flip instant game with a 3D flip animation, chip selector, and a running bet-history sidebar.",
    stack: ["React", "GSAP", "REST API"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
  {
    id: "suite",
    name: "Casino Game Suite",
    tag: "Multi-game",
    accent: "#33E6A8",
    icon: Layers,
    desc: "Shared MVC frontend powering 33+ real-money games — crash, card, dice, roulette, trade & virtual — one bet panel, many tables.",
    stack: ["React", "TypeScript", "Cocos Creator", "Socket.IO", "REST API"],
    demoUrl: DUMMY_LINK,
    videoUrl: DUMMY_LINK,
  },
];

const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "NKB Playtech",
    role: "Frontend Game Developer",
    place: "Bengaluru, India",
    time: "Jan 2025 — Present",
    bullets: [
      "Built & maintained 33+ browser-based real-money/casino games (crash, betting, card, dice, roulette, slot, trade, virtual, AI casino) using React.js, TypeScript, PixiJS, Cocos Creator & Three.js.",
      "Developed game admin panels for configuration, reporting & live monitoring with REST APIs.",
      "Shipped Fortune Gems 2 prize-wheel system with easing, loading states & responsive assets.",
      "Built the Bet History feature with fully integrated real-time backend data.",
      "Cleared all QA-flagged issues every sprint; drove cross-team UI/animation discussions.",
    ],
  },
  {
    company: "Aarrsol",
    role: "Application Developer",
    place: "Jaipur, India",
    time: "Jun 2024 — Dec 2024",
    bullets: [
      "Built reusable, responsive React.js browser-game UI components.",
      "Implemented bet placement, cancellation & cash-out workflows with live backend data.",
      "Built Bet Panel & game screens; integrated REST APIs and Socket.IO for real-time sync.",
    ],
  },
  {
    company: "ConsultIT",
    role: "Web Developer Intern",
    place: "Noida, India",
    time: "Feb 2024 — May 2024",
    bullets: [
      "Built a School Management Dashboard (attendance, records, transport tracking) in React.js.",
      "Built a Property Management Dashboard covering the full lease/rental lifecycle.",
      "Shipped frontend for FosterAI and a hospital/healthcare site; owned API integration solo.",
    ],
  },
];

const SKILLS: Record<string, string[]> = {
  Languages: ["JavaScript", "TypeScript"],
  Frameworks: [
    "React.js",
    "PixiJS",
    "Cocos2D",
    "Three.js",
    "GSAP",
    "Howler",
    "HTML",
    "CSS",
  ],
  Tools: ["Git", "GitHub", "GitLab", "Figma", "Postman", "JIRA", "Socket.IO"],
};

const FILTERS = [
  "All",
  "Slot",
  "Crash",
  "Physics",
  "Table",
  "Live",
  "Instant",
  "Multi-game",
] as const;
type Filter = (typeof FILTERS)[number];

function useMultiplierTicker() {
  const [value, setValue] = useState(1.0);
  const [crashed, setCrashed] = useState(false);
  const [crashId, setCrashId] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let start = performance.now();
    let crashPoint = 2 + Math.random() * 4;
    let alive = true;

    function tick(now: number) {
      if (!alive) return;
      const t = (now - start) / 1000;
      const v = 1 + t * t * 0.6;
      if (v >= crashPoint) {
        setValue(crashPoint);
        setCrashed(true);
        setCrashId((id) => id + 1);
        setTimeout(() => {
          if (!alive) return;
          start = performance.now();
          crashPoint = 2 + Math.random() * 4;
          setCrashed(false);
          setValue(1.0);
          rafRef.current = requestAnimationFrame(tick);
        }, 1300);
        return;
      }
      setValue(v);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      alive = false;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { value, crashed, crashId };
}

interface Particle {
  id: string;
  dx: number;
  dy: number;
  delay: number;
}

interface ExplosionProps {
  x: number;
  y: number;
  crashId: number;
  active: boolean;
}

/* Bomb-blast particle burst — regenerates every time crashId changes */
function Explosion({ x, y, crashId, active }: ExplosionProps) {
  const particles = useMemo<Particle[]>(() => {
    if (!active) return [];
    return Array.from({ length: 16 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 16 + Math.random() * 0.3;
      const dist = 26 + Math.random() * 30;
      return {
        id: `${crashId}-${i}`,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist,
        delay: Math.random() * 0.05,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crashId, active]);

  if (!active) return null;
  const wrapStyle = { "--bx": `${x}%`, "--by": `${y}%` } as CSSProperties;
  return (
    <div className="blast-wrap" style={wrapStyle}>
      <div className="blast-flash" />
      {particles.map((p) => {
        const particleStyle = {
          "--dx": `${p.dx}px`,
          "--dy": `${p.dy}px`,
          "--delay": `${p.delay}s`,
        } as CSSProperties;
        return (
          <span key={p.id} className="blast-particle" style={particleStyle} />
        );
      })}
    </div>
  );
}

function MultiplierHero() {
  const { value, crashed, crashId } = useMultiplierTicker();
  const norm = Math.min((value - 1) / 5, 1);
  const px = 10 + norm * 78;
  const py = 88 - norm * 66;
  const angle = -20 - norm * 45;

  const markerStyle = {
    "--px": `${px}%`,
    "--py": `${py}%`,
    "--rot": `${angle}deg`,
  } as CSSProperties;

  return (
    <div className={`hero-panel ${crashed ? "hero-panel--shake" : ""}`}>
      <video
        className="hero-bg-video"
        src={BG_VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
      />
      <svg
        viewBox="0 0 100 100"
        className="hero-curve"
        preserveAspectRatio="none"
      >
        <path
          d="M6,92 Q 50,92 94,10"
          fill="none"
          stroke="rgba(232,163,61,0.18)"
          strokeWidth="1.2"
        />
        <path
          className="progress-path"
          d={`M6,92 Q 50,92 ${px},${py}`}
          fill="none"
          stroke={crashed ? "#FF3D71" : "#2ED9A3"}
          strokeWidth="1.6"
        />
      </svg>

      {!crashed && (
        <div className="plane-marker" style={markerStyle}>
          <Rocket size={20} color="#2ED9A3" />
        </div>
      )}

      <Explosion x={px} y={py} crashId={crashId} active={crashed} />

      <div className={`hero-mult ${crashed ? "hero-mult--crashed" : ""}`}>
        {crashed ? "CRASHED" : `x${value.toFixed(2)}`}
      </div>
    </div>
  );
}

/* Ambient planes drifting in the page background, purely decorative */
function AmbientTraffic() {
  const rows = [18, 38, 62, 80];
  return (
    <div className="ambient-traffic" aria-hidden="true">
      {rows.map((top, i) => {
        const style = {
          "--top": `${top}%`,
          "--dur": `${18 + i * 6}s`,
          "--delay": `${i * 3.5}s`,
        } as CSSProperties;
        return (
          <Rocket
            key={i}
            size={16 + (i % 2) * 4}
            className="ambient-plane"
            style={style}
          />
        );
      })}
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="chip-btn"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          // clipboard access can be denied by the browser; fail silently
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

function VideoModal({ project, onClose }: VideoModalProps) {
  if (!project) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close video demo"
        >
          <X size={18} />
        </button>
        <div className="modal-screen">
          <Play size={40} />
          <p>Video demo placeholder</p>
          <span>
            Replace videoUrl for "{project.name}" with your real video link.
          </span>
        </div>
        <a
          className="btn-outline"
          href={project.videoUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open video link <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

interface ExperienceItemProps {
  item: ExperienceEntry;
  open: boolean;
  onToggle: () => void;
}

function ExperienceItem({ item, open, onToggle }: ExperienceItemProps) {
  return (
    <div className="exp-row">
      <button className="exp-head" onClick={onToggle}>
        <div>
          <div className="exp-company">{item.company}</div>
          <div className="exp-role">
            {item.role} · {item.place}
          </div>
        </div>
        <div className="exp-right">
          <span className="exp-time">{item.time}</span>
          <ChevronDown
            size={18}
            className={`exp-chevron ${open ? "exp-chevron--open" : ""}`}
          />
        </div>
      </button>
      {open && (
        <ul className="exp-list">
          {item.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface ProjectCardProps {
  p: Project;
  onWatch: (p: Project) => void;
}

function ProjectCard({ p, onWatch }: ProjectCardProps) {
  const Icon = p.icon;
  const cardStyle = { "--accent": p.accent } as CSSProperties;
  return (
    <div
      className={`proj-card ${p.thumb ? "proj-card--thumb" : ""}`}
      style={cardStyle}
    >
      {p.thumb && (
        <img className="proj-thumb" src={p.thumb} alt={`${p.name} preview`} />
      )}
      <div className="proj-top">
        <div className="proj-icon">
          <Icon size={20} />
        </div>
        <span className="proj-tag">{p.tag}</span>
      </div>
      <h3 className="proj-name">{p.name}</h3>
      <p className="proj-desc">{p.desc}</p>
      <div className="proj-stack">
        {p.stack.map((s) => (
          <span key={s} className="stack-chip">
            {s}
          </span>
        ))}
      </div>
      <div className="proj-actions">
        <a
          className="btn-solid"
          href={p.demoUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Play size={14} /> Play demo
        </a>
        <button className="btn-outline" onClick={() => onWatch(p)}>
          <Video size={14} /> Watch video
        </button>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [openExp, setOpenExp] = useState(0);
  const [filter, setFilter] = useState<Filter>("All");
  const [watching, setWatching] = useState<Project | null>(null);

  const projects = useMemo(
    () =>
      filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter),
    [filter],
  );

  return (
    <div className="page">
      <AmbientTraffic />

      <nav className="nav">
        <div className="nav-brand">
          <div className="nav-logo mono">NC</div>
          <div className="nav-name">
            Nandan Choudhary
            <span className="nav-role">Frontend Game Developer</span>
          </div>
        </div>
        <div className="nav-links">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href="#contact">
          Hire me
        </a>
      </nav>

      <div className="hero">
        <div>
          <div className="eyebrow">
            <Radio size={13} /> LIVE · FRONTEND GAME DEVELOPER
          </div>
          <h1>
            Nandan Choudhary builds
            <br />
            <span>real-money game frontends</span> that don't lag.
          </h1>
          <p className="lede">
            Crash, slot, dice, roulette & trade games shipped for web and mobile
            — React.js, TypeScript, PixiJS, Cocos Creator & Three.js, wired to
            real-time sockets and REST APIs.
          </p>
          <div className="hero-cta">
            <a className="btn-solid" href="#projects">
              <Gamepad2 size={16} /> View projects
            </a>
            <a className="btn-outline" href="#contact">
              <Mail size={16} /> Get in touch
            </a>
          </div>
        </div>
        <MultiplierHero />
      </div>

      <div className="stats-strip">
        <div className="stat">
          <b>33+</b>
          <span>Games shipped</span>
        </div>
        <div className="stat">
          <b>3</b>
          <span>Companies</span>
        </div>
        <div className="stat">
          <b>5</b>
          <span>Game engines/libs</span>
        </div>
        <div className="stat">
          <b>2</b>
          <span>Years experience</span>
        </div>
      </div>

      <section id="experience">
        <div className="section-head">
          <h2>Round history</h2>
          <span>— work experience</span>
        </div>
        {EXPERIENCE.map((item, i) => (
          <ExperienceItem
            key={item.company}
            item={item}
            open={openExp === i}
            onToggle={() => setOpenExp(openExp === i ? -1 : i)}
          />
        ))}
      </section>

      <section id="projects">
        <div className="section-head">
          <h2>Games on the table</h2>
          <span>— selected projects</span>
        </div>
        <div className="filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="proj-grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} onWatch={setWatching} />
          ))}
        </div>
      </section>

      <section>
        <div className="console-banner">
          <img src={CONSOLE_IMG} alt="Console-style game development" />
          <div className="console-banner-copy">
            <h3>Comfortable outside the browser tab too</h3>
            <p>
              Same MVC discipline and animation instincts carry over to
              controller-driven, console-style experiences — not just browser
              real-money games.
            </p>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="section-head">
          <h2>Chips on hand</h2>
          <span>— skills</span>
        </div>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div className="skill-card" key={cat}>
              <h4>{cat}</h4>
              <div className="skill-chips">
                {items.map((s) => (
                  <span className="skill-chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact">
        <div className="section-head">
          <h2>Cash out</h2>
          <span>— contact</span>
        </div>
        <div className="contact-card">
          <div>
            <div className="contact-title">Let's build your next game.</div>
            <div className="contact-subtitle">
              nandanchoudhary@gmail.com · +91 8802361721
            </div>
          </div>
          <div className="contact-links">
            <CopyButton text="nandanchoudhary@gmail.com" />
            <a className="chip-btn" href="tel:+918802361721">
              <Phone size={14} /> Call
            </a>
            <a
              className="chip-btn"
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={14} /> LinkedIn
            </a>
            <a
              className="chip-btn"
              href="https://github.com/your-github"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={14} /> GitHub
            </a>
          </div>
        </div>
      </section>

      <footer>
        © {new Date().getFullYear()} Nandan Choudhary — built with React & a
        little bit of luck.
      </footer>

      <VideoModal project={watching} onClose={() => setWatching(null)} />
    </div>
  );
}
