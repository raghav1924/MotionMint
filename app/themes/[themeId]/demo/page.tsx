import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_THEMES } from "@/lib/themes/registry";
import { ThemeDemoWebsite } from "@/components/theme/theme-demo-website";

export function generateStaticParams() {
  return ALL_THEMES.map((theme) => ({ themeId: theme.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ themeId: string }>;
}): Promise<Metadata> {
  const { themeId } = await params;
  const theme = ALL_THEMES.find((t) => t.id === themeId);
  if (!theme) return { title: "Theme Demo — RenderJoy" };
  return {
    title: `${theme.name} Theme Demo — RenderJoy`,
    description: theme.description,
  };
}

export default async function ThemeDemoPage({
  params,
}: {
  params: Promise<{ themeId: string }>;
}) {
  const { themeId } = await params;
  const theme = ALL_THEMES.find((t) => t.id === themeId);
  if (!theme) {
    notFound();
  }
  return <ThemeDemoWebsite theme={theme} />;
}
