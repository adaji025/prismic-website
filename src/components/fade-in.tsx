"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

interface IProps {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  className?: string;
}

gsap.registerPlugin(useGSAP);
const FadeIn = ({ children, vars = {}, className }: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(containerRef.current, {
          duration: 5,
          opacity: 0.5,
          ease: "power3.inOut",
          y: 0,
          ...vars,
        });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(containerRef.current, {
          duration: 0.5,
          opacity: 0.5,
          ease: "none",
          y: 0,
          stagger: 0,
        });
      });
    },
    { scope: containerRef },
  );
  return (
    <div ref={containerRef} className={clsx("opacity-0", className)}>
      {children}
    </div>
  );
};

export default FadeIn;
