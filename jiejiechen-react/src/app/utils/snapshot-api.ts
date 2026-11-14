import snapshot from "@/content/snapshot.json";

type Entry = {
  id: number;
  // Strapi's dynamic zones have different schemas per content type.
  attributes: any;
};

type Query = {
  filters?: { slug?: string; category?: { name?: string } };
  sort?: { createdAt?: string };
  pagination?: { start?: number; limit?: number };
};

export function snapshotSlugs(collection: "articles" | "pages") {
  if (!snapshot.articles.length) {
    throw new Error("Export a nonempty content snapshot before building the static site.");
  }
  return (snapshot[collection] as Entry[]).map((entry) => entry.attributes.slug);
}

export function fetchSnapshot(path: string, params: Query = {}) {
  if (!snapshot.articles.length) {
    throw new Error("Content snapshot is empty. Export and validate CMS content before building the static site.");
  }

  if (path !== "/articles" && path !== "/pages") {
    throw new Error(`Unsupported snapshot content endpoint: ${path}`);
  }

  let entries = (path === "/articles" ? snapshot.articles : snapshot.pages) as Entry[];
  if (params.filters?.slug) {
    entries = entries.filter((entry) => entry.attributes.slug === params.filters?.slug);
  }
  if (params.filters?.category?.name) {
    entries = entries.filter((entry) => entry.attributes.category?.data?.attributes?.name === params.filters?.category?.name);
  }
  if (params.sort?.createdAt) {
    const direction = params.sort.createdAt.toLowerCase() === "desc" ? -1 : 1;
    entries = [...entries].sort((a, b) => direction * (Date.parse(a.attributes.createdAt || "") - Date.parse(b.attributes.createdAt || "")));
  }

  const total = entries.length;
  const start = params.pagination?.start ?? 0;
  const limit = params.pagination?.limit ?? total;
  return {
    data: entries.slice(start, start + limit),
    meta: { pagination: { start, limit, total } },
  };
}
