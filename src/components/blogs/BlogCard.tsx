import type { BlogMeta } from "../../lib/blogApi";

interface BlogCardProps {
  blog: BlogMeta;
  onClick: (slug: string) => void;
}

export function BlogCard({ blog, onClick }: BlogCardProps) {
  return (
    <article
      onClick={() => onClick(blog.slug)}
      className="group relative w-full bg-(--bg-secondary) rounded-2xl border border-(--border-color) hover:border-(--text-muted) transition-all duration-300 ease-out p-6 cursor-pointer shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--text-muted)"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(blog.slug);
        }
      }}
    >
      {blog.coverImage && (
        <div className="w-full h-40 rounded-xl overflow-hidden mb-4 bg-(--bg-tertiary) border border-(--border-color)">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-[17px] font-semibold text-(--text-primary) tracking-tight leading-snug group-hover:text-(--text-secondary) transition-colors">
          {blog.title}
        </h3>
        {blog.readingTime && (
          <span className="shrink-0 text-[11px] font-medium text-(--text-muted) border border-(--border-color) rounded-md px-2 py-0.5 whitespace-nowrap">
            {blog.readingTime} min
          </span>
        )}
      </div>
      {blog.excerpt && (
        <p className="text-[14px] text-(--text-secondary) leading-relaxed line-clamp-2 mb-4">
          {blog.excerpt}
        </p>
      )}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex flex-wrap gap-1.5">
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-(--text-muted) bg-(--bg-tertiary) border border-(--border-color) rounded-md px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        <time className="text-[12px] text-(--text-muted)" dateTime={blog.date}>
          {new Date(blog.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </div>
    </article>
  );
}
