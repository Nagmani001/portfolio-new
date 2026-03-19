import { useState, useEffect } from "react";
import "./index.css";
import devsImage from "./assets/100xDevsFrontend.png";
import cypherImage from "./assets/Cypher.png";
import mayhemImage from "./assets/Mayhem.png";
import contactImage from "./assets/contact.png";
import pulseapiImage from "./assets/pulse-api.png";


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
import { MovieShelf } from "./components/about/MovieShelf";
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
    navigator.clipboard.writeText("quantapar@gmail.com");
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
      id: "pulseapi",
      title: "PulseAPI",
      description:
        "A real-time API monitoring dashboard. Built with a responsive frosted glass UI and comprehensive system metrics to track endpoint uptime.",
      tech: ["Bun", "TypeScript", "React", "Postgres", "Prisma"],
      roles: [{ name: "Fullstack", type: "dev" }] as const,
      githubUrl: "https://github.com/Quantapar/PulseApi",
      image: pulseapiImage,
    },
    {
      id: "100xdevs",
      title: "100xDevs Frontend Revamp",
      description:
        "A complete frontend revamp for the 100xDevs platform. Features immersive web animations, modern UI components, and a robust design system.",
      tech: ["React", "Tailwind CSS", "Framer Motion"],
      roles: [
        { name: "Design", type: "design" },
        { name: "Dev", type: "dev" },
      ] as const,
      githubUrl: "https://github.com/Quantapar/100xDevs-Frontend",
      liveUrl: "https://100xdevslanding.vercel.app/",
      image: devsImage,
    },
    {
      id: "cypher",
      title: "Cypher",
      description:
        "A full-stack contest hosting platform. Built for scalability with role-based access, real-time code submissions, and live leaderboards.",
      tech: ["React", "Bun", "Postgres", "Prisma", "Docker"],
      roles: [{ name: "Fullstack", type: "dev" }] as const,
      githubUrl: "https://github.com/Quantapar/contest-platform",
      liveUrl: "https://cypherarena.vercel.app/",
      image: cypherImage,
    },
    {
      id: "mayhem",
      title: "Mayhem",
      description:
        "Experimental landing page design. Focusing on micro-interactions, smooth scrolling, and cinematic typography.",
      tech: ["HTML", "Tailwind", "Motion"],
      roles: [
        { name: "Design", type: "design" },
        { name: "Interactions", type: "prototype" },
      ] as const,
      githubUrl: "https://github.com/Quantapar/Tailwind/tree/main/tailwind01",
      liveUrl: "https://joinmayhem.vercel.app/",
      image: mayhemImage,
    },
    // {
    //   id: "contact-manager",
    //   title: "Contact Manager",
    //   description:
    //     "Robust REST API design pattern demonstration. Features protected routes, input validation, and secure JWT handling.",
    //   tech: ["Node.js", "Express", "MongoDB", "Zod"],
    //   roles: [{ name: "Backend Concept", type: "dev" }] as const,
    //   githubUrl: "https://github.com/Quantapar/contact-manager-api",
    //   image: contactImage,
    // },
  ];

  const contributions = [
    {
      title: "100xMobile.com — UI Revamp",
      description:
        "Complete UI overhaul of the 100xMobile website. Redesigned the entire app with a modern, polished interface and improved user experience.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      prUrl: "https://github.com/bluntbrain/100xmobile/pull/1",
    },
    {
      title: "Krane Apps — UI Revamp",
      description:
        "Full UI revamp of the Krane Apps website with a GitHub-style design. Rebuilt the interface for a cleaner, more professional look.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      prUrl: "https://github.com/bluntbrain/krane-apps-github-style-website",
    },
  ];

  const techStack = [
    { name: "Framer Motion", colorClass: "badge-framermotion" },
    { name: "Figma", colorClass: "badge-figma" },
    { name: "React", colorClass: "badge-react" },
    { name: "Next.js", colorClass: "badge-nextjs" },
    { name: "TypeScript", colorClass: "badge-typescript" },
    { name: "Bun", colorClass: "badge-bun" },
    { name: "Node.js", colorClass: "badge-nodejs" },
    { name: "Express", colorClass: "badge-express" },
    { name: "Postgres", colorClass: "badge-postgresql" },
    { name: "MongoDB", colorClass: "badge-mongodb" },
    { name: "Docker", colorClass: "badge-docker" },
    { name: "Tailwind", colorClass: "badge-tailwind" },
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

            <SectionMinimal title="Movies I'm lovin'">
              <MovieShelf />
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
              <button
                onClick={() =>
                  document
                    .getElementById("oss-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-[12px] font-medium tracking-wide px-3 py-1.5 rounded-lg border bg-(--bg-secondary) border-(--border-color) text-(--text-secondary) hover:text-(--text-primary) hover:border-(--text-muted) transition-colors duration-200 ease-out cursor-pointer focus-visible:outline-none"
              >
                Open Source
              </button>
            </div>

            <SectionMinimal title="Projects" id="projects-section">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-1">
                {projects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </SectionMinimal>

            <div className="mt-16" id="oss-section">
            <SectionMinimal title="Open Source Contributions">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-1">
                {contributions.map((contrib) => (
                  <a
                    key={contrib.title}
                    href={contrib.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-(--bg-secondary) rounded-2xl border border-(--border-color) hover:border-(--text-muted) transition-all duration-300 ease-out overflow-hidden shadow-sm hover:shadow-md flex flex-col h-full cursor-pointer"
                  >
                    <div className="w-full h-32 bg-(--bg-tertiary) border-b border-(--border-color) flex items-center justify-center">
                      <GitHubIcon />
                    </div>
                    <div className="p-6 flex flex-col grow">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-(--text-primary) tracking-tight group-hover:text-(--text-highlight) transition-colors duration-200 ease-out">
                          {contrib.title}
                        </h3>
                        <span className="text-(--text-muted) group-hover:text-(--text-primary) transition-colors duration-200 shrink-0 ml-2">
                          <ExternalLinkIcon />
                        </span>
                      </div>
                      <p className="text-(--text-secondary) text-sm leading-relaxed mb-4">
                        {contrib.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {contrib.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-medium text-(--text-secondary) bg-(--bg-tertiary) px-2 py-0.5 rounded border border-(--border-color)"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </SectionMinimal>
            </div>
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
                  href="https://github.com/Quantapar/PulseApi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium wavy-link"
                >
                  PulseAPI
                </a>
                , an API monitoring app.
                <br />
                <br />I craft interactive web experiences using{" "}
                <span className="font-medium text-(--text-primary)">
                  TypeScript
                </span>
                ,{" "}
                <span className="font-medium text-(--text-primary)">React</span>
                ,{" "}
                <span className="font-medium text-(--text-primary)">
                  Next.js
                </span>
                , and{" "}
                <span className="font-medium text-(--text-primary)">
                  PostgreSQL
                </span>
                . Driven by a passion for UI design and seamless user
                interactions.
              </p>

              <div className="inline-flex items-center flex-wrap gap-2 text-[15px]">
                <span className="text-(--text-secondary)">Get in touch:</span>
                <span className="font-medium text-(--text-primary)">
                  quantapar@gmail.com
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
                    href="mailto:quantapar@gmail.com"
                    className="group flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded-md"
                  >
                    <span className="p-1.5 rounded-md bg-(--bg-tertiary) border border-(--border-color) group-hover:border-(--text-muted) transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-active:scale-[0.97]">
                      <MailIcon />
                    </span>
                    <span>Email</span>
                  </a>
                  <a
                    href="https://x.com/quantapar"
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
                    href="https://github.com/Quantapar"
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
                    href="https://www.linkedin.com/in/manu-sharma-6012bb32a/"
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
                    href="https://discord.com/users/762906412564217857"
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
                role="Developer"
                company={
                  <span className="text-[15px] font-medium text-(--text-primary)">
                    Freelancer
                  </span>
                }
                duration="Nov 2025 — Present"
              />
              <ExperienceRow
                role="Fullstack Intern"
                company={
                  <span className="flex items-center gap-3">
                    <a
                      href="https://www.appx.co.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity duration-200 ease-out hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color) rounded-sm inline-flex items-center text-[15px]"
                      aria-label="AppX"
                    >
                      <span className="font-black tracking-tighter text-(--text-primary)">
                        App
                      </span>
                      <span className="font-black tracking-tighter text-[#FF3512]">
                        X
                      </span>
                    </a>
                    <span className="w-px h-4 bg-(--border-color)"></span>
                    <a
                      href="https://www.ycombinator.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition-opacity flex items-center"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="rounded-sm"
                      >
                        <rect width="24" height="24" fill="#F26522" rx="2" />
                        <path
                          d="M7 6L12 14L17 6H15L12 11L9 6H7Z"
                          fill="white"
                        />
                        <rect x="11" y="13" width="2" height="7" fill="white" />
                      </svg>
                    </a>
                  </span>
                }
                duration="Feb 2026 — Mar 2026"
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
