import type { BlogMeta } from "../../lib/blogApi";

interface BlogCardProps {
  blog: BlogMeta;
  onClick: (slug: string) => void;
}

export function BlogCard({ blog, onClick }: BlogCardProps) {
  return (
    <article
      onClick={() => onClick(blog.slug)}
      className="group relative w-full bg-(--bg-secondary)/65 rounded-2xl border border-(--border-color) hover:border-(--border-color) transition-all duration-300 ease-out p-4 sm:p-5 cursor-pointer shadow-[0_1px_0_rgba(0,0,0,0.02)] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--border-color)"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(blog.slug);
        }
      }}
    >
      <div className="flex items-center gap-4 sm:gap-5">
        {blog.coverImage && (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-(--bg-tertiary) border border-(--border-color) shrink-0">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-[21px] font-semibold text-(--text-primary) tracking-tight leading-tight group-hover:text-(--text-primary) transition-colors truncate">
            {blog.title}
          </h3>
          {blog.excerpt && (
            <p className="mt-1 text-[14px] text-(--text-secondary) leading-relaxed line-clamp-2">
              {blog.excerpt}
            </p>
          )}
        </div>
        <div className="hidden sm:flex shrink-0 flex-col items-end text-right gap-1">
          {blog.readingTime && (
            <span className="text-[26px] font-semibold text-(--text-primary) leading-none">
              {blog.readingTime} min
            </span>
          )}
          <time className="text-[14px] text-(--text-muted)" dateTime={blog.date}>
            {new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>
      </div>
    </article>
  );
}
