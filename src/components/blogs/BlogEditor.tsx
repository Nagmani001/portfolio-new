import { useRef, useState, useEffect } from "react";
import { slugify, estimateReadingTime, type BlogMeta } from "../../lib/blogApi";

interface BlogEditorProps {
  initial?: {
    meta: BlogMeta;
    content: string;
  };
  onPublish: (meta: BlogMeta, content: string) => Promise<void>;
  publishing: boolean;
}

interface LinkDialogState {
  type: "link" | "image" | null;
  url: string;
  text: string;
}

export function BlogEditor({ initial, onPublish, publishing }: BlogEditorProps) {
  const [title, setTitle] = useState(initial?.meta.title ?? "");
  const [slugVal, setSlugVal] = useState(initial?.meta.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.meta.excerpt ?? "");
  const [coverImage, setCoverImage] = useState(initial?.meta.coverImage ?? "");
  const [tagsRaw, setTagsRaw] = useState(initial?.meta.tags.join(", ") ?? "");
  const [htmlContent, setHtmlContent] = useState(markdownToHtml(initial?.content ?? ""));
  const [dialog, setDialog] = useState<LinkDialogState>({ type: null, url: "", text: "" });
  const [slugLocked, setSlugLocked] = useState(!!initial);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    strikeThrough: false,
    insertUnorderedList: false,
    insertOrderedList: false,
  });

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== htmlContent) {
      editorRef.current.innerHTML = htmlContent;
    }
  }, [htmlContent]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!slugLocked) setSlugVal(slugify(v));
  };

  const runCommand = (command: string, value?: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
    setHtmlContent(editorRef.current.innerHTML);
    syncFormatState();
  };

  const syncFormatState = () => {
    if (!editorRef.current) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      setActiveFormats({
        bold: false,
        italic: false,
        strikeThrough: false,
        insertUnorderedList: false,
        insertOrderedList: false,
      });
      return;
    }

    const anchor = selection.anchorNode;
    if (anchor && !editorRef.current.contains(anchor)) {
      return;
    }

    setActiveFormats({
      bold: !!document.queryCommandState("bold"),
      italic: !!document.queryCommandState("italic"),
      strikeThrough: !!document.queryCommandState("strikeThrough"),
      insertUnorderedList: !!document.queryCommandState("insertUnorderedList"),
      insertOrderedList: !!document.queryCommandState("insertOrderedList"),
    });
  };

  useEffect(() => {
    const handleSelectionChange = () => syncFormatState();
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  const toolbarButtonClass = (active = false) =>
    `h-7 px-2 text-[12px] font-semibold rounded-md transition-colors cursor-pointer ${
      active
        ? "bg-(--text-primary) text-(--bg-primary)"
        : "text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary)"
    }`;

  const openLinkDialog = (type: "link" | "image") => {
    const selected = window.getSelection?.()?.toString() ?? "";
    setDialog({ type, url: "", text: selected });
  };

  const confirmDialog = () => {
    if (!editorRef.current || !dialog.type || !dialog.url) return;
    editorRef.current.focus();
    if (dialog.type === "image") {
      const alt = dialog.text || "image";
      document.execCommand("insertImage", false, dialog.url);
      const inserted = editorRef.current.querySelector(`img[src="${dialog.url}"]`);
      if (inserted) inserted.setAttribute("alt", alt);
    } else {
      const selected = window.getSelection?.()?.toString().trim();
      if (selected) {
        document.execCommand("createLink", false, dialog.url);
      } else {
        const text = dialog.text || dialog.url;
        document.execCommand("insertHTML", false, `<a href="${dialog.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a>`);
      }
    }
    setHtmlContent(editorRef.current.innerHTML);
    setDialog({ type: null, url: "", text: "" });
  };

  const handlePublish = async () => {
    const markdown = htmlToMarkdown(htmlContent);
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
      readingTime: estimateReadingTime(markdown),
    };
    await onPublish(meta, markdown);
  };

  const isValid = title.trim().length > 0 && stripHtml(htmlContent).trim().length > 0;
  const wordCount = stripHtml(htmlContent).trim().split(/\s+/).filter(Boolean).length;

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

      {/* Rich text editor */}
      <div
        className={
          isFullscreen
            ? "fixed inset-0 z-[180] p-4 sm:p-6 md:p-8 bg-(--bg-primary)"
            : ""
        }
      >
        <div
          className={`bg-(--bg-secondary) rounded-2xl border border-(--border-color) overflow-hidden ${
            isFullscreen ? "h-full flex flex-col max-w-6xl mx-auto" : ""
          }`}
        >
        <div className="flex items-center gap-1 px-3 py-2 border-b border-(--border-color) bg-(--bg-tertiary) flex-wrap">
          <button type="button" title="Heading 1" onClick={() => runCommand("formatBlock", "<h1>")} className={toolbarButtonClass()}>H1</button>
          <button type="button" title="Heading 2" onClick={() => runCommand("formatBlock", "<h2>")} className={toolbarButtonClass()}>H2</button>
          <button type="button" title="Heading 3" onClick={() => runCommand("formatBlock", "<h3>")} className={toolbarButtonClass()}>H3</button>
          <button type="button" title="Bold" onClick={() => runCommand("bold")} className={toolbarButtonClass(activeFormats.bold)}>B</button>
          <button type="button" title="Italic" onClick={() => runCommand("italic")} className={toolbarButtonClass(activeFormats.italic)}>I</button>
          <button type="button" title="Strikethrough" onClick={() => runCommand("strikeThrough")} className={toolbarButtonClass(activeFormats.strikeThrough)}>S</button>
          <button type="button" title="Bullet list" onClick={() => runCommand("insertUnorderedList")} className={toolbarButtonClass(activeFormats.insertUnorderedList)}>• List</button>
          <button type="button" title="Numbered list" onClick={() => runCommand("insertOrderedList")} className={toolbarButtonClass(activeFormats.insertOrderedList)}>1. List</button>
          <button type="button" title="Quote" onClick={() => runCommand("formatBlock", "<blockquote>")} className={toolbarButtonClass()}>Quote</button>
          <button type="button" title="Code block" onClick={() => runCommand("formatBlock", "<pre>")} className={toolbarButtonClass()}>Code</button>
          <button type="button" title="Horizontal rule" onClick={() => runCommand("insertHorizontalRule")} className={toolbarButtonClass()}>—</button>
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
            title={isFullscreen ? "Exit fullscreen (Esc)" : "Enter fullscreen"}
            onClick={() => setIsFullscreen((v) => !v)}
            className="h-7 px-3 text-[12px] font-medium text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary) rounded-md transition-colors cursor-pointer"
          >
            {isFullscreen ? "exit full" : "full screen"}
          </button>
        </div>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setHtmlContent((e.target as HTMLDivElement).innerHTML)}
          className={`w-full bg-transparent px-5 py-4 text-[16px] leading-relaxed text-(--text-primary) focus:outline-none blog-prose ${
            isFullscreen ? "flex-1 min-h-0 overflow-y-auto" : "min-h-[420px]"
          }`}
          style={{ whiteSpace: "pre-wrap" }}
        />
        </div>
      </div>

      {/* Publish */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-[13px] text-(--text-muted)">
          ~{estimateReadingTime(htmlToMarkdown(htmlContent))} min read · {wordCount} words
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

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function markdownToHtml(markdown: string): string {
  if (!markdown.trim()) return "<p></p>";
  let html = markdown
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/^> (.*)$/gm, "<blockquote>$1</blockquote>")
    .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.*?)_/g, "<em>$1</em>")
    .replace(/~~(.*?)~~/g, "<s>$1</s>")
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  const blocks = html
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (/^<h\d|^<blockquote|^<pre|^<img|^<ul|^<ol|^<hr/.test(block)) return block;
      return `<p>${block.replace(/\n/g, "<br/>")}</p>`;
    });

  return blocks.join("");
}

function htmlToMarkdown(html: string): string {
  let md = html;
  md = md.replace(/<br\s*\/?>/gi, "\n");
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n");
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n");
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n");
  md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, "> $1\n\n");
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**");
  md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**");
  md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, "_$1_");
  md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, "_$1_");
  md = md.replace(/<s[^>]*>(.*?)<\/s>/gi, "~~$1~~");
  md = md.replace(/<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)");
  md = md.replace(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)\n\n");
  md = md.replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]+)"[^>]*\/?>/gi, "![$1]($2)\n\n");
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, "```\n$1\n```\n\n");
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n");
  md = md.replace(/<\/?(ul|ol)[^>]*>/gi, "\n");
  md = md.replace(/<hr[^>]*\/?>/gi, "\n---\n");
  md = md.replace(/<\/p>/gi, "\n\n");
  md = md.replace(/<p[^>]*>/gi, "");
  md = md.replace(/<[^>]+>/g, "");
  md = md.replace(/&nbsp;/g, " ");
  md = md.replace(/&amp;/g, "&");
  md = md.replace(/&lt;/g, "<");
  md = md.replace(/&gt;/g, ">");
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#039;/g, "'");
  return md.replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
