import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative, extname } from 'node:path';
import { gzipSync } from 'node:zlib';
import { pathToFileURL } from 'node:url';

export function localTarget(value, page, origin = 'https://ipranjal.com') {
  if (/^(mailto:|tel:|data:|javascript:)/i.test(value)) return null;
  const url = new URL(value.replaceAll('&amp;', '&'), new URL(page, origin));
  if (url.origin !== origin) return null;
  return { path: decodeURIComponent(url.pathname), hash: decodeURIComponent(url.hash.slice(1)) };
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  }))).flat();
}

export async function verifyBuild(directory = 'dist') {
  const root = resolve(directory);
  const files = await walk(root);
  const paths = new Set(files.map(file => relative(root, file)));
  const required = ['index.html', '404.html', 'work/index.html', 'about/index.html', 'guides/index.html', 'guide/index.html', 'thanks/index.html', 'welcome/index.html', 'writing/index.html', 'research/index.html', 'press/index.html', 'links/index.html', 'privacy/index.html', 'call/index.html', 'session/index.html', 'newsletter/index.html', 'rss.xml', 'sitemap.xml', 'robots.txt', 'CNAME', '.nojekyll'];
  for (const path of required) assert(paths.has(path), `Missing required output: ${path}`);
  for (const name of ['syne', 'ibm-plex-sans', 'ibm-plex-mono', 'lenis', 'gsap-core', 'CSSPlugin', 'ScrollTrigger', 'Observer']) assert(paths.has(`licenses/${name}.txt`), `Missing bundled license: ${name}`);
  for (const path of paths) {
    assert(!/(^|\/)(\.agents|\.tastemaker|node_modules|about\.md|website-.*\.md|skills-lock\.json|IMG_5046\.HEIC)(\/|$)/i.test(path), `Private source leaked: ${path}`);
    assert(!/\.(mp4|heic|md|ts|astro)$/i.test(path), `Unexpected source/media in output: ${path}`);
  }
  let links = 0;
  const html = new Map();
  for (const path of paths) if (path.endsWith('.html')) html.set(path, await readFile(resolve(root, path), 'utf8'));
  for (const [path, source] of html) {
    assert.equal((source.match(/<h1\b/g) || []).length, 1, `Expected one h1: ${path}`);
    assert(!source.includes('\u2014'), `Em dash in shipped copy: ${path}`);
    assert(!/href=["']#["']/.test(source), `Dead link: ${path}`);
    const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `Duplicate element IDs: ${path}`);
    for (const [, value] of source.matchAll(/\b(?:href|src|action)="([^"]+)"/g)) {
      const target = localTarget(value, `/${path.replace(/index\.html$/, '')}`);
      if (!target) continue;
      let file = target.path.replace(/^\//, '');
      if (!extname(file)) file = `${file.replace(/\/$/, '')}/index.html`.replace(/^\//, '');
      assert(paths.has(file), `Broken local URL in ${path}: ${value}`);
      if (target.hash) {
        const destination = html.get(file);
        assert(destination?.includes(`id="${target.hash}"`), `Missing fragment in ${path}: ${value}`);
      }
      links++;
    }
  }
  const thanks = html.get('thanks/index.html');
  assert(thanks?.includes('noindex,follow'), 'Thanks page must be noindex');
  assert(thanks?.includes("Opening it alone"), 'Thanks page must not assert provider success');
  assert(!thanks?.includes('download='), 'Thanks page must not offer the guide download before confirmation');
  assert(html.get('welcome/index.html')?.includes('noindex,follow'), 'Welcome page must be noindex');
  const home = html.get('index.html');
  assert(home?.includes('Get the free guide'), 'Homepage must retain guide-first action');
  assert(home?.includes('name="email_address"'), 'Kit email field missing');
  assert(home?.includes('https://app.kit.com/forms/10053825/subscriptions'), 'Unexpected Kit action');
  let jsGzip = 0;
  for (const path of paths) {
    if (path.endsWith('.js')) jsGzip += gzipSync(await readFile(resolve(root, path))).length;
    if (path.endsWith('.webp')) assert((await stat(resolve(root, path))).size <= 180_000, `Portrait exceeds 180 KB: ${path}`);
  }
  assert(jsGzip <= 100_000, `First-party JS exceeds 100 KB gzip: ${jsGzip}`);
  console.log(`Verified ${html.size} HTML pages, ${links} local links, private-file exclusion, portrait <=180 KB, JS ${Math.round(jsGzip / 1000)} KB gzip.`);
  return { pages: html.size, links, jsGzip };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await verifyBuild();
