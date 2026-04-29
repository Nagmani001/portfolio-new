import React, { useEffect, useRef } from "react";

export const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLHeadingElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.08;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.setProperty("--x", `${smooth.current.x}px`);
        glowRef.current.style.setProperty("--y", `${smooth.current.y}px`);
      }

      raf.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf.current);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouse.current.x = e.clientX - rect.left;
    mouse.current.y = e.clientY - rect.top;
  };

  return (
    <footer className="w-full max-w-5xl mx-auto px-6 pb-10">
      <div className="mt-5 flex flex-col h-full items-center justify-end relative overflow-hidden">
        <div className="text-2xl tracking-tighter text-black/10 dark:text-white/20 select-none text-center">
          YOUR VIBECODED PORTFOLIO
        </div>
        <div className="flex flex-col items-center w-full px-4">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative inline-block"
          >
            {/* Base layer (faint, but still visible in dark mode). */}
            <h1 className="text-7xl md:text-[14rem] font-extrabold tracking-tighter text-black/10 dark:text-white/20 select-none">
              NAGMANI
            </h1>

            <h1
              ref={glowRef}
              className="absolute inset-0 text-7xl md:text-[14rem] font-extrabold tracking-tighter select-none pointer-events-none"
              style={{
                color: "transparent",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundImage: `
                radial-gradient(
                  290px circle at var(--x) var(--y),
                  rgba(255,255,255,0.9) 0%,
                  rgba(168,85,247,0.9) 0%,
                  rgba(59,130,246,0.7) 20%,
                  rgba(236,72,153,0.4) 50%,
                  transparent 80%
                )
              `,
                filter: "blur(7px)",
                opacity: 0.68,
              }}
            >
              NAGMANI
            </h1>
          </div>

          <div className="flex items-center justify-between my-4">
            <p className="text-[0.7rem] font-light tracking-widest uppercase secondary">
              Built with ♥ &amp; TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
