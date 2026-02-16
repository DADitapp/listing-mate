import * as crypto from 'node:crypto';
import * as buffer from 'node:buffer';

const NodeModules = {
    'node:crypto': crypto,
    'crypto': crypto,
    'node:buffer': buffer,
    'buffer': buffer,
};

globalThis.require = function (name) {
    if (name in NodeModules) {
        return NodeModules[name];
    }
    throw new Error(`Dynamic require of "${name}" is not supported`);
};

globalThis.Buffer = buffer.Buffer;
globalThis.process = globalThis.process || {};
globalThis.process.env = globalThis.process.env || {};
