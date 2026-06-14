import { useMemo, useState } from "react";
import {
  BadgeCheck,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  ClipboardCheck,
  Code2,
  Compass,
  ExternalLink,
  FileText,
  Flame,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  Medal,
  Moon,
  Rocket,
  Search,
  Sparkles,
  Sun,
  Trophy,
  RefreshCcw,
} from "lucide-react";
import { curriculum, studentProfile, STORAGE_KEY } from "./data";
import type { CurriculumWeek, ProgressState } from "./types";

import roadmapHero from "./assets/roadmap_hero.png";
import weeksHero from "./assets/weeks_hero.png";
import projectsHero from "./assets/projects_hero.png";
import resourcesHero from "./assets/resources_hero.png";

type View = "Home" | "Roadmap" | "Weeks" | "Projects" | "Resources" | "Progress";

const navItems: { label: View; icon: typeof LayoutDashboard }[] = [
  { label: "Home", icon: LayoutDashboard },
  { label: "Roadmap", icon: Compass },
  { label: "Weeks", icon: BookOpen },
  { label: "Projects", icon: Rocket },
  { label: "Resources", icon: FileText },
  { label: "Progress", icon: Trophy },
];

const defaultProgress: ProgressState = {
  learnedConcepts: [],
  solvedProblems: [],
  completedHomework: [],
  completedProjects: [],
};

const badgeTiers = [
  { name: "Bronze", min: 0, color: "bg-amber-700" },
  { name: "Silver", min: 180, color: "bg-slate-500" },
  { name: "Gold", min: 360, color: "bg-yellow-500" },
  { name: "Platinum", min: 560, color: "bg-sky" },
  { name: "Diamond", min: 780, color: "bg-coral" },
];

function loadProgress(): ProgressState {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return defaultProgress;
    }

    return { ...defaultProgress, ...JSON.parse(saved) };
  } catch {
    return defaultProgress;
  }
}

function saveProgress(progress: ProgressState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getXp(progress: ProgressState) {
  return (
    progress.solvedProblems.length * 10 +
    progress.completedHomework.length * 20 +
    progress.completedProjects.length * 50
  );
}

function getBadge(xp: number) {
  return [...badgeTiers].reverse().find((tier) => xp >= tier.min) ?? badgeTiers[0];
}

function App() {
  const [activeView, setActiveView] = useState<View>("Home");
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());

  const xp = getXp(progress);
  const badge = getBadge(xp);
  const selected = curriculum.find((week) => week.week === selectedWeek) ?? curriculum[0];

  const totals = useMemo(() => {
    const conceptCount = curriculum.reduce((sum, week) => sum + week.concepts.length, 0);
    const problemCount = curriculum.reduce((sum, week) => sum + week.problems.length, 0);

    return {
      conceptCount,
      problemCount,
      homeworkCount: curriculum.length,
      projectCount: curriculum.length,
    };
  }, []);

  const updateProgress = (next: ProgressState) => {
    setProgress(next);
    saveProgress(next);
  };

  const handleToggle = (field: keyof ProgressState, id: string) => {
    updateProgress({
      ...progress,
      [field]: toggleValue(progress[field], id),
    });
  };

  const practiceStreak = Math.min(
    12,
    new Set([
      ...progress.learnedConcepts.map((id) => id.split("-concept-")[0]),
      ...progress.solvedProblems.map((id) => id.slice(0, 2)),
      ...progress.completedHomework.map((id) => id.replace("homework-week-", "w")),
      ...progress.completedProjects.map((_id, index) => `p${index}`),
    ]).size,
  );

  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  const handleImport = (code: string) => {
    try {
      const imported = JSON.parse(atob(code));
      updateProgress(imported);
      alert("Progress synced successfully!");
      setIsSyncModalOpen(false);
    } catch {
      alert("Invalid sync code. Please check and try again.");
    }
  };

  const syncCode = btoa(JSON.stringify(progress));

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    window.localStorage.setItem("theme", next);
  };

  return (
    <div className={cx(theme, "min-h-screen")}>
      <div className="app-shell page-grid min-h-screen text-ink dark:text-paper transition-colors duration-500">
        <header className="sticky top-0 z-20 border-b border-white/60 dark:border-white/10 bg-chalk/85 dark:bg-ink/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink text-saffron shadow-glow">
                  <GraduationCap aria-hidden="true" size={26} />
                </div>
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-wide text-leaf">
                    Let's Convert Passion to Implementation
                  </p>
                  <h1 className="text-2xl font-extrabold sm:text-3xl text-balance">
                    Saisha's Python, Web & Mobile Product Builder
                  </h1>
                  <p className="mt-1 text-xs font-bold text-ink/55">
                    Progress auto-saves on this browser after every check.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:min-w-[560px]">
                  <Metric icon={Sparkles} label="XP" value={String(xp)} />
                  <Metric icon={Search} label="Problems" value={`${progress.solvedProblems.length}/${totals.problemCount}`} />
                  <Metric icon={Rocket} label="Projects" value={`${progress.completedProjects.length}/12`} />
                  <Metric icon={Medal} label="Badge" value={badge.name} />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSyncModalOpen(true)}
                    className="group relative flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-ink px-4 text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-ink/90 ring-2 ring-saffron/30 sm:flex-none"
                  >
                    <RefreshCcw className="group-hover:rotate-180 transition-transform duration-500 text-saffron" size={16} />
                    <span className="text-sm font-extrabold uppercase tracking-wide">Tutor Hub</span>
                  </button>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/80 dark:bg-ink/60 text-ink dark:text-saffron shadow-sm ring-1 ring-ink/10 dark:ring-white/10 transition hover:-translate-y-0.5 hover:shadow-soft"
                    aria-label="Toggle dark mode"
                  >
                    {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
                  </button>
                </div>
              </div>
            </div>

            <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="Main navigation">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActiveView(item.label)}
                    className={cx(
                      "flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-4 text-sm font-bold transition hover:-translate-y-0.5",
                      activeView === item.label
                        ? "bg-ink dark:bg-saffron text-white dark:text-ink shadow-lift ring-2 ring-saffron"
                        : "bg-white/40 dark:bg-paper/10 text-ink dark:text-paper shadow-sm ring-1 ring-ink/5 dark:ring-white/10 hover:bg-white/80 dark:hover:bg-paper/20 hover:shadow-soft",
                    )}
                  >
                    <Icon aria-hidden="true" size={18} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {activeView === "Home" && (
            <HomeView
              badge={badge}
              progress={progress}
              selected={selected}
              setActiveView={setActiveView}
              totals={totals}
              xp={xp}
            />
          )}
          {activeView === "Roadmap" && (
            <RoadmapView progress={progress} setActiveView={setActiveView} setSelectedWeek={setSelectedWeek} />
          )}
          {activeView === "Weeks" && (
            <WeeksView
              handleToggle={handleToggle}
              progress={progress}
              selected={selected}
              selectedWeek={selectedWeek}
              setSelectedWeek={setSelectedWeek}
            />
          )}
          {activeView === "Projects" && <ProjectsView handleToggle={handleToggle} progress={progress} />}
          {activeView === "Resources" && <ResourcesView />}
          {activeView === "Progress" && (
            <ProgressView badge={badge} progress={progress} totals={totals} xp={xp} />
          )}
        </main>

        {isSyncModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/65 backdrop-blur-md">
            <div className="surface w-full max-w-lg rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-saffron via-coral to-leaf" />
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-extrabold flex items-center gap-2">
                  <RefreshCcw className="text-coral" size={24} />
                  Sync Progress
                </h3>
                <button
                  onClick={() => setIsSyncModalOpen(false)}
                  className="h-8 w-8 flex items-center justify-center rounded-full bg-ink/5 hover:bg-ink/10 transition text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-wide text-ink/60 mb-2 font-jakarta">Student: Share with Tutor</p>
                  <div className="bg-white/80 p-3 rounded-lg border border-ink/10 font-mono text-[10px] break-all leading-tight mb-2">
                    {syncCode}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(syncCode);
                      alert("Sync code copied to clipboard!");
                    }}
                    className="w-full py-2 bg-ink text-white rounded-lg font-bold text-sm hover:shadow-lift transition"
                  >
                    Copy Sync Code
                  </button>
                </div>

                <div className="h-px bg-ink/10" />

                <div>
                  <p className="text-sm font-extrabold uppercase tracking-wide text-ink/60 mb-2 font-jakarta">Tutor: Load Student Data</p>
                  <textarea
                    placeholder="Paste sync code here..."
                    className="w-full h-24 bg-white/80 p-3 rounded-lg border border-ink/10 text-[10px] font-mono resize-none focus:ring-2 focus:ring-coral/50 outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleImport((e.target as HTMLTextAreaElement).value);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const el = document.querySelector('textarea') as HTMLTextAreaElement;
                      handleImport(el.value);
                    }}
                    className="w-full mt-2 py-2 bg-coral text-white rounded-lg font-bold text-sm hover:shadow-lift transition"
                  >
                    Load Student Progress
                  </button>
                </div>
              </div>

              <p className="mt-6 text-xs font-bold text-ink/40 text-center italic">
                Sharing this code lets your tutor see exactly what you've marked as done.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function makeArt(theme: "roadmap" | "weeks" | "projects" | "resources") {
  const palette = {
    roadmap: ["#10221b", "#227153", "#f4b940", "#fbf7ed"],
    weeks: ["#13242f", "#2f7fb4", "#7c67c7", "#fbf7ed"],
    projects: ["#10221b", "#df563e", "#f4b940", "#fbf7ed"],
    resources: ["#11211d", "#2f7fb4", "#227153", "#fbf7ed"],
  }[theme];

  const shapes = {
    roadmap: `
        <circle cx="74" cy="48" r="26" fill="rgba(255,255,255,0.18)" />
        <rect x="132" y="30" width="88" height="88" rx="18" fill="rgba(255,255,255,0.12)" />
        <rect x="42" y="112" width="180" height="10" rx="5" fill="rgba(255,255,255,0.18)" />
        <path d="M44 144C78 104 118 88 168 76C194 70 214 62 228 50" stroke="rgba(244,185,64,0.85)" stroke-width="8" fill="none" stroke-linecap="round" />
        `,
    weeks: `
        <rect x="40" y="34" width="64" height="96" rx="18" fill="rgba(255,255,255,0.16)" />
        <rect x="118" y="26" width="72" height="112" rx="22" fill="rgba(255,255,255,0.14)" />
        <rect x="204" y="54" width="26" height="68" rx="13" fill="rgba(255,255,255,0.2)" />
        <circle cx="94" cy="164" r="26" fill="rgba(244,185,64,0.3)" />
        <path d="M54 158H216" stroke="rgba(255,255,255,0.18)" stroke-width="8" stroke-linecap="round" />
        `,
    projects: `
        <rect x="34" y="42" width="202" height="102" rx="22" fill="rgba(255,255,255,0.13)" />
        <path d="M58 126L98 84L126 108L164 68L214 118" stroke="rgba(244,185,64,0.9)" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="98" cy="84" r="8" fill="rgba(255,255,255,0.8)" />
        <circle cx="164" cy="68" r="8" fill="rgba(255,255,255,0.8)" />
        `,
    resources: `
        <rect x="38" y="36" width="68" height="118" rx="14" fill="rgba(255,255,255,0.16)" />
        <rect x="118" y="26" width="68" height="128" rx="14" fill="rgba(255,255,255,0.12)" />
        <rect x="198" y="48" width="32" height="106" rx="12" fill="rgba(255,255,255,0.18)" />
        <path d="M54 62H90M54 86H90M54 110H90M134 48H170M134 72H170M134 96H170" stroke="rgba(244,185,64,0.86)" stroke-width="6" stroke-linecap="round" />
        `,
  }[theme];

  const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" fill="none">
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="280" y2="180">
              <stop offset="0%" stop-color="${palette[0]}" />
              <stop offset="46%" stop-color="${palette[1]}" />
              <stop offset="100%" stop-color="${palette[2]}" />
            </linearGradient>
          </defs>
          <rect width="280" height="180" rx="28" fill="url(#bg)" />
          <circle cx="48" cy="38" r="18" fill="rgba(255,255,255,0.12)" />
          <circle cx="236" cy="40" r="26" fill="rgba(255,255,255,0.08)" />
          <circle cx="214" cy="146" r="36" fill="rgba(255,255,255,0.08)" />
          ${shapes}
        </svg>
        `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function Metric({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="shine-card rounded-lg bg-white/85 dark:bg-ink/65 px-3 py-2 shadow-sm ring-1 ring-ink/10 dark:ring-white/10 transition-colors">
      <div className="relative flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-ink/55 dark:text-paper/60">
        <Icon aria-hidden="true" className="text-coral" size={14} />
        {label}
      </div>
      <p className="relative mt-1 text-xl font-extrabold text-ink dark:text-paper">{value}</p>
    </div>
  );
}

function HomeView({
  badge,
  progress,
  selected,
  setActiveView,
  totals,
  xp,
}: {
  badge: { name: string; color: string };
  progress: ProgressState;
  selected: CurriculumWeek;
  setActiveView: (view: View) => void;
  totals: {
    conceptCount: number;
    problemCount: number;
    homeworkCount: number;
    projectCount: number;
  };
  xp: number;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
      <section className="hero-panel overflow-hidden rounded-lg text-white shadow-lift">
        <div className="grid gap-7 p-6 lg:grid-cols-[1fr_300px] lg:p-8">
          <div className="relative">
            <div className="mb-7 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-extrabold text-white ring-1 ring-white/15">
              <Sparkles aria-hidden="true" size={16} />
              Week {studentProfile.currentWeek} starts here
            </div>
            <h2 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
              Hi Saisha, today we turn Python basics into product thinking.
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/78">
              This dashboard follows your tutor's path: understand the concept, see why it
              exists, solve it in more than one way, then build a small real-world project.
            </p>
            <div className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
              <HeroStep icon={Brain} label="Understand" />
              <HeroStep icon={Code2} label="Solve better" />
              <HeroStep icon={Rocket} label="Build product" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setActiveView("Weeks")}
                className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-saffron px-5 text-sm font-extrabold text-ink shadow-glow transition hover:-translate-y-0.5 hover:bg-white"
              >
                <BookOpen aria-hidden="true" size={18} />
                Open this week
              </button>
              <button
                type="button"
                onClick={() => setActiveView("Roadmap")}
                className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-white/10 px-5 text-sm font-extrabold text-white ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white/18"
              >
                <Compass aria-hidden="true" size={18} />
                View roadmap
              </button>
            </div>
          </div>
          <div className="rounded-lg bg-white/10 p-5 text-white ring-1 ring-white/15 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white/70">Current badge</span>
              <span className={cx("h-3 w-3 rounded-full shadow-glow", badge.color)} />
            </div>
            <p className="mt-4 text-4xl font-extrabold">{badge.name}</p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {xp} XP earned by completing problems, homework, and projects.
            </p>
            <div className="mt-6 space-y-3">
              <ProgressLine label="Concepts" value={progress.learnedConcepts.length} total={totals.conceptCount} />
              <ProgressLine label="Problems" value={progress.solvedProblems.length} total={totals.problemCount} />
              <ProgressLine label="Projects" value={progress.completedProjects.length} total={totals.projectCount} />
            </div>
          </div>
        </div>
      </section>

      <aside className="surface rounded-lg p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-saffron text-ink shadow-sm">
            <Gauge aria-hidden="true" size={22} />
          </div>
          <div>
            <p className="font-extrabold">This week</p>
            <p className="text-sm text-ink/60 dark:text-paper/60">{selected.level}</p>
          </div>
        </div>
        <h3 className="mt-5 text-2xl font-extrabold">{selected.title}</h3>
        <p className="mt-3 leading-7 text-ink/70 dark:text-paper/70 font-medium">{selected.focus}</p>
        <div className="mt-5 rounded-lg bg-mint dark:bg-leaf/10 p-4 ring-1 ring-leaf/10 transition-colors">
          <p className="text-sm font-extrabold text-leaf">Mini project</p>
          <p className="mt-1 font-bold">{selected.project.title}</p>
          <p className="mt-2 text-sm leading-6 text-ink/65 dark:text-paper/60">{selected.project.brief}</p>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/70 dark:bg-ink/40 px-3 py-3 text-sm font-bold text-leaf ring-1 ring-leaf/10 transition-colors">
          <BadgeCheck aria-hidden="true" size={18} />
          Saved after refresh on this browser
        </div>
      </aside>
    </div>
  );
}

function HeroStep({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-3 text-sm font-extrabold text-white ring-1 ring-white/15">
      <Icon aria-hidden="true" size={18} />
      {label}
    </div>
  );
}

function RoadmapView({
  progress,
  setActiveView,
  setSelectedWeek,
}: {
  progress: ProgressState;
  setActiveView: (view: View) => void;
  setSelectedWeek: (week: number) => void;
}) {
  return (
    <section>
      <SectionHero
        art={roadmapHero}
        badge="Your roadmap"
        title="From Python logic to Web & Mobile products"
        description="Master the fundamentals in Python, then bridge that logic into building live browser apps and smartphone interfaces."
        accent="Week-by-week product building, step by step."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {curriculum.map((week) => {
          const projectDone = progress.completedProjects.includes(week.project.id);
          const solvedCount = week.problems.filter((problem) =>
            progress.solvedProblems.includes(problem.id),
          ).length;

          return (
            <button
              key={week.week}
              type="button"
              onClick={() => {
                setSelectedWeek(week.week);
                setActiveView("Weeks");
              }}
              className="shine-card surface rounded-lg p-5 text-left transition hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative flex items-center justify-between gap-3">
                <span className="rounded-md bg-leaf/10 dark:bg-leaf/20 px-3 py-1 text-sm font-extrabold text-leaf dark:text-leaf-dark">
                  Week {week.week}
                </span>
                {projectDone ? (
                  <CheckCircle2 className="text-leaf" aria-label="Project complete" size={20} />
                ) : (
                  <Circle className="text-ink/25 dark:text-paper/25" aria-label="Project pending" size={20} />
                )}
              </div>
              <h3 className="relative mt-4 text-xl font-extrabold">{week.title}</h3>
              <p className="relative mt-2 text-sm font-bold text-coral">{week.month} · {week.level}</p>
              <p className="mt-3 min-h-12 text-sm leading-6 text-ink/65 dark:text-paper/60">{week.focus}</p>
              <div className="relative mt-4 flex items-center justify-between text-sm font-bold text-ink/65 dark:text-paper/60">
                <span>{solvedCount}/{week.problems.length} problems</span>
                <span>{projectDone ? "Project done" : "Project pending"}</span>
              </div>
              <div className="relative mt-3 h-2 rounded-full bg-ink/10 dark:bg-white/10">
                <div
                  className="h-2 rounded-full bg-coral"
                  style={{ width: `${Math.round((solvedCount / week.problems.length) * 100)}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function WeeksView({
  handleToggle,
  progress,
  selected,
  selectedWeek,
  setSelectedWeek,
}: {
  handleToggle: (field: keyof ProgressState, id: string) => void;
  progress: ProgressState;
  selected: CurriculumWeek;
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="surface rounded-lg p-4">
          <p className="mb-3 text-sm font-extrabold uppercase tracking-wide text-ink/60 dark:text-paper/60">Choose week</p>
          <div className="grid grid-cols-3 gap-2 lg:grid-cols-2">
            {curriculum.map((week) => (
              <button
                key={week.week}
                type="button"
                onClick={() => setSelectedWeek(week.week)}
                className={cx(
                  "min-h-11 rounded-lg text-sm font-extrabold transition hover:-translate-y-0.5",
                  selectedWeek === week.week
                    ? "bg-ink dark:bg-saffron text-white dark:text-ink shadow-soft"
                    : "bg-white/80 dark:bg-paper/10 text-ink dark:text-paper ring-1 ring-ink/10 dark:ring-white/10 hover:bg-saffron/25 dark:hover:bg-saffron/40",
                )}
              >
                W{week.week}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <section className="space-y-5">
        <div className="surface overflow-hidden rounded-lg p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-wide text-coral">
                {selected.month} · {selected.level}
              </p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Week {selected.week}: {selected.title}</h2>
              <p className="mt-3 max-w-3xl text-[15px] font-medium leading-7 text-ink/70 dark:text-paper/70">{selected.focus}</p>
            </div>
            <div className="flex gap-2">
              <WeekButton
                ariaLabel="Previous week"
                disabled={selectedWeek === 1}
                icon={ChevronLeft}
                onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
              />
              <WeekButton
                ariaLabel="Next week"
                disabled={selectedWeek === curriculum.length}
                icon={ChevronRight}
                onClick={() => setSelectedWeek(Math.min(curriculum.length, selectedWeek + 1))}
              />
            </div>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_260px]">
            <div className="rounded-lg bg-mint dark:bg-leaf/10 p-4 ring-1 ring-leaf/10 transition-colors">
              <p className="text-sm font-extrabold text-leaf">Visual teaching board</p>
              <p className="mt-2 text-sm leading-7 text-ink/70 dark:text-paper/70">
                Use this week like a whiteboard session: trace the concept, explain the why, then
                move to the mini project.
              </p>
            </div>
            <img
              alt={`Illustration for week ${selected.week}`}
              src={weeksHero}
              className="h-full w-full rounded-lg object-cover shadow-soft ring-1 ring-white/20"
            />
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <LearningCard icon={Brain} title="Concepts">
            <CheckList
              items={selected.concepts.map((concept, index) => ({
                id: `w${selected.week}-concept-${index}`,
                label: concept,
              }))}
              selected={progress.learnedConcepts}
              onToggle={(id) => handleToggle("learnedConcepts", id)}
            />
          </LearningCard>
          <LearningCard icon={Search} title="Why are we learning this?">
            <TextList items={selected.why} />
          </LearningCard>
          <LearningCard icon={Sparkles} title="Real-world examples">
            <TextList items={selected.realWorld} />
          </LearningCard>
          <LearningCard icon={LayoutDashboard} title="Visual explanation">
            <p className="leading-7 text-ink/70 dark:text-paper/70">{selected.visual}</p>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="rounded-lg border border-dashed border-leaf/40 bg-mint/70 dark:bg-leaf/10 p-3 text-center shadow-sm">
                  <p className="text-xs font-extrabold text-leaf">Step {index + 1}</p>
                  <p className="mt-1 text-sm text-ink/60 dark:text-paper/60">Trace</p>
                </div>
              ))}
            </div>
          </LearningCard>
        </div>

        <LearningCard icon={ListChecks} title="Problems">
          <div className="grid gap-3 md:grid-cols-3">
            {selected.problems.map((problem) => (
              <button
                key={problem.id}
                type="button"
                onClick={() => handleToggle("solvedProblems", problem.id)}
                className={cx(
                  "rounded-lg p-4 text-left ring-1 transition hover:-translate-y-0.5",
                  progress.solvedProblems.includes(problem.id)
                    ? "bg-leaf text-white ring-leaf shadow-soft"
                    : "bg-white/80 dark:bg-paper/10 text-ink dark:text-paper ring-1 ring-ink/10 dark:ring-white/10 hover:bg-saffron/15 dark:hover:bg-saffron/30 hover:shadow-soft",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wide">{problem.difficulty}</span>
                  {progress.solvedProblems.includes(problem.id) ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </div>
                <p className="mt-3 font-extrabold">{problem.title}</p>
                <p className="mt-2 text-sm leading-6 opacity-75">{problem.goal}</p>
                {problem.platformLink && (
                  <a
                    href={problem.platformLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-bold underline underline-offset-4"
                  >
                    Practice link
                    <ExternalLink aria-hidden="true" size={14} />
                  </a>
                )}
              </button>
            ))}
          </div>
        </LearningCard>

        <LearningCard icon={Medal} title="Magical questions">
          <div className="grid gap-4 md:grid-cols-2">
            {selected.magicalQuestions.map((question) => (
              <div key={question.id} className="rounded-lg bg-white/80 dark:bg-paper/10 p-4 shadow-sm ring-1 ring-ink/10 dark:ring-white/10">
                <h3 className="font-extrabold">{question.title}</h3>
                <div className="mt-3 space-y-2">
                  {question.methods.map((method) => (
                    <div key={method} className="rounded-md bg-mint dark:bg-leaf/20 px-3 py-2 text-sm font-bold text-leaf dark:text-leaf-dark">
                      {method}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-sm leading-6 text-ink/65 dark:text-paper/60">{question.lesson}</p>
              </div>
            ))}
          </div>
        </LearningCard>

        <div className="grid gap-5 xl:grid-cols-2">
          <LearningCard icon={Rocket} title="Mini project">
            <CheckPanel
              checked={progress.completedProjects.includes(selected.project.id)}
              label={selected.project.title}
              body={selected.project.brief}
              onToggle={() => handleToggle("completedProjects", selected.project.id)}
            />
          </LearningCard>
          <LearningCard icon={ClipboardCheck} title="Homework">
            <CheckPanel
              checked={progress.completedHomework.includes(selected.homework.id)}
              label="Week homework"
              body={`${selected.homework.practice.join(" · ")} · Challenge: ${selected.homework.challenge}`}
              onToggle={() => handleToggle("completedHomework", selected.homework.id)}
            />
          </LearningCard>
        </div>
      </section>
    </div>
  );
}

function ProjectsView({
  handleToggle,
  progress,
}: {
  handleToggle: (field: keyof ProgressState, id: string) => void;
  progress: ProgressState;
}) {
  return (
    <section>
      <SectionHero
        art={projectsHero}
        badge="Project ladder"
        title="Twelve mini projects that turn lessons into products"
        description="Each project is intentionally small enough for Saisha to complete, explain, and improve with tutor guidance."
        accent="Build first, polish next."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {curriculum.map((week) => {
          const done = progress.completedProjects.includes(week.project.id);

          return (
            <article
              key={week.project.id}
              className={cx(
                "shine-card surface rounded-lg p-5 transition hover:-translate-y-1 hover:shadow-lift",
                done ? "bg-leaf text-white ring-leaf" : "",
              )}
            >
              <div className="relative flex items-center justify-between gap-4">
                <span className="rounded-md bg-white/70 px-3 py-1 text-sm font-extrabold text-ink">Week {week.week}</span>
                <button
                  type="button"
                  aria-label={`Toggle ${week.project.title}`}
                  onClick={() => handleToggle("completedProjects", week.project.id)}
                  className={cx(
                    "flex h-10 w-10 items-center justify-center rounded-lg ring-1",
                    done
                      ? "bg-white text-leaf ring-white"
                      : "bg-paper dark:bg-paper/10 text-ink dark:text-paper ring-1 ring-ink/10 dark:ring-white/10",
                  )}
                >
                  {done ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>
              </div>
              <h3 className="relative mt-4 text-xl font-extrabold">{week.project.title}</h3>
              <p className="relative mt-3 min-h-24 leading-7 opacity-75">{week.project.brief}</p>
              <p className="relative mt-4 text-sm font-bold opacity-75">{week.level}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
function ResourcesView() {
  return (
    <section>
      <SectionHero
        art={resourcesHero}
        badge="Resources"
        title="Tutor-ready references for every week"
        description="Use these as prompts for notes, videos, practice sites, and articles during live teaching."
        accent="Notes, links, and references in one place."
      />
      <div className="mt-6 space-y-4">
        {curriculum.map((week) => (
          <details key={week.week} className="surface rounded-lg p-5 transition open:shadow-lift">
            <summary className="cursor-pointer text-lg font-extrabold marker:text-coral">
              Week {week.week}: {week.title}
            </summary>
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              <ResourceGroup title="Notes" items={[week.resources.notes]} />
              <ResourceGroup title="Videos" items={week.resources.videos} />
              <ResourceGroup title="Practice" items={week.resources.practice} />
              <ResourceGroup title="Articles" items={week.resources.articles} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function ProgressView({
  badge,
  progress,
  totals,
  xp,
}: {
  badge: { name: string; color: string };
  progress: ProgressState;
  totals: {
    conceptCount: number;
    problemCount: number;
    homeworkCount: number;
    projectCount: number;
  };
  xp: number;
}) {
  return (
    <section>
      <SectionHeading
        eyebrow="Progress"
        title="Saisha's private learning scorecard"
        description="The dashboard stores progress locally on this browser, ready for tutor-led check-ins."
      />
      <div className="mt-6 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="hero-panel rounded-lg p-6 text-white shadow-lift">
          <div className="flex items-center gap-3">
            <span className={cx("h-4 w-4 rounded-full", badge.color)} />
            <p className="text-sm font-extrabold uppercase tracking-wide text-white/65">Current tier</p>
          </div>
          <h3 className="mt-4 text-5xl font-extrabold">{badge.name}</h3>
          <p className="mt-3 text-white/70">{xp} XP earned so far.</p>
          <p className="mt-2 text-sm font-bold text-saffron">
            Saved in localStorage, so refreshing keeps Saisha's progress.
          </p>
          <div className="mt-6 space-y-3">
            {badgeTiers.map((tier) => (
              <div key={tier.name} className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-3 ring-1 ring-white/10">
                <span className="font-bold">{tier.name}</span>
                <span className="text-sm text-white/70">{tier.min}+ XP</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <ProgressTile label="Concepts learned" value={progress.learnedConcepts.length} total={totals.conceptCount} />
          <ProgressTile label="Problems solved" value={progress.solvedProblems.length} total={totals.problemCount} />
          <ProgressTile label="Homework completed" value={progress.completedHomework.length} total={totals.homeworkCount} />
          <ProgressTile label="Projects completed" value={progress.completedProjects.length} total={totals.projectCount} />
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ description, eyebrow, title }: { description: string; eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-sm font-extrabold uppercase tracking-wide text-coral">{eyebrow}</p>
      <h2 className="mt-2 max-w-4xl text-3xl font-extrabold sm:text-5xl">{title}</h2>
      <p className="mt-3 max-w-3xl text-[15px] font-medium leading-7 text-ink/70 dark:text-paper/70">{description}</p>
    </div>
  );
}

function SectionHero({
  art,
  badge,
  title,
  description,
  accent,
}: {
  art: string;
  badge: string;
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <div className="surface overflow-hidden rounded-lg">
      <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-6 sm:p-8">
          <p className="text-sm font-extrabold uppercase tracking-wide text-coral">{badge}</p>
          <h2 className="mt-2 max-w-4xl text-3xl font-extrabold sm:text-5xl">{title}</h2>
          <p className="mt-3 max-w-3xl text-[15px] font-medium leading-7 text-ink/70 dark:text-paper/70">{description}</p>
          <div className="mt-5 inline-flex rounded-full bg-ink dark:bg-saffron px-4 py-2 text-sm font-bold text-white dark:text-ink shadow-soft">
            {accent}
          </div>
        </div>
        <div className="relative min-h-[220px] bg-gradient-to-br from-ink via-leaf to-sky p-4">
          <img
            alt={`${badge} illustration`}
            src={art}
            className="h-full w-full rounded-lg object-cover shadow-lift ring-1 ring-white/10"
          />
        </div>
      </div>
    </div>
  );
}

function LearningCard({
  children,
  icon: Icon,
  title,
}: {
  children: React.ReactNode;
  icon: typeof Brain;
  title: string;
}) {
  return (
    <section className="surface rounded-lg p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron text-ink shadow-sm">
          <Icon aria-hidden="true" size={20} />
        </div>
        <h3 className="text-xl font-extrabold">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function CheckList({
  items,
  onToggle,
  selected,
}: {
  items: { id: string; label: string }[];
  onToggle: (id: string) => void;
  selected: string[];
}) {
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const checked = selected.includes(item.id);

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onToggle(item.id)}
            className={cx(
              "flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left font-bold transition hover:-translate-y-0.5",
              checked
                ? "bg-leaf text-white shadow-soft"
                : "bg-white/80 dark:bg-paper/10 text-ink dark:text-paper ring-1 ring-ink/10 dark:ring-white/10 hover:bg-saffron/15 dark:hover:bg-saffron/30",
            )}
          >
            {checked ? <CheckCircle2 aria-hidden="true" size={18} /> : <Circle aria-hidden="true" size={18} />}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

function TextList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 font-medium leading-7 text-ink/70 dark:text-paper/70">
          <BadgeCheck aria-hidden="true" className="mt-1 shrink-0 text-leaf" size={18} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CheckPanel({
  body,
  checked,
  label,
  onToggle,
}: {
  body: string;
  checked: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cx(
        "flex w-full items-start gap-4 rounded-lg p-4 text-left ring-1 transition hover:-translate-y-0.5",
        checked
          ? "bg-leaf text-white ring-leaf shadow-soft"
          : "bg-white/80 dark:bg-paper/10 text-ink dark:text-paper ring-1 ring-ink/10 dark:ring-white/10 hover:bg-saffron/15 dark:hover:bg-saffron/30 hover:shadow-soft",
      )}
    >
      <span className="mt-1 shrink-0">{checked ? <CheckCircle2 size={20} /> : <Circle size={20} />}</span>
      <span>
        <span className="block font-extrabold">{label}</span>
        <span className="mt-2 block leading-7 opacity-75">{body}</span>
      </span>
    </button>
  );
}

function WeekButton({
  ariaLabel,
  disabled,
  icon: Icon,
  onClick,
}: {
  ariaLabel: string;
  disabled: boolean;
  icon: typeof ChevronLeft;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/85 dark:bg-paper/20 text-ink dark:text-paper shadow-sm ring-1 ring-ink/10 dark:ring-white/10 transition hover:-translate-y-0.5 hover:bg-saffron/25 dark:hover:bg-saffron/40 disabled:cursor-not-allowed disabled:opacity-35"
    >
      <Icon aria-hidden="true" size={20} />
    </button>
  );
}

function ProgressLine({ label, total, value }: { label: string; total: number; value: number }) {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div>
      <div className="flex justify-between text-sm font-semibold text-white/75">
        <span>{label}</span>
        <span>{value}/{total}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-white/15">
        <div className="h-2 rounded-full bg-saffron shadow-glow" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function ProgressTile({ label, total, value }: { label: string; total: number; value: number }) {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div className="surface rounded-lg p-5">
      <p className="text-sm font-extrabold uppercase tracking-wide text-ink/55 dark:text-paper/55">{label}</p>
      <p className="mt-3 text-3xl font-extrabold">{value}/{total}</p>
      <div className="mt-5 h-3 rounded-full bg-ink/10 dark:bg-paper/10">
        <div className="h-3 rounded-full bg-coral shadow-soft" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-3 text-sm font-bold text-ink/60 dark:text-paper/60">{percent}% complete</p>
    </div>
  );
}

function ResourceGroup({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="rounded-lg bg-white/80 dark:bg-paper/10 p-4 shadow-sm ring-1 ring-ink/10 dark:ring-white/10">
      <p className="font-extrabold text-leaf dark:text-leaf-dark">{title}</p>
      <ul className="mt-3 space-y-2 text-sm font-medium leading-6 text-ink/70 dark:text-paper/70">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export { App };
