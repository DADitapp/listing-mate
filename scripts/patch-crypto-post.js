const fs = require('fs');
const path = require('path');

// Post-esbuild step: patch the FINAL _worker.js output to remove ALL
// node:crypto references that esbuild re-introduced from npm dependencies.

console.log('\n📁 Phase 3: Post-processing _worker.js...');

const workerPath = path.resolve(process.cwd(), '.open-next/assets/_worker.js');

if (!fs.existsSync(workerPath)) {
    console.error('❌ _worker.js not found at', workerPath);
    process.exit(1);
}

let content = fs.readFileSync(workerPath, 'utf8');

// Count before
const beforeCount = (content.match(/node:crypto/g) || []).length;
console.log(`   Total "node:crypto" references before: ${beforeCount}`);

if (beforeCount > 0) {
    // 1. Replace standard require("node:crypto") calls
    content = content.replace(/require\s*\(\s*["']node:crypto["']\s*\)/g, '({})');

    // 2. Replace minified require wrappers like Ba("node:crypto"), __require("node:crypto")
    //    Pattern: any identifier followed by ("node:crypto")
    content = content.replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(\s*["']node:crypto["']\s*\)/g, (match, funcName) => {
        // Don't replace if it's obviously not a require (e.g., "includes", "indexOf")
        if (['includes', 'indexOf', 'startsWith', 'endsWith', 'match', 'replace', 'push'].includes(funcName)) {
            return match;
        }
        console.log(`   Replacing: ${funcName}("node:crypto") → ({})`);
        return '({})';
    });

    // 3. Replace bare ESM imports: import"node:crypto" or import "node:crypto"
    content = content.replace(/import\s*["']node:crypto["']\s*;?/g, '');

    // 4. Replace ESM import-from: from"node:crypto" or from "node:crypto"
    content = content.replace(/from\s*["']node:crypto["']/g, 'from "data:text/javascript,export default {}"');

    // 5. Replace string literals in config arrays like edgeExternals:["node:crypto"]
    content = content.replace(/["']node:crypto["']/g, '"__removed__"');

    fs.writeFileSync(workerPath, content);

    // Verify
    const verifyContent = fs.readFileSync(workerPath, 'utf8');
    const remaining = (verifyContent.match(/node:crypto/g) || []).length;
    console.log(`\n   Total "node:crypto" references after: ${remaining}`);

    if (remaining === 0) {
        console.log('✅ VERIFIED: Zero node:crypto references in final _worker.js');
    } else {
        console.warn(`⚠️  WARNING: ${remaining} node:crypto references remain`);
    }
} else {
    console.log('ℹ️  _worker.js is already clean');
}
