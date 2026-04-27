import { useState, useEffect } from "react";
import {
  fetchBlogIndex,
  publishBlog,
  deleteBlog,
  type BlogMeta,
} from "../../lib/blogApi";
import { BlogEditor } from "./BlogEditor";

const TOKEN_KEY = "blog_admin_token";

interface BlogAdminProps {
  onNavigate: (path: string) => void;
}

type View = "list" | "new" | { type: "edit"; slug: string };

export function BlogAdmin({ onNavigate }: BlogAdminProps) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) ?? "");
  const [tokenInput, setTokenInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [blogs, setBlogs] = useState<BlogMeta[]>([]);
  const [view, setView] = useState<View>("list");
  const [publishing, setPublishing] = useState(false);
  const [publishMsg, setPublishMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [editContent, setEditContent] = useState<{ meta: BlogMeta; content: string } | null>(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (token) verifyToken(token);
  }, []);

  async function verifyToken(t: string) {
    try {
      const res = await fetch(
        "https://api.github.com/repos/Nagmani001/portfolio-new",
        { headers: { Authorization: `token ${t}`, "User-Agent": "portfolio-blog" } }
      );
      if (res.ok) {
        setAuthenticated(true);
        localStorage.setItem(TOKEN_KEY, t);
        setToken(t);
        const data = await fetchBlogIndex();
        setBlogs(data);
      } else {
        setAuthError("Token invalid or lacks repo access.");
      }
    } catch {
      setAuthError("Network error. Check your connection.");
    }
  }

  async function handleLogin() {
    setAuthError("");
    await verifyToken(tokenInput.trim());
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setAuthenticated(false);
    setView("list");
  }

  async function handlePublish(meta: BlogMeta, content: string) {
    setPublishing(true);
    setPublishMsg(null);
    try {
      await publishBlog(token, meta, content, blogs);
      setPublishMsg({ ok: true, text: "Published! Cloudflare will redeploy in ~30s." });
      const updated = await fetchBlogIndex();
      setBlogs(updated);
      setTimeout(() => {
        setView("list");
        setPublishMsg(null);
      }, 3000);
    } catch (e: any) {
      setPublishMsg({ ok: false, text: e.message ?? "Publish failed." });
    } finally {
      setPublishing(false);
    }
  }

  async function handleStartEdit(slug: string) {
    setLoadingEdit(true);
    setView({ type: "edit", slug });
    try {
      const { fetchBlogContent } = await import("../../lib/blogApi");
      const [index, content] = await Promise.all([
        fetchBlogIndex(),
        fetchBlogContent(slug),
      ]);
      const meta = index.find((b) => b.slug === slug);
      if (meta) setEditContent({ meta, content });
    } catch {
      setView("list");
    } finally {
      setLoadingEdit(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      await deleteBlog(token, slug, blogs);
      const updated = await fetchBlogIndex();
      setBlogs(updated);
    } catch (e: any) {
      alert(e.message ?? "Delete failed.");
    } finally {
      setDeleting(null);
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-sm space-y-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-(--text-primary) tracking-tight mb-1">
              Blog Admin
            </h1>
            <p className="text-[14px] text-(--text-muted)">
              Enter a GitHub personal access token with{" "}
              <code className="text-[13px] bg-(--bg-tertiary) border border-(--border-color) rounded px-1 py-0.5">
                repo
              </code>{" "}
              scope.
            </p>
          </div>
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="ghp_…"
            autoFocus
            className="w-full bg-(--bg-secondary) border border-(--border-color) rounded-xl px-4 py-3 text-[14px] font-mono text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--text-muted) transition-colors"
          />
          {authError && (
            <p className="text-[13px] text-red-500">{authError}</p>
          )}
          <button
            onClick={handleLogin}
            disabled={!tokenInput.trim()}
            className="w-full py-2.5 text-[14px] font-semibold bg-(--text-primary) text-(--bg-primary) rounded-xl hover:bg-(--text-secondary) disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Authenticate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {view !== "list" && (
            <button
              onClick={() => { setView("list"); setEditContent(null); setPublishMsg(null); }}
              className="text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors cursor-pointer"
            >
              ← Back
            </button>
          )}
          <h1 className="text-[12px] font-bold tracking-[0.16em] text-(--text-muted) uppercase">
            {view === "list" ? "Blog Admin" : view === "new" ? "New Post" : "Edit Post"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {view === "list" && (
            <button
              onClick={() => { setView("new"); setPublishMsg(null); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold bg-(--text-primary) text-(--bg-primary) rounded-lg hover:bg-(--text-secondary) transition-colors cursor-pointer"
            >
              + New post
            </button>
          )}
          <button
            onClick={logout}
            className="px-3 py-2 text-[12px] font-medium text-(--text-muted) hover:text-(--text-primary) border border-(--border-color) rounded-lg transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Status message */}
      {publishMsg && (
        <div
          className={`px-4 py-3 rounded-xl text-[13px] font-medium border ${
            publishMsg.ok
              ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400"
              : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
          }`}
        >
          {publishMsg.text}
        </div>
      )}

      {/* Views */}
      {view === "list" && (
        <div>
          {blogs.length === 0 ? (
            <div className="text-center py-16 text-(--text-muted) text-[14px]">
              No posts yet. Create your first one.
            </div>
          ) : (
            <div className="space-y-3">
              {blogs.map((blog) => (
                <div
                  key={blog.slug}
                  className="flex items-center justify-between gap-4 bg-(--bg-secondary) rounded-xl border border-(--border-color) px-5 py-4"
                >
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-(--text-primary) truncate">
                      {blog.title}
                    </p>
                    <p className="text-[12px] text-(--text-muted) font-mono">
                      {blog.slug} · {blog.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onNavigate(`/blog/${blog.slug}`)}
                      className="px-3 py-1.5 text-[12px] font-medium text-(--text-muted) hover:text-(--text-primary) border border-(--border-color) rounded-lg transition-colors cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleStartEdit(blog.slug)}
                      className="px-3 py-1.5 text-[12px] font-medium text-(--text-muted) hover:text-(--text-primary) border border-(--border-color) rounded-lg transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.slug)}
                      disabled={deleting === blog.slug}
                      className="px-3 py-1.5 text-[12px] font-medium text-red-500/70 hover:text-red-500 border border-(--border-color) rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {deleting === blog.slug ? "…" : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {view === "new" && (
        <BlogEditor
          onPublish={handlePublish}
          publishing={publishing}
        />
      )}

      {typeof view === "object" && view.type === "edit" && (
        loadingEdit ? (
          <div className="text-center py-16 text-(--text-muted) text-[14px]">Loading…</div>
        ) : editContent ? (
          <BlogEditor
            initial={editContent}
            onPublish={handlePublish}
            publishing={publishing}
          />
        ) : null
      )}
    </div>
  );
}
