const fs = require('fs');
const path = require('path');

// Post-esbuild step: patch the FINAL _worker.js output to remove
// require("node:crypto") calls that esbuild re-introduces.
//
// IMPORTANT: We only patch require() calls (CommonJS), NOT ESM imports.
// Cloudflare Workers with nodejs_compat support ESM imports like:
//   import { createHash } from "node:crypto"  ← This works fine!
// But they crash on require() calls in ESM context:
//   require("node:crypto")  ← This crashes with "Dynamic require is not supported"

console.log('\n📁 Phase 3: Post-processing _worker.js (require-only)...');

const workerPath = path.resolve(process.cwd(), '.open-next/assets/_worker.js');

if (!fs.existsSync(workerPath)) {
    console.error('❌ _worker.js not found at', workerPath);
    process.exit(1);
}

let content = fs.readFileSync(workerPath, 'utf8');

// Count require() calls specifically (NOT import statements)
const requirePatterns = [
    /require\s*\(\s*["']node:crypto["']\s*\)/g,
];

let totalFixed = 0;

// 1. Replace standard require("node:crypto") calls
const stdMatches = (content.match(/require\s*\(\s*["']node:crypto["']\s*\)/g) || []).length;
console.log(`   Standard require("node:crypto") calls: ${stdMatches}`);
content = content.replace(/require\s*\(\s*["']node:crypto["']\s*\)/g, '({})');
totalFixed += stdMatches;

// 2. Replace minified require wrappers: Ba("node:crypto"), __require("node:crypto"), etc.
//    These are renamed require() calls that esbuild generates.
//    Pattern: identifier("node:crypto") where identifier is NOT an ESM keyword
const wrapperRegex = /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(\s*["']node:crypto["']\s*\)/g;
let match;
const wrappersToReplace = [];
const esmKeywords = ['import', 'from', 'export'];

// Reset regex
const scanContent = content;
while ((match = wrapperRegex.exec(scanContent)) !== null) {
    const funcName = match[1];
    // Skip if it's an ESM keyword or a method we shouldn't replace
    if (esmKeywords.includes(funcName)) continue;
    // Skip if it looks like it's part of an import statement context
    // Check preceding characters for 'from' or 'import'
    const precedingChars = scanContent.substring(Math.max(0, match.index - 10), match.index);
    if (precedingChars.includes('from') || precedingChars.includes('import')) continue;

    wrappersToReplace.push({ funcName, fullMatch: match[0], index: match.index });
}

console.log(`   Minified require wrappers found: ${wrappersToReplace.length}`);
for (const wrapper of wrappersToReplace) {
    console.log(`   Replacing: ${wrapper.funcName}("node:crypto") → ({})`);
    content = content.replace(wrapper.fullMatch, '({})');
    totalFixed++;
}

// Write the patched file
fs.writeFileSync(workerPath, content);

// Verify — count ALL remaining node:crypto references
const verifyContent = fs.readFileSync(workerPath, 'utf8');
const remainingRequire = (verifyContent.match(/require\s*\(\s*["']node:crypto["']\s*\)/g) || []).length;
const remainingImport = (verifyContent.match(/from\s*["']node:crypto["']/g) || []).length;
const remainingBare = (verifyContent.match(/import\s*["']node:crypto["']/g) || []).length;

console.log(`\n   Summary:`);
console.log(`   - require() calls fixed: ${totalFixed}`);
console.log(`   - require() calls remaining: ${remainingRequire}`);
console.log(`   - ESM import-from remaining: ${remainingImport} (OK — nodejs_compat handles these)`);
console.log(`   - ESM bare import remaining: ${remainingBare} (OK — nodejs_compat handles these)`);

if (remainingRequire === 0) {
    console.log('\n✅ VERIFIED: Zero require("node:crypto") calls in final _worker.js');
    if (remainingImport > 0 || remainingBare > 0) {
        console.log('   ESM imports left intact — Cloudflare nodejs_compat will resolve them at runtime.');
    }
} else {
    console.warn(`\n⚠️  WARNING: ${remainingRequire} require() calls remain — these will crash at runtime`);
}
