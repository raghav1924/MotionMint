import React from "react";
import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { CATALOG_ITEMS, getCatalogItem } from "@/lib/catalog";
import { ComponentStudio } from "@/components/studio/component-studio";

export function generateStaticParams() {
  return CATALOG_ITEMS.map((item) => ({ slug: item.slug }));
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) notFound();

  let sourceCode: string | null = null;
  if (item.sourcePath) {
    const absPath = path.join(/*turbopackIgnore: true*/ process.cwd(), item.sourcePath);
    if (fs.existsSync(absPath)) {
      sourceCode = fs.readFileSync(absPath, "utf-8");
    }
  }

  return <ComponentStudio item={item} sourceCode={sourceCode} />;
}
