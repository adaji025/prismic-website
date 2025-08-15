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

  const mm = gsap.matchMedia()

  useGSAP(
    () => {
      gsap.to(containerRef.current, {
        duration: 5,
        opacity: 0.5,
        ease: "power3.inOut",
        y: 0,
        ...vars,
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
