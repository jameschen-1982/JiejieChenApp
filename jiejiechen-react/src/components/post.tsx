import Image from 'next/image';
import {formatDate, getStrapiMedia} from "@/app/utils/api-helpers";
import {postRenderer} from "@/app/utils/post-renderer";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    blocks: any[];
    publishedAt: string;
  };
}

export default function Post({ data }: { data: Article }) {
  const { title, description, publishedAt, cover, authorsBio } = data.attributes;
  const author = authorsBio.data?.attributes;
  const imageUrl = getStrapiMedia(cover.data?.attributes.url);
  const authorImgUrl = getStrapiMedia(authorsBio.data?.attributes.avatar.data.attributes.url);

  return (
    <article className="space-y-8">
      <div className="space-y-6">
        <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center">
          <div className="flex items-center md:space-x-2">
            {authorImgUrl && (
              <Image
                src={authorImgUrl}
                alt="article cover image"
                width={400}
                height={400}
                className="w-14 h-14 border rounded-full"
              />
            )}
            <p className="text-md">
              {author && author.name} • {formatDate(publishedAt)}
            </p>
          </div>
        </div>
      </div>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="article cover image"
          width={400}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
      )}
      <div>
        <p>{description}</p>

        {data.attributes.blocks.map((section: any, index: number) => postRenderer(section, index))}
      </div>
    </article>
  );
}
