import Image from "next/image";
import Link from "next/link";
import {formatDate, getStrapiMedia} from "@/app/utils/api-helpers";
import {Article} from "@/models/article";
import React from "react";


export default function PostList({
                                   data: articles,
                                   children,
                                 }: {
  data: Article[];
  children?: React.ReactNode;
}) {
  return (
    <div
      className="mx-auto mt-3 grid max-w-2xl grid-cols-1 gap-x-2 gap-y-16 border-t border-gray-200 pt-3 sm:mt-3 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {articles.map((article) => {
        const imageUrl = getStrapiMedia(
          article.attributes.cover.data?.attributes.url
        );

        const category = article.attributes.category.data?.attributes;
        const authorsBio = article.attributes.authorsBio.data?.attributes;

        const avatarUrl = getStrapiMedia(
          authorsBio?.avatar.data.attributes.url
        );
        return (<article key={article.id} className="flex max-w-xl flex-col items-start justify-between">
          <div className="flex items-center gap-x-4 text-xs">
            <time className="text-gray-500">{formatDate(article.attributes.publishedAt)}</time>
            <a href="#"
               className="rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{category?.name}</a>
          </div>
          <div className="group">
            <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
              <Link href={`/blog/${article.attributes.slug}`}>
                <span className="inset-0"></span>
                {article.attributes.title}
              </Link>
            </h3>
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{article.attributes.description}</p>
          </div>
          <div className="mt-8 flex items-center gap-x-4">
            { imageUrl && <img src={imageUrl} alt="avatar" className="h-10 w-10 rounded-full bg-gray-50"/>}
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <a href="#">
                  <span className="inset-0"></span>
                  {authorsBio?.name}
                </a>
              </p>
              <p className="text-gray-600">Author</p>
            </div>
          </div>
        </article>);
      })}
      {children && children}
    </div>
  );
}
