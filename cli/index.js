#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");

const REPO = "jessicasewe/brix";
const BRANCH = "main";
const RAW = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;
const CONFIG_FILE = "brix.json";

const args = process.argv.slice(2);
const command = args[0];

// ─── HTTP FETCH ──────────────────────────────────────────────────────────────
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

// ─── BRIX.JSON ───────────────────────────────────────────────────────────────
function readConfig() {
  const configPath = path.resolve(process.cwd(), CONFIG_FILE);
  if (!fs.existsSync(configPath)) return null;
  try { return JSON.parse(fs.readFileSync(configPath, "utf8")); } catch { return null; }
}

function writeConfig(config) {
  const configPath = path.resolve(process.cwd(), CONFIG_FILE);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf8");
}

function recordInstall(name, framework, outDir) {
  const config = readConfig() || { framework: "next", components: {} };
  config.components = config.components || {};
  config.components[name] = { framework, dir: outDir };
  writeConfig(config);
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
async function add(nameOverride, frameworkOverride, dirOverride) {
  const name = nameOverride || args[1];
  if (!name) {
    console.error("Usage: npx brix-ui add <component> [--framework next|react|astro] [--dir path]");
    process.exit(1);
  }

  // Read config defaults
  const config = readConfig();
  const framework = frameworkOverride || getFlag("--framework") || config?.framework || "next";
  const outDir = dirOverride || getFlag("--dir") || "components/ui";

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

  const ext = framework === "astro"
    ? `${name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (_, c) => c.toUpperCase())}.astro`
    : `${name}.tsx`;

  const fileUrl = `${RAW}/registry/${name}/${framework}/${ext}`;

  let source;
  try {
    source = await fetch(fileUrl);
  } catch {
    console.error(`\n✖  Could not fetch component source. The file may not exist yet.\n`);
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), outDir);
  fs.mkdirSync(targetDir, { recursive: true });
  const targetFile = path.join(targetDir, ext);
  fs.writeFileSync(targetFile, source, "utf8");

  console.log(`\n✔  Added ${ext} → ${path.relative(process.cwd(), targetFile)}\n`);

  // Print meta notes
  try {
    const metaRaw = await fetch(`${RAW}/registry/${name}/meta.json`);
    const meta = JSON.parse(metaRaw);
    const frameworkMeta = meta.frameworks?.[framework];
    if (frameworkMeta?.notes) console.log(`   Note: ${frameworkMeta.notes}`);
    if (frameworkMeta?.deps?.length) console.log(`   Deps: ${frameworkMeta.deps.join(", ")}`);
    console.log("");
  } catch (_) {}

  // Save to brix.json
  recordInstall(name, framework, outDir);
}

// ─── UPDATE ──────────────────────────────────────────────────────────────────
async function update() {
  const config = readConfig();
  if (!config || !config.components || !Object.keys(config.components).length) {
    console.log("\n  No components tracked in brix.json. Run  npx brix-ui add <component>  first.\n");
    process.exit(0);
  }

  console.log("\nUpdating components...\n");
  for (const [name, meta] of Object.entries(config.components)) {
    await add(name, meta.framework, meta.dir);
  }
  console.log("✔  All components updated.\n");
}

// ─── INFO ─────────────────────────────────────────────────────────────────────
function info() {
  const config = readConfig();
  if (!config) {
    console.log("\n  No brix.json found in this directory. Run  npx brix-ui add <component>  to get started.\n");
    return;
  }

  const components = config.components || {};
  const names = Object.keys(components);

  console.log("\nBrix project info:\n");
  console.log(`  Config file:  brix.json`);
  console.log(`  Framework:    ${config.framework || "next"}`);
  console.log(`  Components:   ${names.length}\n`);

  if (names.length) {
    for (const [name, meta] of Object.entries(components)) {
      console.log(`  ${name.padEnd(16)} ${meta.framework.padEnd(8)} → ${meta.dir}`);
    }
  }
  console.log("");
}

// ─── ROUTER ──────────────────────────────────────────────────────────────────
(async () => {
  try {
    if (command === "list") {
      await list();
    } else if (command === "add") {
      await add();
    } else if (command === "update") {
      await update();
    } else if (command === "info") {
      info();
    } else {
      console.log("\nUsage:");
      console.log("  npx brix-ui list");
      console.log("  npx brix-ui add <component> [--framework next|react|astro] [--dir path]");
      console.log("  npx brix-ui update");
      console.log("  npx brix-ui info\n");
    }
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
})();
