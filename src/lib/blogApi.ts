const REPO = "Nagmani001/portfolio-new";
const BRANCH = "master";
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/src/blogs`;
const API_BASE = `https://api.github.com/repos/${REPO}/contents/src/blogs`;

export interface BlogMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  coverImage?: string;
  readingTime?: number;
}

function toBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

async function getFileSha(path: string, token: string): Promise<string | undefined> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${path}`, {
    headers: { Authorization: `token ${token}`, "User-Agent": "portfolio-blog" },
  });
  if (!res.ok) return undefined;
  const data = await res.json();
  return data.sha;
}

export async function fetchBlogIndex(): Promise<BlogMeta[]> {
  try {
    const res = await fetch(`${RAW_BASE}/index.json?t=${Date.now()}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchBlogContent(slug: string): Promise<string> {
  const res = await fetch(`${RAW_BASE}/${slug}.md?t=${Date.now()}`);
  if (!res.ok) throw new Error("Blog not found");
  return res.text();
}

export async function publishBlog(
  token: string,
  meta: BlogMeta,
  content: string,
  existingIndex: BlogMeta[]
): Promise<void> {
  const mdPath = `src/blogs/${meta.slug}.md`;
  const mdSha = await getFileSha(mdPath, token);

  const mdRes = await fetch(`${API_BASE}/${meta.slug}.md`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-blog",
    },
    body: JSON.stringify({
      message: `blog: ${mdSha ? "update" : "add"} "${meta.title}"`,
      content: toBase64(content),
      ...(mdSha && { sha: mdSha }),
    }),
  });

  if (!mdRes.ok) {
    const err = await mdRes.json();
    throw new Error(err.message || "Failed to save blog post");
  }

  const newIndex = [meta, ...existingIndex.filter((b) => b.slug !== meta.slug)];
  const indexSha = await getFileSha("src/blogs/index.json", token);

  const indexRes = await fetch(`${API_BASE}/index.json`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-blog",
    },
    body: JSON.stringify({
      message: `blog: update index for "${meta.title}"`,
      content: toBase64(JSON.stringify(newIndex, null, 2)),
      ...(indexSha && { sha: indexSha }),
    }),
  });

  if (!indexRes.ok) {
    const err = await indexRes.json();
    throw new Error(err.message || "Failed to update blog index");
  }
}

export async function deleteBlog(
  token: string,
  slug: string,
  existingIndex: BlogMeta[]
): Promise<void> {
  const mdSha = await getFileSha(`src/blogs/${slug}.md`, token);
  if (!mdSha) throw new Error("Blog not found");

  const delRes = await fetch(`${API_BASE}/${slug}.md`, {
    method: "DELETE",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-blog",
    },
    body: JSON.stringify({
      message: `blog: delete "${slug}"`,
      sha: mdSha,
    }),
  });

  if (!delRes.ok) throw new Error("Failed to delete blog post");

  const newIndex = existingIndex.filter((b) => b.slug !== slug);
  const indexSha = await getFileSha("src/blogs/index.json", token);

  await fetch(`${API_BASE}/index.json`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-blog",
    },
    body: JSON.stringify({
      message: `blog: remove "${slug}" from index`,
      content: toBase64(JSON.stringify(newIndex, null, 2)),
      ...(indexSha && { sha: indexSha }),
    }),
  });
}

export function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
