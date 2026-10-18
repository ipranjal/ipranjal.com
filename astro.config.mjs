import { defineConfig } from 'astro/config';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';

export default defineConfig({
  site: 'https://ipranjal.com',
  output: 'static',
  // Rasterize only the repository-authored social cards; no remote SVG sources are accepted.
  image: { dangerouslyProcessSVG: true },
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [{
    name: 'bundled-third-party-notices',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        await mkdir(new URL('licenses/', dir), { recursive: true });
        for (const name of ['@fontsource/syne', '@fontsource/ibm-plex-sans', '@fontsource/ibm-plex-mono']) {
          await copyFile(
            new URL(`./node_modules/${name}/LICENSE`, import.meta.url),
            new URL(`licenses/${name.replace('@fontsource/', '')}.txt`, dir),
          );
        }
        for (const name of ['gsap-core', 'CSSPlugin', 'ScrollTrigger', 'Observer']) {
          const source = await readFile(new URL(`./node_modules/gsap/${name}.js`, import.meta.url), 'utf8');
          const notice = source.match(/\/\*![\s\S]*?\*\//)?.[0];
          if (!notice) throw new Error(`Missing GSAP license notice: ${name}`);
          await writeFile(new URL(`licenses/${name}.txt`, dir), `${notice}\n`);
        }
      },
    },
  }],
});
