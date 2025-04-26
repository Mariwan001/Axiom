"use client";
import { TextGenerateEffect } from "../components/ui/main-text-generate-effect";

const words = `Axiom, A Fundamental, Unproven Truth Accepted as Logical System`;

<h1 className="text-4xl font-semibold bg-gradient-to-l from-neutral-800 via-zinc-400 to-stone-600 bg-clip-text text-transparent">{words}</h1>

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
