import fs from "node:fs";
import path from "node:path";
import { NextResponse, type NextRequest } from "next/server";
import { PRO_REGISTRY_SLUGS, verifyLicenseToken } from "@/lib/pro/license";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  if (!PRO_REGISTRY_SLUGS.has(slug)) {
    return NextResponse.json(
      { error: "Unknown Pro registry item." },
      { status: 404 }
    );
  }

  const authHeader = req.headers.get("authorization");
  const bearerToken = authHeader?.toLowerCase().startsWith("bearer ")
    ? authHeader.slice(7).trim()
    : null;
  const queryToken = req.nextUrl.searchParams.get("token");
  const token = bearerToken || queryToken;

  const isAuthorized = verifyLicenseToken(
    token,
    process.env.RENDERJOY_PRO_TOKEN_HASHES
  );

  if (!isAuthorized) {
    return NextResponse.json(
      {
        error: "Valid @renderjoy-pro licence token required.",
        hint: "Pass Authorization: Bearer rj_pro_<token> configured in components.json.",
      },
      { status: 401 }
    );
  }

  const manifestPath = path.join(process.cwd(), "public", "r", `${slug}.json`);
  if (!fs.existsSync(manifestPath)) {
    return NextResponse.json(
      { error: "Pro manifest not built yet." },
      { status: 404 }
    );
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  return NextResponse.json(manifest, {
    status: 200,
    headers: { "Cache-Control": "private, no-store" },
  });
}
