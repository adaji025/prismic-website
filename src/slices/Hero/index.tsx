import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";

import { Bounded } from "@/components/bounded";
import FadeIn from "@/components/fade-in";
import RevealText from "@/components/reveal-text";
import ButtonLink from "@/components/button-link";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-screen overflow-hidden bg-neutral-950"
    >
      <FadeIn
        vars={{ scale: 1, opacity: 0.5 }}
        className="absolute inset-0 opacity-0 motion-safe:scale-125"
      >
        <PrismicNextImage
          field={slice.primary.image}
          alt=""
          priority
          fill
          className="object-cover motion-reduce:opacity-50"
        />
      </FadeIn>
      <div className="relative flex h-dvh flex-col justify-center">
        <RevealText
          field={slice.primary.heading}
          id="hero-heading"
          className="font-display max-w-xl leading-none text-neutral-50 md:text-7xl lg:text-8xl"
          staggerAmount={0.2}
          duration={1.7}
          as="h1"
        />
        <FadeIn
          vars={{ delay: 1, duration: 1.3 }}
          className="mt-6 max-w-md translate-y-8 text-lg text-neutral-100"
        >
          <PrismicRichText field={slice.primary.body} />
        </FadeIn>
        <FadeIn
          className="mt-8 translate-y-5"
          vars={{ delay: 1.7, duration: 1.1 }}
        >
          {slice.primary.button.map((link) => (
            <ButtonLink
              key={link.key}
              field={link}
              className="w-fit"
              variant="Primary"
            />
          ))}
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default Hero;
