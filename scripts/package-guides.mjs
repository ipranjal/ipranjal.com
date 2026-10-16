import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const directory = new URL('../public/files/', import.meta.url);
const files = ['ai-strategy-starter.pdf', 'personal-ai-starter-kit.pdf'];
for (const name of files) {
  const source = await readFile(new URL(name, directory));
  if (source.subarray(0, 5).toString() !== '%PDF-') throw new Error(`Invalid guide PDF: ${name}`);
}
const archive = execFileSync('zip', [
  '-j', '-X', '-q', '-',
  ...files.map(name => fileURLToPath(new URL(name, directory))),
], { maxBuffer: 20_000_000 });
await writeFile(new URL('practical-ai-free-guides.zip', directory), archive);
