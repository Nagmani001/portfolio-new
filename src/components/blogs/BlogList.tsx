import { useState, useEffect } from "react";
import { fetchBlogIndex, type BlogMeta } from "../../lib/blogApi";
import { BlogCard } from "./BlogCard";

interface BlogListProps {
  onNavigate: (path: string) => void;
}

export function BlogList({ onNavigate }: BlogListProps) {
  const [blogs, setBlogs] = useState<BlogMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogIndex().then((data) => {
      setBlogs(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-1">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="w-full h-36 bg-(--bg-secondary) rounded-2xl border border-(--border-color) animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="pl-1">
        <p className="text-(--text-secondary) text-[15px] leading-relaxed">
          Long-form engineering writeups are coming soon. For now, I share notes
          and updates on{" "}
          <a
            href="https://x.com/nagmani_twt"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium wavy-link"
          >
            X
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-1">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.slug}
          blog={blog}
          onClick={(slug) => onNavigate(`/blog/${slug}`)}
        />
      ))}
    </div>
  );
}
