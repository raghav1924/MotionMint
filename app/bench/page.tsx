import type { Metadata } from "next";
import { BenchWorkspace } from "@/components/bench/bench-workspace";

export const metadata: Metadata = {
  title: "Bench — RenderJoy",
  description:
    "Full-canvas component experimentation workspace for comparing live RenderJoy specimens across 29 themes and Light/Dark modes.",
};

export default function BenchPage() {
  return <BenchWorkspace />;
}
