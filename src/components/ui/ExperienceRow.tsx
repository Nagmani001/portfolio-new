import React from "react";

type DateInput = string | null; // "YYYY-MM" or null = present

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const parseYM = (value: string): { year: number; month: number } => {
  const [y, m] = value.split("-").map(Number);
  return { year: y ?? 0, month: (m ?? 1) - 1 }; // month 0-indexed
};

const formatYM = (value: DateInput): string => {
  if (value === null) return "Present";
  const { year, month } = parseYM(value);
  return `${MONTHS[month]} ${year}`;
};

// LinkedIn-style inclusive duration: counts start month through end month.
const formatDuration = (start: string, end: DateInput): string => {
  const s = parseYM(start);
  const now = new Date();
  const e = end === null
    ? { year: now.getFullYear(), month: now.getMonth() }
    : parseYM(end);

  let totalMonths = (e.year - s.year) * 12 + (e.month - s.month) + 1;
  if (totalMonths < 1) totalMonths = 1;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
};

export const ExperienceRow = ({
  role,
  company,
  companyUrl,
  type,
  startDate,
  endDate = null,
  location,
  logo,
}: {
  role: string;
  company: string;
  companyUrl?: string;
  type?: string;
  startDate: string; // "YYYY-MM"
  endDate?: DateInput; // "YYYY-MM" or null = present
  location?: string;
  logo: React.ReactNode;
}) => {
  const dateRange = `${formatYM(startDate)} - ${formatYM(endDate)}`;
  const duration = formatDuration(startDate, endDate);

  const companyLine = [company, type].filter(Boolean).join(" · ");

  const inner = (
    <>
      <div className="shrink-0 pt-0.5">{logo}</div>

      <div className="flex flex-col min-w-0">
        <div className="font-semibold text-(--text-primary) leading-snug">
          {role}
        </div>

        <div className="text-sm text-(--text-secondary) leading-snug">
          {companyLine}
        </div>

        <div className="text-xs text-(--text-muted) font-mono mt-1">
          {dateRange} · {duration}
        </div>

        {location && (
          <div className="text-xs text-(--text-muted) mt-0.5">{location}</div>
        )}
      </div>
    </>
  );

  const className =
    "group flex gap-4 pl-1 transition-opacity duration-200 ease-out rounded-lg";

  if (companyUrl) {
    return (
      <a
        href={companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color)`}
        aria-label={`${role} at ${company}`}
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
};
