import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JS_FILE = path.resolve(__dirname, 'dist/esm/index.js');
const CSS_FILE = path.resolve(__dirname, 'dist/css/index.css');

let css = fs.readFileSync(CSS_FILE, 'utf8');
let js = fs.readFileSync(JS_FILE, 'utf8');

// based on https://github.com/Alletkla/vite-plugin-tailwind-shadowdom/tree/main
css = css
  .replace(/\(\(-webkit-hyphens:\s*none\)\)\s*and\s*/g, '')
  .replace(/\(-webkit-hyphens:\s*none\)\s*and\s*/g, '')
  .replace(/:root\b/g, ':host')
  .trim();

const cssAsJsString = JSON.stringify(css);
const replaced = js.replace(
  /import indexStyles from '\.\/index\.css\?inline';/,
  `const indexStyles = ${cssAsJsString};`
);

if (replaced === js) {
  throw new Error('❌ indexStyles import/export not found — see build-esm.mjs');
}

fs.writeFileSync(JS_FILE, replaced);

console.log('✅ CSS successfully inlined');
