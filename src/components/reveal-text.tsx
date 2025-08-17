"use client";
import { useGSAP } from "@gsap/react";
import { asText, RichTextField } from "@prismicio/client";
import clsx from "clsx";
import React, { useRef } from "react";
import { gsap } from "gsap";

gsap.registerPlugin(useGSAP);

type IProps = {
  field: RichTextField;
  id: string;
  className?: string;
  staggerAmount?: number;
  as?: React.ElementType;
  duration?: number;
  align?: "center" | "start" | "end";
};
const RevealText = ({
  field,
  id,
  align = "start",
  as: Component = "div",
  className,
  duration = 0.8,
  staggerAmount = 0.1,
}: IProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const words = asText(field)?.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".reveal-text-word", {
          y: 0,
          stagger: staggerAmount,
          duration: duration,
          ease: "power3.out",
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".reveal-text-word", {
          duration: 0.5,
          opacity: 0.5,
          ease: "none",
          y: 0,
          stagger: 0,
        });
      });
    },
    { scope: componentRef },
  );
  return (
    <Component
      className={clsx(
        "reveal-text text-balance",
        align === "center" && "text-center",
        align === "end" && "text-end",
        align === "start" && "text-start",
        className,
      )}
      ref={componentRef}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}-${id}`}
          className="mb-0 inline-block overflow-hidden pb-4"
        >
          <span className="reveal-text-word mt-0 inline-block translate-y-[120%] will-change-transform">
            {word}
            {index < words.length - 1 ? <>&nbsp;</> : null}
          </span>
        </span>
      ))}
    </Component>
  );
};

export default RevealText;
