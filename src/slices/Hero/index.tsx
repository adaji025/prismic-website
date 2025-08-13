import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Bounded } from "@/app/components/bounded";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <div className="absolute inset-0 scale-125">
        <PrismicNextImage
          field={slice.primary.image}
          alt=""
          priority
          fill
          className="object-cover"
        />
      </div>
      <div className="flex">
        <div className="max-w-xl leading-tight text-neutral-50 md:text-7xl lg:text-8xl">
          <PrismicRichText field={slice.primary.heading} />
        </div>
        <PrismicRichText field={slice.primary.body} />
        {slice.primary.button.map((link) => (
          <PrismicNextLink
            key={link.key}
            field={link}
            className={link.variant}
          />
        ))}
      </div>
    </Bounded>
  );
};

export default Hero;
