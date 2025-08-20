import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/bounded";
import FadeIn from "@/components/fade-in";
import { createClient } from "@/prismicio";
import { formatPrice } from "@/utils/formatters";

/**
 * Props for `ProductFeature`.
 */
export type ProductFeatureProps =
  SliceComponentProps<Content.ProductFeatureSlice>;

/**
 * Component for "ProductFeature" Slices.
 */
const ProductFeature: FC<ProductFeatureProps> = async ({ slice }) => {
  const client = createClient();
  const fragrance = isFilled.contentRelationship(slice.primary.fragrance)
    ? await client.getByID<Content.FragranceDocument>(
        slice.primary.fragrance.id,
      )
    : null;

  const formattedPrice = formatPrice(fragrance?.data.price);
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden bg-black py-16 text-white md:py-24"
    >
      <div className="lg:grid-rows-[auto, auto] grid items-center gap-4 lg:grid-cols-3">
        <FadeIn
          className="col-span-2 row-span-2 translate-y-16 opacity-0"
          vars={{ duration: 1 }}
        >
          <PrismicNextImage
            field={slice.primary.image}
            className="h-auto w-full object-cover"
          />
        </FadeIn>
        <FadeIn className="translate-y-16 self-start bg-white/10 p-10 opacity-0 lg:col-start-3 lg:row-start-1">
          <h2 className="text-3xl leading-tight font-semibold md:text-4xl">
            <PrismicText field={slice.primary.heading} />
          </h2>
          <div className="max-w-lg text-base text-gray-300">
            <PrismicRichText field={slice.primary.description} />
          </div>
        </FadeIn>
        {/* Fragrance */}
        <FadeIn
          vars={{ duration: 1, delay: 1 }}
          className="animate-in relative translate-y-16 self-end bg-white/10 opacity-0 will-change-transform"
        >
          <PrismicNextImage
            className="mx-auto -mt-10 w-full -rotate-12 md:-mt-20"
            field={fragrance?.data.bottle_image}
          />
          <div className="flex justify-between p-10">
            <div className="spay-y-1">
              <h3 className="font-display text-4xl">
                <PrismicText
                  field={fragrance?.data.title}
                  fallback="Fragrance"
                />
              </h3>
              <p className="mt-2 text-gray-400">Eau de parfum</p>

              <p>button link</p>
            </div>

            <p className="mt-4 text-gray-100" aria-label="product price">
              <span>{formattedPrice}</span>
            </p>
          </div>
        </FadeIn>
      </div>
    </Bounded>
  );
};

export default ProductFeature;
