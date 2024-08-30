import type { Metadata } from 'next';
import {fetchAPI} from "@/app/utils/fetch-api";
import PageComponent from "@/components/page";

async function getPostBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/pages`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      blocks: { populate: '*' },
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/pages`;
  const urlParamsObject = {
    filters: { slug }
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}
//
// export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
//   const meta = await getMetaData(params.slug);
//   const metadata = meta[0].attributes.seo;
//
//   return {
//     title: metadata?.metaTitle,
//     description: metadata?.metaDescription,
//   };
// }

export default async function PostRoute({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await getPostBySlug(slug);
  if (!data && data.data.length === 0) return <h2>no post found</h2>;
  return <PageComponent data={data.data[0]} />;
}

