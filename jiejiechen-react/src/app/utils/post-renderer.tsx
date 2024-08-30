import RichText from "@/components/rich-text";
import React from "react";
import Quote from "@/components/quote";
import Media from "@/components/media";
import VideoEmbed from "@/components/video-embed";
import ImageSlider from "@/components/image-slider";

export function postRenderer(section: any, index: number) {
  if (/rich-text/.test(section.__component)) {
    return <RichText key={index} data={section}/>;
  }
  if (/slider/.test(section.__component)) {
    return <ImageSlider key={index} data={section}/>;
  }
  if (/quote/.test(section.__component)) {
    return <Quote key={index} data={section}/>;
  }
  if (/media/.test(section.__component)) {
    return <Media key={index} data={section}/>;
  }
  if (/video-embed/.test(section.__component)) {
    return <VideoEmbed key={index} data={section}/>;
  }
  
  return null;
}
