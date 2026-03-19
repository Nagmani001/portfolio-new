import React from "react";
import { SectionMinimal } from "../ui/SectionMinimal";

export const AboutSection = () => (
  <SectionMinimal title="About Me" id="about-section">
    <div className="flex flex-col md:flex-row gap-8 items-start pl-1">
      <div className="relative group w-32 h-32 shrink-0 overflow-hidden rounded-xl border border-(--border-color) hover:border-(--text-muted) transition-colors duration-200 ease-out shadow-sm hover:shadow-md bg-(--bg-tertiary)">
        <img
          src="/me-color.jpeg"
          alt="Manu Sharma Color"
          width={128}
          height={128}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-10"
        />
        <img
          src="/me-bw.jpeg"
          alt="Manu Sharma B&W"
          width={128}
          height={128}
          className="w-full h-full object-cover transition-transform duration-300 ease-out scale-100 group-hover:scale-[1.03]"
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-(--text-primary) mb-1">
          Manu Sharma
        </h3>
        <div className="flex items-center gap-1.5 text-[13px] text-(--text-highlight) font-medium mb-4">
          <span>20</span>
          <span className="opacity-40">•</span>
          <div className="h-4.5 overflow-hidden inline-flex flex-col relative top-[0.5px]">
            <div className="animate-flip leading-4.5">
              <span className="block h-4.5">Fullstack Engineer</span>
              <span className="block h-4.5">Freelancer</span>
              <span className="block h-4.5">Fullstack Engineer</span>
            </div>
          </div>
        </div>
        <p className="text-(--text-secondary) text-[15px] leading-relaxed mb-4 max-w-lg">
          I'm a Full Stack web developer. I love building products to solve
          real-world problems and creates MVPs efficiently.
        </p>
      </div>
    </div>
  </SectionMinimal>
);
