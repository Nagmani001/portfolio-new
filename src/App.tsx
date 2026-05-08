import devforces from "./assets/924shots_so.png"
import { GitHubCalendar } from 'react-github-calendar';
import lovable from "./assets/456shots_so.png"
import codeforces from "./assets/670shots_so.png"
import gamble from "./assets/532shots_so.png"
import exchangeCex from "./assets/exchange-cex.png"
import hackathonImage from "./assets/100xSchoolHackathon.png"
import appxLogo from "./assets/appx-logo.svg"
import { Dithering } from '@paper-design/shaders-react';

import { useState, useEffect } from "react";
import "./index.css";

import { SocialGlowButton } from "./components/ui/SocialGlowButton";
import { FadeUpContainer, FadeUpItem } from "./components/ui/FadeUp";

import {
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
import { ProjectCard } from "./components/projects/ProjectCard";

import { Footer } from "./components/layout/Footer";
import { BlogList } from "./components/blogs/BlogList";
import { BlogPost } from "./components/blogs/BlogPost";
import { BlogAdmin } from "./components/blogs/BlogAdmin";

export function App() {
  const [copied, setCopied] = useState(false);
  const [cliCopied, setCliCopied] = useState(false);
  const [isCliVideoOpen, setIsCliVideoOpen] = useState(false);
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

  const copyCliCommand = () => {
    navigator.clipboard.writeText("npx create-repokit@latest -y");
    setCliCopied(true);
    setTimeout(() => setCliCopied(false), 2000);
  };

  const cliNpmUrl = "https://www.npmjs.com/package/create-t3-app";
  const cliGithubUrl = "https://github.com/Nagmani001";
  const hackathonUrl =
    "https://superteam.fun/earn/feed/submission/a2b6aa67-cba8-47fa-9589-2bb9783892fc";

  const handleCliCardOpen = () => {
    const selectedText = window.getSelection?.()?.toString().trim();
    if (selectedText) return;
    window.open(cliNpmUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCliVideoOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

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
      id: "exchange",
      title: "Exchange",
      description:
        "A centralized crypto exchange UI with live order book, candlestick charts, limit and market orders, and balances.",
      tech: ["TypeScript", "React", "WebSockets"],
      roles: [{ name: "Fullstack", type: "dev" }] as const,
      githubUrl: "https://github.com/Nagmani001/exchange",
      liveUrl: "https://exchange.nagmani.site",
      image: exchangeCex,
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
      youtubeId: "5fsj7ztbcEU",
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

  const skillCategories = [
    {
      title: "Backend & APIs",
      skills: ["Node.js", "Express", "Actix-web", "graphql", "Django REST Framework", "firecracker", "e2b orchestration"]
    },
    {
      title: "System Design",
      skills: ["Event-driven architecture", "Microservices", "REST APIs", "WebSockets", "Server-Sent Events", "Monorepos", "Turborepo"]
    },
    {
      title: "Databases & Caching",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Drizzle"]
    },
    {
      title: "DevOps & Cloud",
      skills: ["Docker", "Kubernetes", "k8s", "KEDA", "CI/CD", "GitHub Actions", "AWS", "GCP"]
    },
    {
      title: "Frontend",
      skills: ["React", "Next.js", "React Query", "Zustand", "Jotai", "Tailwind CSS", "shadcn/ui"]
    },
    {
      title: "Languages",
      skills: ["TypeScript", "JavaScript", "Python", "Rust"]
    }
  ];

  const topNavItems = [
    { id: "projects", label: "Projects", targetPath: "/#projects" },
    { id: "blogs", label: "Blogs", targetPath: "/#blogs" },
    { id: "experience", label: "Experience", targetPath: "/#experience" },

  ];

  return (
    <div className="app-shell min-h-screen bg-(--bg-primary) text-(--text-primary) selection:bg-(--text-primary) selection:text-(--bg-primary) font-sans overflow-x-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-[-2]"
        style={{
          maskImage: "radial-gradient(ellipse at bottom left, black 0%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(ellipse at bottom left, black 0%, transparent 60%)"
        }}
      >
        <Dithering
          width="100%"
          height="100%"
          colorBack="#161616"
          colorFront="#333333"
          shape="simplex"
          type="4x4"
          size={2}
          speed={0.6}
          scale={0.6}
        />
      </div>

      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 px-2 pt-2">
          <div className="top-header-shell max-w-5xl mx-auto h-12 flex items-center gap-2 px-3">

            <div className="flex-1" />
            <nav className="hidden sm:flex items-center gap-5">
              {topNavItems.map((item) => {

                return (
                  <button
                    key={item.id}
                    onClick={(e) => navigateTo(item.targetPath, e)}
                    className={`text-[14px] font-medium transition-colors cursor-pointer 
                      "text-(--text-muted) hover:text-(--text-primary)"
                      }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <a
              href="https://github.com/Nagmani001"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex mx-2 scale-110 items-center text-(--text-muted) hover:text-(--text-primary) transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
          </div>
        </header>
        <div className="h-16" />

        {currentPath === "/admin" ? (
          <main className="max-w-5xl mx-auto px-6 py-14 min-h-[80vh] pb-16">
            <div className="animate-in fade-in duration-300 slide-in-from-bottom-4">
              <BlogAdmin onNavigate={navigateTo} />
            </div>
          </main>
        ) : currentPath.startsWith("/blog/") ? (
          <main className="max-w-5xl mx-auto px-6 py-14 min-h-[80vh] pb-16">
            <BlogPost
              slug={currentPath.slice("/blog/".length)}
              onBack={() => navigateTo("/#blogs")}
            />
          </main>

        ) : currentPath !== "/" &&
          currentPath !== "" &&
          !currentPath.includes("#") &&
          projects.find((p) => p.id === currentPath.slice(1)) ? (
          <main className="max-w-5xl mx-auto px-6 py-14 space-y-12 transition-all min-h-[80vh] pb-16">
            {(() => {
              const project = projects.find(
                (p) => p.id === currentPath.slice(1),
              )!;
              return (
                <div className="animate-in fade-in duration-300 slide-in-from-bottom-4">
                  <SectionMinimal title="Project Details" divider="medium">
                    {(project.youtubeId || project.image) && (
                      <div className="w-full rounded-2xl overflow-hidden border border-(--border-color) shadow-sm bg-(--bg-tertiary) pl-1 ml-1 mb-10 pt-4">
                        {project.youtubeId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                            className="w-full aspect-video"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            title={project.title}
                          />
                        ) : (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto"
                          />
                        )}
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
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-[13px] font-medium bg-(--text-primary) text-(--bg-primary) rounded-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--text-muted)"
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
          <FadeUpContainer className="max-w-5xl mx-auto px-6 py-14 space-y-12 transition-all min-h-[80vh] pb-16">
            <FadeUpItem>
              <header id="home" className="flex flex-col pl-1 scroll-mt-24">
                <NameFlip />

                <div className="flex flex-col gap-6 mt-4">
                  <p className="text-(--text-secondary) text-[16px] leading-relaxed max-w-2xl font-normal">
                    Backend-focused developer building scalable,
                    high-performance systems using{" "}
                    <span className="font-medium text-(--text-primary)">
                      TypeScript
                    </span>{" "}
                    and{" "}
                    <span className="font-medium text-(--text-primary)">Rust</span>
                    , with a strong emphasis on reliability and clean
                    architecture, and security.
                  </p>

                  <div className="flex flex-col gap-4">
                    <div className="inline-flex items-center flex-wrap gap-2 text-[16px]">
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
                    </div>
                    <div className="flex flex-wrap gap-x-1 gap-y-3 mt-1">
                      <SocialGlowButton href="mailto:nagmanipd3@gmail.com" variant="orange">
                        <MailIcon />
                      </SocialGlowButton>
                      <SocialGlowButton href="https://x.com/nagmani_twt" variant="blue">
                        <TwitterIcon />
                      </SocialGlowButton>
                      <SocialGlowButton href="https://github.com/Nagmani001" variant="dark">
                        <GitHubIcon />
                      </SocialGlowButton>
                      <SocialGlowButton href="https://www.linkedin.com/in/nagmani-pd-367b31197/" variant="blue">
                        <LinkedInIcon />
                      </SocialGlowButton>
                      <SocialGlowButton href="https://discord.com/users/708247939050373130" variant="purple">
                        <DiscordIcon />
                      </SocialGlowButton>
                    </div>
                  </div>
                </div>
              </header>
            </FadeUpItem>

            <FadeUpItem>
              <SectionMinimal title="Experience" id="experience" divider="medium">
                <div className="flex flex-col gap-6">
                  <ExperienceRow
                    role="Fullstack Engineer"
                    company={
                      <a
                        href="https://www.kraneapps.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-sm text-[15px] leading-tight transition-opacity duration-200 ease-out hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color)"
                        aria-label="Krane Apps"
                      >
                        <img
                          src="https://www.kraneapps.com/images/logo.png"
                          alt="Krane Apps logo"
                          className="block h-6 w-6 shrink-0 object-contain"
                        />
                        <span className="font-black tracking-tighter leading-tight text-(--text-primary)">
                          KRANE APPS
                        </span>
                      </a>
                    }
                    duration="2025 — Present"
                  />
                </div>
              </SectionMinimal>
            </FadeUpItem>

            <FadeUpItem>
              <SectionMinimal title="Blogs" id="blogs" divider="subtle">
                <BlogList onNavigate={navigateTo} />
              </SectionMinimal>
            </FadeUpItem>

            <FadeUpItem>
              <SectionMinimal title="Projects" id="projects" divider="strong">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-1">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
              </SectionMinimal>
            </FadeUpItem>

            <FadeUpItem>
              <SectionMinimal title="Hackathon" id="hackathon" divider="medium">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-1">
                  <a
                    href={hackathonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative w-full bg-(--bg-secondary) rounded-2xl border border-(--border-color) transition-all duration-300 ease-out overflow-hidden shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--text-muted)"
                  >
                    {/* Aesthetic double border and inset shadow overlay */}
                    <div className="pointer-events-none absolute inset-0 z-20 rounded-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_4px_24px_rgba(255,255,255,0.1)] group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15),inset_0_4px_35px_rgba(255,255,255,0.2)] transition-shadow duration-300" />

                    <div className="w-full h-64 bg-(--bg-tertiary) border-b border-(--border-color) overflow-hidden relative">
                      <img
                        src={hackathonImage}
                        alt="100xSchool Solana Hackathon win banner"
                        className="absolute inset-0 w-full h-full object-contain bg-white p-1.5"
                      />
                    </div>
                    <div className="p-7">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold text-(--text-primary)">
                            100xSchool Solana Hackathon
                          </h3>
                          <p className="text-[16px] leading-relaxed text-(--text-secondary) max-w-xl">
                            Winner at the 100xDevs-led global Solana hackathon with
                            21 submissions and a $1,000 USDC total prize pool.
                          </p>
                        </div>
                        <span className="shrink-0 text-[11px] font-medium text-(--text-muted) border border-(--border-color) rounded-md px-2 py-0.5">
                          Winner
                        </span>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-(--text-muted) group-hover:text-(--text-primary) transition-colors duration-200">
                        View hackathon listing <ExternalLinkIcon />
                      </span>
                    </div>
                  </a>
                </div>
              </SectionMinimal>
            </FadeUpItem>

            <FadeUpItem>
              <SectionMinimal title="CLI & TUI" id="cli-tui" divider="medium">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-1">
                  <article
                    className="group relative w-full bg-(--bg-secondary) rounded-2xl border border-(--border-color) transition-all duration-300 ease-out overflow-hidden shadow-sm hover:shadow-md cursor-pointer"
                    onClick={handleCliCardOpen}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        window.open(cliNpmUrl, "_blank", "noopener,noreferrer");
                      }
                    }}
                    role="link"
                    tabIndex={0}
                    aria-label="Open RepoKit npm package"
                  >
                    {/* Aesthetic double border and inset shadow overlay */}
                    <div className="pointer-events-none absolute inset-0 z-20 rounded-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_4px_24px_rgba(255,255,255,0.1)] group-hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15),inset_0_4px_35px_rgba(255,255,255,0.2)] transition-shadow duration-300" />

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCliVideoOpen(true);
                      }}
                      className="w-full h-56 bg-(--bg-tertiary) border-b border-(--border-color) overflow-hidden relative text-left cursor-zoom-in"
                      title="Open CLI demo"
                    >
                      <iframe
                        src="https://www.youtube.com/embed/JBsZdOzS1sU?autoplay=1&mute=1&loop=1&playlist=JBsZdOzS1sU&controls=0&modestbranding=1&rel=0&playsinline=1"
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        allow="autoplay"
                        title="RepoKit CLI demo"
                      />
                    </button>
                    <div className="p-7 flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold text-(--text-primary) tracking-tight">
                            RepoKit
                          </h3>
                          <p className="text-[16px] leading-relaxed text-(--text-secondary) max-w-xl">
                            Bootstraps a Turborepo with auth, backend, infra, and
                            sensible production defaults.
                          </p>
                        </div>
                        <span className="shrink-0 text-[11px] font-medium text-(--text-muted) border border-(--border-color) rounded-md px-2 py-0.5">
                          CLI / TUI
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={cliNpmUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200"
                        >
                          npm package <ExternalLinkIcon />
                        </a>
                        <a
                          href={cliGithubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200"
                        >
                          <GitHubIcon /> GitHub
                        </a>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                        <code className="inline-flex max-w-full items-center overflow-x-auto whitespace-nowrap rounded-md border border-(--border-color) bg-(--bg-tertiary) px-3 py-1.5 text-[13px] font-medium text-(--text-primary)">
                          npx create-repokit@latest -y
                        </code>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyCliCommand();
                          }}
                          className="inline-flex items-center justify-center gap-1.5 min-w-[98px] rounded-md border border-(--border-color) bg-(--bg-secondary) px-2.5 py-1.5 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 cursor-pointer"
                          title="Copy CLI command"
                        >
                          {cliCopied ? <CheckIcon /> : <CopyIcon />}
                          {cliCopied ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              </SectionMinimal>
            </FadeUpItem>

            <FadeUpItem>
              <SectionMinimal title="Skills" divider="medium">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 pl-1 mb-8 mt-2">
                  {skillCategories.map((category) => (
                    <div key={category.title} className="flex flex-col">
                      <h3 className="text-xl font-medium text-(--text-primary) mb-3 tracking-tight">
                        {category.title}
                      </h3>
                      <div className="h-px w-full bg-(--border-color) mb-5" />
                      <div className="flex flex-wrap gap-2.5">
                        {category.skills.map((skill) => (
                          <TechBadge key={skill} name={skill} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionMinimal>
            </FadeUpItem>

            <FadeUpItem>
              <SectionMinimal title="GitHub" divider="medium">
                <div className="w-full grayscale-100 pb-4 ">
                  <div className="min-w-max flex justify-center px-1">
                    <GitHubCalendar
                      username="nagmani001"
                      year="last"
                      colorScheme="dark"
                      blockSize={15}
                      blockMargin={3}
                      fontSize={14}
                      showWeekdayLabels={["mon", "wed", "fri"]}
                    />
                  </div>
                </div>
              </SectionMinimal>
            </FadeUpItem>
          </FadeUpContainer>
        )}

        {isCliVideoOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
            onClick={() => setIsCliVideoOpen(false)}
          >
            <div
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsCliVideoOpen(false)}
                className="absolute -top-11 right-0 inline-flex items-center gap-2 rounded-md border border-white/25 bg-black/40 px-3 py-1.5 text-sm font-medium text-white hover:bg-black/55 transition-colors"
              >
                Close
              </button>
              <iframe
                src="https://www.youtube.com/embed/JBsZdOzS1sU?autoplay=1&controls=1&rel=0&modestbranding=1"
                className="w-full aspect-video rounded-xl border border-white/15 bg-black"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="RepoKit CLI demo"
              />
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
