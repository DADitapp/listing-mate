const fs = require('fs');
const path = require('path');

console.log('🔍 patch-crypto.js — Removing all node:crypto references...\n');

let patchedCount = 0;

// Walk directory recursively
function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

// === PHASE 1: Patch source files in .open-next ===
console.log('📁 Phase 1: Patching source node-crypto.js files...');
if (fs.existsSync('.open-next')) {
    walkDir('.open-next', (filePath) => {
        if (filePath.endsWith('node-crypto.js')) {
            const content = fs.readFileSync(filePath, 'utf8');
            if (!content.includes('// SHIMMED')) {
                console.log(`  🛠️  Patching: ${filePath}`);
                fs.writeFileSync(filePath, '// SHIMMED\nmodule.exports = {};\n');
                patchedCount++;
            }
        }
    });
}

// === PHASE 2: Patch worker.js before esbuild ===
console.log('\n📁 Phase 2: Patching worker.js...');
patchJsFile('.open-next/worker.js');

console.log(`\n🎉 Phase 1+2 complete. ${patchedCount} file(s) modified.\n`);

function patchJsFile(relPath) {
    const fullPath = path.resolve(process.cwd(), relPath);
    if (!fs.existsSync(fullPath)) {
        console.log(`  ⚠️  ${relPath} not found`);
        return;
    }
    let content = fs.readFileSync(fullPath, 'utf8');
    const before = (content.match(/node:crypto/g) || []).length;
    if (before > 0) {
        content = content.replace(/require\s*\(\s*["']node:crypto["']\s*\)/g, '({})');
        content = content.replace(/from\s*["']node:crypto["']/g, 'from "data:text/javascript,export default {}"');
        fs.writeFileSync(fullPath, content);
        console.log(`  ✅ Patched ${relPath} (${before} references removed)`);
        patchedCount++;
    } else {
        console.log(`  ℹ️  ${relPath} — clean`);
    }
}

// Export the patchJsFile function for use in post-esbuild step
module.exports = { patchJsFile };
