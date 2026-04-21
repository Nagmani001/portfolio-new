import devforces from "./assets/924shots_so.png"
import { GitHubCalendar } from 'react-github-calendar';
import lovable from "./assets/456shots_so.png"
import codeforces from "./assets/670shots_so.png"
import gamble from "./assets/532shots_so.png"
import appxLogo from "./assets/appx-logo.svg"

import { useState, useEffect } from "react";
import "./index.css";


import {
  SunIcon,
  MoonIcon,
  HomeIcon,
  UserIcon,
  LayersIcon,
  GitHubIcon,
  ExternalLinkIcon,
  TwitterIcon,
  LinkedInIcon,
  MailIcon,
  CopyIcon,
  CheckIcon,
  DiscordIcon,
} from "./components/Icons";
import { SectionMinimal } from "./components/ui/SectionMinimal";
import { NameFlip } from "./components/ui/NameFlip";
import { ExperienceRow } from "./components/ui/ExperienceRow";
import { TechBadge } from "./components/ui/TechBadge";
import { ProjectRow } from "./components/projects/ProjectRow";
import { ProjectCard } from "./components/projects/ProjectCard";
import { AboutSection } from "./components/about/AboutSection";
import { Footer } from "./components/layout/Footer";
import { FloatingToolbar } from "./components/ui/FloatingToolbar";

export function App() {
  const [isDark, setIsDark] = useState(true);
  const [copied, setCopied] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string, event?: React.MouseEvent) => {
    if (event) event.preventDefault();
    if (path.includes("#")) {
      const [base, hash] = path.split("#");
      const targetBase = base || "/";

      if (currentPath !== targetBase) {
        window.history.pushState({}, "", path);
        setCurrentPath(targetBase);
        if (hash) {
          setTimeout(() => {
            document
              .getElementById(hash)
              ?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      } else {
        window.history.pushState({}, "", path);
        if (hash) {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("nagmanipd3@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (stored === "light" || (!stored && !prefersDark)) {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = (event: React.MouseEvent) => {
    const isSwitchingToDark = !isDark;

    const toggle = () => {
      setIsDark(isSwitchingToDark);
      if (isSwitchingToDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    };

    if (!("startViewTransition" in document)) {
      toggle();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = (document as any).startViewTransition(toggle);

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 900,
          easing: "cubic-bezier(0.32, 0.72, 0, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  const projects = [
    {
      id: "devforces",
      title: "Devforces",
      description:
        "A developer community platform to level up your dev game — share projects, compete, and grow together.",
      tech: ["TypeScript", "React", "Node.js"],
      roles: [{ name: "Fullstack", type: "dev" }] as const,
      githubUrl: "https://github.com/Nagmani001/devforces",
      liveUrl: "https://devforces.nagmani.site",
      image: devforces,
    },
    {
      id: "lovable",
      title: "Lovable",
      description:
        "An AI-powered website builder that lets you build beautiful websites with a single prompt.",
      tech: ["TypeScript", "React", "AI"],
      roles: [{ name: "Fullstack", type: "dev" }] as const,
      githubUrl: "https://github.com/Nagmani001/lovable",
      liveUrl: "https://lovable.nagmani.site",
      image: lovable,
    },
    {
      id: "codeforces",
      title: "Codeforces",
      description:
        "A competitive programming companion — track contests, solve problems, and monitor your Codeforces progress.",
      tech: ["TypeScript", "React", "APIs"],
      roles: [{ name: "Fullstack", type: "dev" }] as const,
      githubUrl: "https://github.com/Nagmani001/codeforces",
      liveUrl: "https://codeforces.nagmani.site",
      image: codeforces,
    },
    {
      id: "100xgamble",
      title: "100xGamble",
      description:
        "A Solana-based roulette gambling dApp — place bets, spin the wheel, and win SOL on-chain.",
      tech: ["Solana", "TypeScript", "React"],
      roles: [{ name: "Fullstack", type: "dev" }] as const,
      githubUrl: "https://github.com/Nagmani001/100xGambling",
      image: gamble,
    },
  ];

  const techStack = [
    { name: "TypeScript", colorClass: "badge-typescript" },
    { name: "Node.js", colorClass: "badge-nodejs" },
    { name: "NestJS", colorClass: "badge-nodejs" },
    { name: "Express", colorClass: "badge-express" },
    { name: "Fastify", colorClass: "badge-express" },
    { name: "Rust", colorClass: "badge-nodejs" },
    { name: "PostgreSQL", colorClass: "badge-postgresql" },
    { name: "MongoDB", colorClass: "badge-mongodb" },
    { name: "Redis", colorClass: "badge-nodejs" },
    { name: "Kafka", colorClass: "badge-nodejs" },
    { name: "Docker", colorClass: "badge-docker" },
    { name: "AWS", colorClass: "badge-nodejs" },
    { name: "Linux", colorClass: "badge-nodejs" },
    { name: "Nginx", colorClass: "badge-nodejs" },
    { name: "GitHub Actions", colorClass: "badge-nodejs" },
    { name: "Prometheus", colorClass: "badge-nodejs" },
    { name: "Grafana", colorClass: "badge-nodejs" },
    { name: "OpenTelemetry", colorClass: "badge-nodejs" },
  ];

  const menuItems = [
    { id: "home", icon: <HomeIcon />, label: "Home", targetPath: "/" },
    {
      id: "projects",
      icon: <LayersIcon />,
      label: "Projects",
      targetPath: "/projects",
    },
    { id: "about", icon: <UserIcon />, label: "About", targetPath: "/about" },
  ];

  return (
    <div className="min-h-screen bg-(--bg-primary) text-(--text-primary) selection:bg-(--text-primary) selection:text-(--bg-primary) font-sans overflow-x-hidden">
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <FloatingToolbar
          items={[
            ...menuItems.map((item) => ({
              id: item.id,
              label: item.label,
              icon: item.icon,
              onClick: (e: React.MouseEvent) => navigateTo(item.targetPath, e),
            })),
            {
              id: "theme",
              label: isDark ? "Light Mode" : "Dark Mode",
              icon: isDark ? <SunIcon /> : <MoonIcon />,
              onClick: toggleTheme,
            },
          ]}
          activeId={
            currentPath === "/" || currentPath === ""
              ? "home"
              : currentPath === "/projects"
                ? "projects"
                : currentPath === "/about"
                  ? "about"
                  : undefined
          }
          separator={2}
        />
      </nav>

      {currentPath === "/about" ? (
        <main className="max-w-2xl mx-auto px-6 py-20 space-y-12 transition-all  min-h-[80vh] pb-24">
          <div className="animate-in fade-in duration-300 slide-in-from-bottom-4 space-y-8">
            <AboutSection />
            <SectionMinimal title="Technologies">
              <div className="flex flex-wrap gap-x-2 gap-y-2 pl-1 mb-8">
                {techStack.map((tech) => (
                  <TechBadge key={tech.name} {...tech} />
                ))}
              </div>
            </SectionMinimal>

            <SectionMinimal title="GitHub">
              <div className="bg-(--bg-secondary) border border-(--border-color) rounded-2xl p-4 sm:p-5">
                <div className="w-full flex justify-center">
                  <GitHubCalendar
                    username="nagmani001"
                    year="last"
                    colorScheme={isDark ? "dark" : "light"}
                    blockSize={8}
                    blockMargin={2}
                    fontSize={11}
                    showWeekdayLabels={["mon", "wed", "fri"]}
                  />
                </div>
              </div>
            </SectionMinimal>
          </div>
        </main>
      ) : currentPath === "/projects" ? (
        <main className="max-w-2xl mx-auto px-6 py-20 space-y-12 transition-all  min-h-[80vh] pb-24">
          <div className="animate-in fade-in duration-300 slide-in-from-bottom-4">
            <div className="flex items-center gap-2 pl-1 mb-8">
              <button
                onClick={() =>
                  document
                    .getElementById("projects-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-[12px] font-medium tracking-wide px-3 py-1.5 rounded-lg border bg-(--bg-secondary) border-(--border-color) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--text-muted) transition-colors duration-200 ease-out cursor-pointer focus-visible:outline-none"
              >
                Projects
              </button>
            </div>

            <SectionMinimal title="Projects" id="projects-section">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-1">
                {projects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </SectionMinimal>

          </div>
        </main>
      ) : currentPath !== "/" &&
        currentPath !== "" &&
        !currentPath.includes("#") &&
        projects.find((p) => p.id === currentPath.slice(1)) ? (
        <main className="max-w-2xl mx-auto px-6 py-20 space-y-12 transition-all  min-h-[80vh] pb-24">
          {(() => {
            const project = projects.find(
              (p) => p.id === currentPath.slice(1),
            )!;
            return (
              <div className="animate-in fade-in duration-300 slide-in-from-bottom-4">
                <SectionMinimal title="Project Details">
                  {project.image && (
                    <div className="w-full rounded-2xl overflow-hidden border border-(--border-color) shadow-sm bg-(--bg-tertiary) pl-1 ml-1 mb-10 pt-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto"
                      />
                    </div>
                  )}

                  <h1 className="text-3xl font-bold text-(--text-primary) tracking-tight mb-6 pl-1">
                    {project.title}
                  </h1>

                  <div className="flex flex-wrap gap-2 mb-8 pl-1">
                    {project.tech.map((t) => (
                      <TechBadge key={t} name={t} colorClass="" />
                    ))}
                  </div>

                  <p className="text-(--text-secondary) text-[15px] leading-relaxed max-w-xl mb-10 pl-1">
                    {project.description}
                  </p>

                  <div className="flex gap-4 pl-1">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-[13px] font-medium bg-(--text-primary) text-(--bg-primary) rounded-lg hover:bg-(--text-secondary) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--text-muted)"
                      >
                        Visit Website <ExternalLinkIcon />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-[13px] font-medium bg-(--bg-tertiary) border border-(--border-color) text-(--text-primary) rounded-lg hover:bg-(--border-color) transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color)"
                      >
                        <GitHubIcon /> View Source
                      </a>
                    )}
                  </div>
                </SectionMinimal>
              </div>
            );
          })()}
        </main>
      ) : (
        <main className="max-w-2xl mx-auto px-6 py-20 space-y-12  transition-all min-h-[80vh] pb-24">
          <header id="home" className="flex flex-col pl-1 scroll-mt-24">
            <NameFlip />

            <div className="flex flex-col gap-6 mt-4">
              <p className="text-(--text-secondary) text-[15px] leading-relaxed max-w-lg font-normal">
                I am currently building{" "}
                <a
                  href="https://github.com/Nagmani001/lovable"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium wavy-link"
                >
                  Lovable
                </a>
                , a website that let's you build other websites
                <br />
                <br />
                Backend-focused developer building scalable,
                high-performance systems using{" "}
                <span className="font-medium text-(--text-primary)">
                  TypeScript
                </span>{" "}
                and{" "}
                <span className="font-medium text-(--text-primary)">Rust</span>
                , with a strong emphasis on reliability and clean
                architecture.
              </p>

              <div className="inline-flex items-center flex-wrap gap-2 text-[15px]">
                <span className="text-(--text-secondary)">Get in touch:</span>
                <span className="font-medium text-(--text-primary)">
                  nagmanipd3@gmail.com
                </span>
                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded-md hover:bg-(--bg-tertiary) text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) ml-1 cursor-pointer"
                  title="Copy email"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
                <div className="flex flex-wrap gap-x-4 gap-y-3 mt-4">
                  <a
                    href="mailto:nagmanipd3@gmail.com"
                    className="group flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded-md"
                  >
                    <span className="p-1.5 rounded-md bg-(--bg-tertiary) border border-(--border-color) group-hover:border-(--text-muted) transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[0.97]">
                      <MailIcon />
                    </span>
                    <span>Email</span>
                  </a>
                  <a
                    href="https://x.com/nagmani_twt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded-md"
                  >
                    <span className="p-1.5 rounded-md bg-(--bg-tertiary) border border-(--border-color) group-hover:border-(--text-muted) transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[0.97]">
                      <TwitterIcon />
                    </span>
                    <span>Twitter</span>
                  </a>
                  <a
                    href="https://github.com/Nagmani001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded-md"
                  >
                    <span className="p-1.5 rounded-md bg-(--bg-tertiary) border border-(--border-color) group-hover:border-(--text-muted) transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[0.97]">
                      <GitHubIcon />
                    </span>
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nagmani-pd-367b31197/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded-md"
                  >
                    <span className="p-1.5 rounded-md bg-(--bg-tertiary) border border-(--border-color) group-hover:border-(--text-muted) transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[0.97]">
                      <LinkedInIcon />
                    </span>
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://discord.com/users/708247939050373130"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded-md"
                  >
                    <span className="p-1.5 rounded-md bg-(--bg-tertiary) border border-(--border-color) group-hover:border-(--text-muted) transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[0.97]">
                      <DiscordIcon />
                    </span>
                    <span>Discord</span>
                  </a>
                </div>
              </div>
            </div>
          </header>

          <SectionMinimal title="Experience" id="experience">
            <div className="flex flex-col gap-6">
              <ExperienceRow
                role="Fullstack Engineer"
                company={
                  <a
                    href="https://www.kraneapps.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm text-[15px] leading-none transition-opacity duration-200 ease-out hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color)"
                    aria-label="Krane Apps"
                  >
                    <img
                      src="https://www.kraneapps.com/images/logo.png"
                      alt="Krane Apps logo"
                      className="block h-6 w-6 shrink-0 object-contain"
                    />
                    <span className="font-black tracking-tighter leading-none text-(--text-primary)">
                      KRANE APPS
                    </span>
                  </a>
                }
                duration="2025 — Present"
              />
            </div>
          </SectionMinimal>
          <SectionMinimal title="Work" id="projects">
            <div className="flex flex-col gap-1">
              {projects.slice(0, 3).map((project) => (
                <ProjectRow
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  roles={project.roles as any}
                  onClick={(id, e) => navigateTo(`/${id}`, e)}
                />
              ))}
            </div>
            <div className="mt-6 pl-1">
              <a
                href="/projects"
                onClick={(e) => navigateTo("/projects", e)}
                className="group inline-flex items-center gap-2 text-sm font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none cursor-pointer"
              >
                <span>All projects</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </SectionMinimal>
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;
