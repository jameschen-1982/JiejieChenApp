import type { Metadata } from 'next';
import {fetchAPI} from "@/app/utils/fetch-api";
import Post from "@/components/post";

export const dynamic = 'force-static';
export const revalidate = 60;

async function getPostBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
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
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: { seo: { populate: '*' } },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const meta = await getMetaData(params.slug);
  const metadata = meta[0].attributes.seo;

  return {
    title: metadata?.metaTitle,
    description: metadata?.metaDescription,
  };
}

export default async function PostRoute({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await getPostBySlug(slug);
  if (data.data.length === 0) return <h2>no post found</h2>;
  return <Post data={data.data[0]} />;
}
