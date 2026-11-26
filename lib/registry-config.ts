import { BRAND } from "@/lib/brand";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export const REGISTRY_NAMESPACE = "@rjstudio";

/**
 * Configurable registry base URL.
 * Defaults to local development URL until a production domain is configured.
 */
export function getRegistryBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_REGISTRY_URL?.replace(/\/$/, "") ||
    "http://localhost:3000/r"
  );
}

export function isProductionRegistryConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_REGISTRY_URL);
}

export function getRegistryNamespaceTemplate(): string {
  return `${getRegistryBaseUrl()}/{name}.json`;
}

export function getInstallCommand(
  slug: string,
  pm: PackageManager = "npm"
): string {
  const runner =
    pm === "npm"
      ? "npx"
      : pm === "pnpm"
        ? "pnpm dlx"
        : pm === "yarn"
          ? "yarn dlx"
          : "bunx";
  return `${runner} shadcn@latest add ${REGISTRY_NAMESPACE}/${slug}`;
}

export function getComponentsJsonSnippet(): string {
  return JSON.stringify(
    {
      registries: {
        [REGISTRY_NAMESPACE]: getRegistryNamespaceTemplate(),
      },
    },
    null,
    2
  );
}

export const REGISTRY_META = {
  name: BRAND.name.toLowerCase(),
  namespace: REGISTRY_NAMESPACE,
  homepage: "http://localhost:3000",
} as const;
