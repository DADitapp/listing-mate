const fs = require('fs');
const path = require('path');

// 1. Define possible paths where OpenNext outputs the Next.js internals
const possiblePaths = [
    '.open-next/server-functions/default/node_modules/next/dist/server/node-environment-extensions/node-crypto.js',
    '.open-next/server-functions/default/.next/server/chunks/node_modules_next_dist_server_node-environment-extensions_node-crypto_js.js', // Sometimes bundled differently
];

// 2. Iterate and patch
console.log('🔍 Searching for Next.js internal node-crypto files to patch...');

let patchedCount = 0;

function patchFile(filePath) {
    const fullPath = path.resolve(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
        console.log(`✅ Found: ${filePath}`);
        const content = fs.readFileSync(fullPath, 'utf8');
        if (!content.includes('// SHIMMED BY PATCH-CRYPTO')) {
            console.log(`🛠️  Patching: ${filePath}`);
            // Overwrite with a no-op that exports an empty object
            fs.writeFileSync(fullPath, '// SHIMMED BY PATCH-CRYPTO\nmodule.exports = {};\n');
            patchedCount++;
        } else {
            console.log(`ℹ️  Already patched: ${filePath}`);
        }
    } else {
        // Optional: Recursive search if exact paths fail? (For now, just log)
        // console.log(`❌ Not found: ${filePath}`);
    }
}

// 3. Walker function to find the file recursively in .open-next if the static paths fail
function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

try {
    // Attempt standard paths first
    possiblePaths.forEach(patchFile);

    // If no standard path found, do a recursive search for 'node-crypto.js' in .open-next
    if (patchedCount === 0) {
        console.log('⚠️  Standard paths not found. Starting recursive search in .open-next...');
        if (fs.existsSync('.open-next')) {
            walkDir('.open-next', (filePath) => {
                if (filePath.endsWith('node-crypto.js')) {
                    patchFile(filePath);
                }
            });
        }
    }

} catch (e) {
    console.error('❌ Error during patching:', e);
    process.exit(1);
}

if (patchedCount > 0) {
    console.log(`🎉 Successfully patched ${patchedCount} file(s).`);
} else {
    console.warn('⚠️  No files were patched. The build structure might have changed.');
}
