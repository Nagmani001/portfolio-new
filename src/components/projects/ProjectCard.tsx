import React, { useEffect, useState } from "react";
import { LayersIcon, GitHubIcon, ExternalLinkIcon } from "../Icons";

export const ProjectCard = ({
  id,
  title,
  description,
  tech,
  githubUrl,
  liveUrl,
  image,
  video,
  youtubeId,
}: {
  id: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  video?: string;
  youtubeId?: string;
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const targetUrl = liveUrl || githubUrl || "#";
  const hasTarget = targetUrl !== "#";

  const openProject = () => {
    if (!hasTarget) return;
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const Content = (
    <div
      className={`group relative bg-(--bg-secondary) rounded-2xl border border-(--border-color) hover:border-(--text-muted) transition-all duration-300 ease-out overflow-hidden shadow-sm hover:shadow-md flex flex-col h-full min-h-[32rem] ${hasTarget ? "cursor-pointer" : "cursor-default"}`}
      onClick={openProject}
      onKeyDown={(e) => {
        if (!hasTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProject();
        }
      }}
      role={hasTarget ? "link" : undefined}
      tabIndex={hasTarget ? 0 : -1}
    >
    {(youtubeId || video || image) && (
      <div className="w-full h-60 bg-(--bg-tertiary) border-b border-(--border-color) overflow-hidden relative">
        {youtubeId ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoOpen(true);
            }}
            className="absolute inset-0 w-full h-full cursor-zoom-in"
            title={`Open ${title} video`}
          >
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
              className="absolute inset-0 w-full h-full pointer-events-none"
              allow="autoplay"
              title={title}
            />
          </button>
        ) : video ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoOpen(true);
            }}
            className="absolute inset-0 w-full h-full cursor-zoom-in"
            title={`Open ${title} video`}
          >
            <video
              src={video}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          </button>
        ) : image ? (
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          />
        ) : (
          <div className="text-(--text-muted) opacity-50">
            <LayersIcon />
          </div>
        )}
      </div>
    )}

    <div className="p-7 flex flex-col grow">
      <div className="flex items-start justify-between mb-4 gap-4">
        <h3 className="text-xl font-semibold text-(--text-primary) tracking-tight group-hover:text-(--text-highlight) transition-colors duration-200 ease-out">
          {title}
        </h3>
      </div>

      <p className="text-(--text-secondary) text-[16px] leading-relaxed mb-8 min-h-[96px]">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {tech.map((t) => (
          <span
            key={t}
            className="text-[12px] font-medium text-(--text-secondary) bg-(--bg-tertiary) px-3 py-1 rounded border border-(--border-color)"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-(--border-color) bg-(--text-primary) text-(--bg-primary) px-3 py-2 text-[13px] font-semibold hover:bg-(--text-secondary) transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--text-muted)"
          >
            View Live <ExternalLinkIcon />
          </a>
        ) : (
          <div />
        )}
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-(--border-color) bg-(--bg-tertiary) text-(--text-primary) px-3 py-2 text-[13px] font-semibold hover:bg-(--border-color) transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color)"
          >
            <GitHubIcon /> View Code
          </a>
        ) : (
          <div />
        )}
      </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="h-full">{Content}</div>
      {isVideoOpen && (youtubeId || video) && (
        <div
          className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-11 right-0 inline-flex items-center gap-2 rounded-md border border-white/25 bg-black/40 px-3 py-1.5 text-sm font-medium text-white hover:bg-black/55 transition-colors"
            >
              Close
            </button>
            {youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                className="w-full aspect-video rounded-xl border border-white/15 bg-black"
                allow="autoplay; fullscreen"
                allowFullScreen
                title={title}
              />
            ) : (
              <video
                className="w-full max-h-[82vh] rounded-xl border border-white/15 bg-black"
                src={video}
                autoPlay
                loop
                controls
                playsInline
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
