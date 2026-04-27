import { useRef, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify, estimateReadingTime, type BlogMeta } from "../../lib/blogApi";

interface BlogEditorProps {
  initial?: {
    meta: BlogMeta;
    content: string;
  };
  onPublish: (meta: BlogMeta, content: string) => Promise<void>;
  publishing: boolean;
}

type ToolbarAction = {
  label: string;
  title: string;
  before: string;
  after?: string;
  block?: boolean;
};

const TOOLBAR: ToolbarAction[] = [
  { label: "H1", title: "Heading 1", before: "# ", block: true },
  { label: "H2", title: "Heading 2", before: "## ", block: true },
  { label: "H3", title: "Heading 3", before: "### ", block: true },
  { label: "B", title: "Bold", before: "**", after: "**" },
  { label: "I", title: "Italic", before: "_", after: "_" },
  { label: "S", title: "Strikethrough", before: "~~", after: "~~" },
  { label: "`", title: "Inline code", before: "`", after: "`" },
  { label: "```", title: "Code block", before: "```\n", after: "\n```", block: true },
  { label: ">", title: "Blockquote", before: "> ", block: true },
  { label: "—", title: "Horizontal rule", before: "\n---\n", block: true },
];

interface LinkDialogState {
  type: "link" | "image" | null;
  url: string;
  text: string;
}

function insertText(
  textarea: HTMLTextAreaElement,
  before: string,
  after = "",
  block = false
): { value: string; cursorStart: number; cursorEnd: number } {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.substring(start, end);
  const prefix = block && start > 0 && textarea.value[start - 1] !== "\n" ? "\n" : "";
  const replacement = `${prefix}${before}${selected}${after}`;
  const value =
    textarea.value.substring(0, start) +
    replacement +
    textarea.value.substring(end);
  const cursorStart = start + prefix.length + before.length;
  const cursorEnd = cursorStart + selected.length;
  return { value, cursorStart, cursorEnd };
}

export function BlogEditor({ initial, onPublish, publishing }: BlogEditorProps) {
  const [title, setTitle] = useState(initial?.meta.title ?? "");
  const [slugVal, setSlugVal] = useState(initial?.meta.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.meta.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(initial?.meta.coverImage ?? "");
  const [tagsRaw, setTagsRaw] = useState(initial?.meta.tags.join(", ") ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [showPreview, setShowPreview] = useState(false);
  const [dialog, setDialog] = useState<LinkDialogState>({ type: null, url: "", text: "" });
  const [slugLocked, setSlugLocked] = useState(!!initial);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slugLocked) setSlugVal(slugify(v));
  };

  const applyAction = useCallback((action: ToolbarAction) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { value, cursorStart, cursorEnd } = insertText(
      ta,
      action.before,
      action.after ?? "",
      action.block
    );
    setContent(value);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(cursorStart, cursorEnd);
    });
  }, []);

  const openLinkDialog = (type: "link" | "image") => {
    const ta = textareaRef.current;
    const selected = ta
      ? ta.value.substring(ta.selectionStart, ta.selectionEnd)
      : "";
    setDialog({ type, url: "", text: selected });
  };

  const confirmDialog = () => {
    const ta = textareaRef.current;
    if (!ta || !dialog.type) return;
    const md =
      dialog.type === "image"
        ? `![${dialog.text || "image"}](${dialog.url})`
        : `[${dialog.text || dialog.url}](${dialog.url})`;

    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const value =
      ta.value.substring(0, start) + md + ta.value.substring(end);
    setContent(value);
    setDialog({ type: null, url: "", text: "" });
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(start + md.length, start + md.length);
    });
  };

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const ta = e.currentTarget;
    const { value, cursorStart } = insertText(ta, "  ");
    setContent(value);
    requestAnimationFrame(() => ta.setSelectionRange(cursorStart, cursorStart));
  };

  const handlePublish = async () => {
    const tags = tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const meta: BlogMeta = {
      slug: slugVal || slugify(title),
      title,
      excerpt,
      date: initial?.meta.date ?? new Date().toISOString().split("T")[0],
      tags,
      coverImage: coverImage || undefined,
      readingTime: estimateReadingTime(content),
    };
    await onPublish(meta, content);
  };

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Meta fields */}
      <div className="bg-(--bg-secondary) rounded-2xl border border-(--border-color) p-5 space-y-4">
        <div>
          <label className="text-[11px] font-bold tracking-[0.14em] text-(--text-muted) uppercase block mb-1.5">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="My Engineering Post"
            className="w-full bg-(--bg-tertiary) border border-(--border-color) rounded-lg px-3 py-2 text-[15px] text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--text-muted) transition-colors"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-[0.14em] text-(--text-muted) uppercase block mb-1.5">
            Slug
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={slugVal}
              onChange={(e) => setSlugVal(e.target.value)}
              placeholder="my-engineering-post"
              className="flex-1 bg-(--bg-tertiary) border border-(--border-color) rounded-lg px-3 py-2 text-[14px] font-mono text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--text-muted) transition-colors"
            />
            <button
              type="button"
              onClick={() => {
                setSlugLocked(!slugLocked);
                if (!slugLocked) setSlugVal(slugify(title));
              }}
              className={`px-3 py-2 text-[12px] font-medium rounded-lg border transition-colors cursor-pointer ${
                slugLocked
                  ? "bg-(--bg-tertiary) border-(--border-color) text-(--text-muted) hover:text-(--text-primary)"
                  : "bg-(--text-primary) border-(--text-primary) text-(--bg-primary)"
              }`}
            >
              {slugLocked ? "unlock" : "auto"}
            </button>
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-[0.14em] text-(--text-muted) uppercase block mb-1.5">
            Excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="One or two lines describing this post…"
            rows={2}
            className="w-full bg-(--bg-tertiary) border border-(--border-color) rounded-lg px-3 py-2 text-[14px] text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--text-muted) transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-bold tracking-[0.14em] text-(--text-muted) uppercase block mb-1.5">
              Cover image URL
            </label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://…"
              className="w-full bg-(--bg-tertiary) border border-(--border-color) rounded-lg px-3 py-2 text-[14px] text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--text-muted) transition-colors"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold tracking-[0.14em] text-(--text-muted) uppercase block mb-1.5">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsRaw}
              onChange={(e) => setTagsRaw(e.target.value)}
              placeholder="engineering, typescript, rust"
              className="w-full bg-(--bg-tertiary) border border-(--border-color) rounded-lg px-3 py-2 text-[14px] text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--text-muted) transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-(--bg-secondary) rounded-2xl border border-(--border-color) overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-(--border-color) bg-(--bg-tertiary) flex-wrap">
          {TOOLBAR.map((action) => (
            <button
              key={action.title}
              type="button"
              title={action.title}
              onClick={() => applyAction(action)}
              className="h-7 px-2 text-[12px] font-mono font-semibold text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary) rounded-md transition-colors cursor-pointer"
            >
              {action.label}
            </button>
          ))}
          <div className="w-px h-5 bg-(--border-color) mx-1" />
          <button
            type="button"
            title="Insert link"
            onClick={() => openLinkDialog("link")}
            className="h-7 px-2 text-[12px] font-medium text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary) rounded-md transition-colors cursor-pointer"
          >
            link
          </button>
          <button
            type="button"
            title="Insert image"
            onClick={() => openLinkDialog("image")}
            className="h-7 px-2 text-[12px] font-medium text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary) rounded-md transition-colors cursor-pointer"
          >
            img
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className={`h-7 px-3 text-[12px] font-medium rounded-md transition-colors cursor-pointer ${
              showPreview
                ? "bg-(--text-primary) text-(--bg-primary)"
                : "text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary)"
            }`}
          >
            {showPreview ? "edit" : "preview"}
          </button>
        </div>

        {/* Content area */}
        {showPreview ? (
          <div className="p-6 min-h-[420px] blog-prose">
            {content.trim() ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            ) : (
              <p className="text-(--text-muted) text-[14px] italic">Nothing to preview yet.</p>
            )}
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleTabKey}
            placeholder="Start writing in Markdown…"
            className="w-full min-h-[420px] bg-transparent px-5 py-4 text-[14px] font-mono leading-relaxed text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none resize-y"
            spellCheck
          />
        )}
      </div>

      {/* Publish */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-[13px] text-(--text-muted)">
          ~{estimateReadingTime(content)} min read · {content.trim().split(/\s+/).filter(Boolean).length} words
        </p>
        <button
          type="button"
          onClick={handlePublish}
          disabled={!isValid || publishing}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold bg-(--text-primary) text-(--bg-primary) rounded-xl hover:bg-(--text-secondary) disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          {publishing ? (
            <>
              <span className="inline-block w-3.5 h-3.5 border-2 border-(--bg-primary)/40 border-t-(--bg-primary) rounded-full animate-spin" />
              Publishing…
            </>
          ) : (
            "Publish"
          )}
        </button>
      </div>

      {/* Link/image dialog */}
      {dialog.type && (
        <div
          className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setDialog({ type: null, url: "", text: "" })}
        >
          <div
            className="w-full max-w-sm bg-(--bg-secondary) rounded-2xl border border-(--border-color) p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-[15px] font-semibold text-(--text-primary)">
              Insert {dialog.type}
            </h3>
            <div className="space-y-3">
              <input
                autoFocus
                type="text"
                placeholder="https://…"
                value={dialog.url}
                onChange={(e) => setDialog((d) => ({ ...d, url: e.target.value }))}
                className="w-full bg-(--bg-tertiary) border border-(--border-color) rounded-lg px-3 py-2 text-[14px] text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--text-muted) transition-colors"
              />
              <input
                type="text"
                placeholder={dialog.type === "image" ? "Alt text" : "Link text"}
                value={dialog.text}
                onChange={(e) => setDialog((d) => ({ ...d, text: e.target.value }))}
                className="w-full bg-(--bg-tertiary) border border-(--border-color) rounded-lg px-3 py-2 text-[14px] text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-(--text-muted) transition-colors"
                onKeyDown={(e) => e.key === "Enter" && confirmDialog()}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setDialog({ type: null, url: "", text: "" })}
                className="px-4 py-2 text-[13px] font-medium text-(--text-muted) hover:text-(--text-primary) border border-(--border-color) rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDialog}
                disabled={!dialog.url}
                className="px-4 py-2 text-[13px] font-semibold bg-(--text-primary) text-(--bg-primary) rounded-lg hover:bg-(--text-secondary) disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
