import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchBlogIndex, fetchBlogContent, type BlogMeta } from "../../lib/blogApi";

interface BlogPostProps {
  slug: string;
  onBack: () => void;
}

export function BlogPost({ slug, onBack }: BlogPostProps) {
  const [content, setContent] = useState<string>("");
  const [meta, setMeta] = useState<BlogMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([fetchBlogIndex(), fetchBlogContent(slug)])
      .then(([index, raw]) => {
        const found = index.find((b) => b.slug === slug) ?? null;
        setMeta(found);
        setContent(raw);
        setLoading(false);
      })
      .catch(() => {
        setError("Post not found.");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-2/3 bg-(--bg-secondary) rounded-lg" />
        <div className="h-4 w-1/3 bg-(--bg-secondary) rounded" />
        <div className="h-px bg-(--border-color) my-6" />
        <div className="space-y-3">
          {[80, 95, 70, 88, 65].map((w, i) => (
            <div key={i} className={`h-4 bg-(--bg-secondary) rounded`} style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-(--text-muted) text-[15px] mb-4">{error}</p>
        <button
          onClick={onBack}
          className="text-[13px] font-medium text-(--text-primary) border border-(--border-color) rounded-lg px-4 py-2 hover:bg-(--bg-secondary) transition-colors cursor-pointer"
        >
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 slide-in-from-bottom-4">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors mb-8 cursor-pointer"
      >
        ← Back
      </button>

      {meta?.coverImage && (
        <div className="w-full rounded-2xl overflow-hidden border border-(--border-color) mb-8 bg-(--bg-tertiary)">
          <img
            src={meta.coverImage}
            alt={meta.title}
            className="w-full h-64 object-cover"
          />
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-(--text-primary) tracking-tight mb-3">
          {meta?.title ?? slug}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          {meta?.date && (
            <time className="text-[13px] text-(--text-muted)" dateTime={meta.date}>
              {new Date(meta.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {meta?.readingTime && (
            <span className="text-[13px] text-(--text-muted)">
              · {meta.readingTime} min read
            </span>
          )}
          <div className="flex flex-wrap gap-1.5">
            {meta?.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-(--text-muted) bg-(--bg-tertiary) border border-(--border-color) rounded-md px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-(--border-color) mb-8" />

      <div className="blog-prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
