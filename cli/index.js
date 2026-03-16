#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");

const REPO = "jessicasewe/brix";
const BRANCH = "main";
const RAW = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;

const args = process.argv.slice(2);
const command = args[0];

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 404) return reject(new Error("NOT_FOUND"));
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

async function getRegistry() {
  const data = await fetch(`${RAW}/registry.json`);
  return JSON.parse(data);
}

function getFlag(flag) {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
}

// ─── LIST ────────────────────────────────────────────────────────────────────
async function list() {
  const registry = await getRegistry();
  console.log("\nAvailable components:\n");
  for (const c of registry.components) {
    const frameworks = c.frameworks.join(", ");
    console.log(`  ${c.name.padEnd(16)} [${frameworks}]  — ${c.description}`);
  }
  console.log("");
}

// ─── ADD ─────────────────────────────────────────────────────────────────────
async function add() {
  const name = args[1];
  if (!name) {
    console.error("Usage: npx brix-ui add <component> [--framework next|react|astro] [--dir path]");
    process.exit(1);
  }

  const framework = getFlag("--framework") || "next";
  const outDir = getFlag("--dir") || "components/ui";

  const registry = await getRegistry();
  const component = registry.components.find((c) => c.name === name);

  if (!component) {
    console.error(`\n✖  Component "${name}" not found.\n`);
    console.log("Run  npx brix-ui list  to see all available components.\n");
    process.exit(1);
  }

  if (!component.frameworks.includes(framework)) {
    console.error(`\n✖  ${framework} version of "${name}" is not available yet.`);
    console.log(`   Available frameworks: ${component.frameworks.join(", ")}`);
    console.log(`   Want to contribute? github.com/${REPO}\n`);
    process.exit(1);
  }

  // Determine file extension
  const ext = framework === "astro"
    ? `${name.charAt(0).toUpperCase() + name.slice(1)}.astro`
    : `${name}.tsx`;

  const fileUrl = `${RAW}/registry/${name}/${framework}/${ext}`;

  let source;
  try {
    source = await fetch(fileUrl);
  } catch (e) {
    console.error(`\n✖  Could not fetch component source. The file may not exist yet.\n`);
    process.exit(1);
  }

  // Write file
  const targetDir = path.resolve(process.cwd(), outDir);
  fs.mkdirSync(targetDir, { recursive: true });
  const targetFile = path.join(targetDir, ext);
  fs.writeFileSync(targetFile, source, "utf8");

  console.log(`\n✔  Added ${ext} → ${path.relative(process.cwd(), targetFile)}\n`);

  // Print meta notes if available
  try {
    const metaRaw = await fetch(`${RAW}/registry/${name}/meta.json`);
    const meta = JSON.parse(metaRaw);
    const frameworkMeta = meta.frameworks?.[framework];
    if (frameworkMeta?.notes) {
      console.log(`   Note: ${frameworkMeta.notes}`);
    }
    if (frameworkMeta?.deps?.length) {
      console.log(`   Deps: ${frameworkMeta.deps.join(", ")}`);
    }
    console.log("");
  } catch (_) {}
}

// ─── ROUTER ──────────────────────────────────────────────────────────────────
(async () => {
  try {
    if (command === "list") {
      await list();
    } else if (command === "add") {
      await add();
    } else {
      console.log("\nUsage:");
      console.log("  npx brix-ui list");
      console.log("  npx brix-ui add <component> [--framework next|react|astro] [--dir path]\n");
    }
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
})();
