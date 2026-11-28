import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NextRequest } from "next/server";
import { hashLicenseToken, verifyLicenseToken } from "@/lib/pro/license";
import { GET as getProManifest } from "@/app/api/pro/registry/[slug]/route";
import PricingPage from "@/app/pricing/page";

describe("Phase 7 — Pro Infrastructure, Hashed Licence Verification & Pricing", () => {
  const originalEnv = process.env.RENDERJOY_PRO_TOKEN_HASHES;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.RENDERJOY_PRO_TOKEN_HASHES;
    } else {
      process.env.RENDERJOY_PRO_TOKEN_HASHES = originalEnv;
    }
  });

  it("verifies raw Pro tokens against SHA-256 hashes in timing-safe manner", () => {
    const raw = "rj_pro_testtoken1234567890";
    const hash = hashLicenseToken(raw);
    expect(verifyLicenseToken(raw, hash)).toBe(true);
    expect(verifyLicenseToken("rj_pro_wrongtoken123456789", hash)).toBe(false);
    expect(verifyLicenseToken("invalid_format", hash)).toBe(false);
    expect(verifyLicenseToken(raw, undefined)).toBe(false);
  });

  it("GET /api/pro/registry/[slug] enforces Bearer token auth and serves valid Pro manifests", async () => {
    const raw = "rj_pro_validlaunchtoken9999";
    process.env.RENDERJOY_PRO_TOKEN_HASHES = hashLicenseToken(raw);

    const unauthReq = new NextRequest("http://localhost:3000/api/pro/registry/animated-charts");
    const unauthRes = await getProManifest(unauthReq, {
      params: Promise.resolve({ slug: "animated-charts" }),
    });
    expect(unauthRes.status).toBe(401);

    const unknownReq = new NextRequest("http://localhost:3000/api/pro/registry/ripple-button", {
      headers: { Authorization: `Bearer ${raw}` },
    });
    const unknownRes = await getProManifest(unknownReq, {
      params: Promise.resolve({ slug: "ripple-button" }),
    });
    expect(unknownRes.status).toBe(404);

    const okReq = new NextRequest("http://localhost:3000/api/pro/registry/animated-charts", {
      headers: { Authorization: `Bearer ${raw}` },
    });
    const okRes = await getProManifest(okReq, {
      params: Promise.resolve({ slug: "animated-charts" }),
    });
    expect(okRes.status).toBe(200);
    const body = await okRes.json();
    expect(body.name).toBe("animated-charts");
  });

  it("PricingPage renders Open Core & Pro tiers and validates token format", () => {
    render(<PricingPage />);
    expect(screen.getByText("Open Core")).toBeInTheDocument();
    expect(screen.getByText("Pro Ecosystem")).toBeInTheDocument();

    const input = screen.getByLabelText("Pro licence token");
    fireEvent.change(input, { target: { value: "bad" } });
    expect(screen.getByText(/Expected `rj_pro_`/i)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "rj_pro_validtoken1234567890" } });
    expect(screen.getByText(/Valid token format/i)).toBeInTheDocument();
  });
});
