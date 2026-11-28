import crypto from "node:crypto";

export const PRO_REGISTRY_SLUGS = new Set([
  "cover-flow-carousel",
  "advanced-upload-flow",
  "payment-success-flow",
  "animated-charts",
  "bento-dashboard-block",
]);

const TOKEN_PATTERN = /^rj_pro_[a-zA-Z0-9]{16,64}$/;

export function isValidProTokenFormat(token: string): boolean {
  return TOKEN_PATTERN.test(token.trim());
}

/**
 * Computes a lowercase hex SHA-256 digest of a raw Pro licence token.
 * Raw tokens are never stored in the repository or logs.
 */
export function hashLicenseToken(rawToken: string): string {
  return crypto.createHash("sha256").update(rawToken.trim(), "utf8").digest("hex");
}

/**
 * Timing-safe verification of a raw token against a comma-separated list
 * of hex SHA-256 hashes (e.g. from process.env.RENDERJOY_PRO_TOKEN_HASHES).
 */
export function verifyLicenseToken(
  rawToken: string | null | undefined,
  allowedHashesCsv: string | undefined
): boolean {
  if (!rawToken || !allowedHashesCsv) return false;
  const trimmed = rawToken.trim();
  if (!isValidProTokenFormat(trimmed)) return false;

  const candidateHex = hashLicenseToken(trimmed);
  const candidateBuf = Buffer.from(candidateHex, "hex");

  const hashes = allowedHashesCsv
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter((h) => /^[0-9a-f]{64}$/.test(h));

  for (const allowedHex of hashes) {
    const allowedBuf = Buffer.from(allowedHex, "hex");
    if (
      candidateBuf.length === allowedBuf.length &&
      crypto.timingSafeEqual(candidateBuf, allowedBuf)
    ) {
      return true;
    }
  }

  return false;
}
