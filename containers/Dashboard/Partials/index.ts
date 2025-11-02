import dynamic from "next/dynamic";

export const HeroSection = dynamic(() => import("./HeroSection"), { ssr: false });
export const Wrapper = dynamic(() => import("./Wrapper"), { ssr: false });