import type { Metadata } from 'next';
import {fetchAPI} from "@/app/utils/fetch-api";
import PageComponent from "@/components/page";
import { notFound } from "next/navigation";
import { snapshotSlugs } from "@/app/utils/snapshot-api";

export const dynamicParams = false;

export function generateStaticParams() {
  return snapshotSlugs('pages').map((slug) => ({ slug }));
}

async function getPostBySlug(slug: string) {
  const path = `/pages`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      blocks: { populate: '*' },
    },
  };
  const response = await fetchAPI(path, urlParamsObject);
  return response;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);
  if (!data.data.length) notFound();
  return <PageComponent data={data.data[0]} />;
}

