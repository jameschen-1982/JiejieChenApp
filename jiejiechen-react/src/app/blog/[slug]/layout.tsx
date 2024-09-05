import { fetchAPI } from "@/app/utils/fetch-api";
import React from "react";

async function fetchSideMenuData(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const categoriesResponse = await fetchAPI(
      "/categories",
      { populate: "*" },
      options
    );

    const articlesResponse = await fetchAPI(
      "/articles",
      filter
        ? {
          filters: {
            category: {
              name: filter,
            },
          },
        }
        : {},
      options
    );

    return {
      articles: articlesResponse.data,
      categories: categoriesResponse.data,
    };
  } catch (error) {
    console.error(error);
  }
}

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    articles: {
      data: Array<{}>;
    };
  };
}

interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

interface Data {
  articles: Article[];
  categories: Category[];
}

export default async function LayoutRoute({
                                            params,
                                            children,
                                          }: {
  children: React.ReactNode;
  params: {
    slug: string;
    category: string;
  };
}) {
  const { category } = params;
  const { categories, articles } = (await fetchSideMenuData(category)) as Data;

  return (
    <section className="mx-auto flex lg:min-h-[calc(100vh-170px)] max-w-7xl justify-between p-6 lg:px-8">
      <div className="flex-grow">
        <div>{children}</div>
      </div>
    </section>
  );
}
//
// export async function generateStaticParams() {
//   const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
//   const path = `/articles`;
//   const options = { headers: { Authorization: `Bearer ${token}` } };
//   const articleResponse = await fetchAPI(
//     path,
//     {
//     },
//     options
//   );
//
//   return articleResponse.data.map(
//     (article: {
//       attributes: {
//         slug: string;
//       };
//     }) => ({ slug: article.attributes.slug })
//   );
// }
