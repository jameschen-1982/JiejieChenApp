import type { Metadata } from 'next';
import {fetchAPI} from "@/app/utils/fetch-api";
import Post from "@/components/post";
import { notFound } from "next/navigation";
import { snapshotSlugs } from "@/app/utils/snapshot-api";

export const dynamicParams = false;

export function generateStaticParams() {
  return snapshotSlugs('articles').map((slug) => ({ slug }));
}

async function getPostBySlug(slug: string) {
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      cover: { fields: ['url'] },
      authorsBio: { populate: '*' },
      category: { fields: ['name'] },
      blocks: { populate: '*' },
    },
  };
  const response = await fetchAPI(path, urlParamsObject);
  return response;
}

async function getMetaData(slug: string) {
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: { seo: { populate: '*' } },
  };
  const response = await fetchAPI(path, urlParamsObject);
  return response.data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getMetaData(slug);
  if (!meta.length) return {};
  const metadata = meta[0].attributes.seo;

  return {
    title: metadata?.metaTitle,
    description: metadata?.metaDescription,
  };
}

export default async function PostRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);
  if (data.data.length === 0) notFound();
  return <Post data={data.data[0]} />;
}
