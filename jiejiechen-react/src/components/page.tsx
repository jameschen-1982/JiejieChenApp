import Image from 'next/image';
import {formatDate, getStrapiMedia} from "@/app/utils/api-helpers";
import {postRenderer} from "@/app/utils/post-renderer";

interface Page {
  id: number;
  attributes: {
    heading: string;
    description: string;
    slug: string;
    contentSections: any[];
    publishedAt: string;
  };
}

export default function PageComponent({ data }: { data: Page }) {
  const { heading, description, publishedAt } = data.attributes;
  // const imageUrl = getStrapiMedia(cover.data?.attributes.url);
  // const authorImgUrl = getStrapiMedia(authorsBio.data?.attributes.avatar.data.attributes.url);

  return (
    <article className="space-y-8 dark:bg-black dark:text-gray-50">
      {/*{imageUrl && (*/}
      {/*  <Image*/}
      {/*    src={imageUrl}*/}
      {/*    alt="article cover image"*/}
      {/*    width={400}*/}
      {/*    height={400}*/}
      {/*    className="w-full h-96 object-cover rounded-lg"*/}
      {/*  />*/}
      {/*)}*/}
      <div className="space-y-6">
        <h1 className="leading-tight text-5xl font-bold ">{heading}</h1>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
          <div className="flex items-center md:space-x-2">
            
          </div>
        </div>
      </div>

      <div className="dark:text-gray-100">
        <p>{description}</p>

        {data.attributes.contentSections.map((section: any, index: number) => postRenderer(section, index))}
      </div>
    </article>
  );
}
