import React from "react";

export const SectionMinimal = ({
  children,
  title,
  id,
  divider = "subtle",
}: {
  children: React.ReactNode;
  title: string;
  id?: string;
  divider?: "subtle" | "medium" | "strong";
}) => (
  <section id={id} className={`section-division section-division--${divider} py-2`}>
    <h2 className="text-[12px] font-bold tracking-[0.16em] text-(--text-muted) uppercase mb-6 pl-1 transition-colors duration-200 ease-out">
      {title}
    </h2>
    {children}
  </section>
);
