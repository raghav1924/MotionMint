import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const REGISTRY_PATH = path.join(ROOT, "registry.json");
const OUTPUT_DIR = path.join(ROOT, "public", "r");

const VALID_TYPES = new Set([
  "registry:ui",
  "registry:component",
  "registry:lib",
  "registry:hook",
  "registry:block",
  "registry:style",
  "registry:theme",
]);

function fail(msg) {
  console.error(`❌ Registry validation failed: ${msg}`);
  process.exit(1);
}

if (!fs.existsSync(REGISTRY_PATH)) {
  fail("registry.json not found at repository root.");
}

const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));
if (!registry.name || !Array.isArray(registry.items)) {
  fail("registry.json must define 'name' and 'items' array.");
}

const seenNames = new Set();
for (const item of registry.items) {
  if (!item.name || typeof item.name !== "string") {
    fail("Every registry item must have a string 'name'.");
  }
  if (seenNames.has(item.name)) {
    fail(`Duplicate registry item name: ${item.name}`);
  }
  seenNames.add(item.name);

  if (!VALID_TYPES.has(item.type)) {
    fail(`Invalid type '${item.type}' on item '${item.name}'.`);
  }

  if (!Array.isArray(item.files) || item.files.length === 0) {
    fail(`Item '${item.name}' must declare at least one file.`);
  }

  for (const file of item.files) {
    const resolved = path.resolve(ROOT, file.path);
    if (!resolved.startsWith(ROOT + path.sep)) {
      fail(`Path escape detected in '${item.name}': ${file.path}`);
    }
    if (!fs.existsSync(resolved)) {
      fail(`Missing source file for '${item.name}': ${file.path}`);
    }
    const content = fs.readFileSync(resolved, "utf-8");
    if (content.includes("@/components/site/")) {
      fail(`Website-specific import '@/components/site/' found in ${file.path}`);
    }
    if (content.includes("@/lib/themes/")) {
      fail(`Theme-engine import '@/lib/themes/' found in ${file.path}`);
    }
  }

  const outFile = path.join(OUTPUT_DIR, `${item.name}.json`);
  if (!fs.existsSync(outFile)) {
    fail(`Missing generated output file: public/r/${item.name}.json (run 'npm run registry:build')`);
  }
  const parsedOut = JSON.parse(fs.readFileSync(outFile, "utf-8"));
  if (parsedOut.name !== item.name) {
    fail(`Generated file ${outFile} has mismatched name '${parsedOut.name}'.`);
  }
}

const rootOut = path.join(OUTPUT_DIR, "registry.json");
if (!fs.existsSync(rootOut)) {
  fail("Missing generated public/r/registry.json");
}

console.log(`✅ Registry validated: ${registry.items.length} items, all portable and built in public/r/.`);
