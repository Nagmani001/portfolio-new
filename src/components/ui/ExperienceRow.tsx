import React from "react";

export const ExperienceRow = ({
  role,
  company,
  duration,
  description,
}: {
  role: string;
  company: React.ReactNode;
  duration: string;
  description?: string;
}) => (
  <div className="group pl-1">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="font-medium text-(--text-primary)">
          {company}
        </div>
        <div className="inline-flex mb-2 items-center justify-center px-3 py-1 rounded-lg border font-medium relative overflow-hidden after:absolute after:content-[''] after:inset-0 after:[box-shadow:0_0_15px_-1px_#ffffff90_inset] after:rounded-lg before:absolute before:content-[''] before:inset-0 before:rounded-[8px] before:z-20 after:z-10 text-white transition-all duration-300 ease-out whitespace-nowrap text-xs [box-shadow:0_0_100px_-10px_#f16b21] before:[box-shadow:0_0_4px_-1px_#fff_inset] bg-[#f16b21] border-[#f8d4b3]/80">
          <span className="relative z-30">{role}</span>
        </div>
      </div>
      <div className="text-xs text-(--text-muted) font-mono mt-1 sm:mt-0 opacity-60 transition-colors hover:opacity-100 hover:text-(--text-primary) cursor-default">
        {duration}
      </div>
    </div>
    {description && (
      <p className="text-sm text-(--text-secondary) leading-relaxed max-w-2xl transition-colors duration-200 ease-out">
        {description}
      </p>
    )}
  </div>
);
