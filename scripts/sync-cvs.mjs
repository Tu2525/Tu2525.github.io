// Copies the six CV PDFs from the JobSearch folder into static/cv.
// Usage: npm run sync-cvs  (or: node scripts/sync-cvs.mjs <path-to-JobSearch>)
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const jobSearch = resolve(process.argv[2] ?? join(root, '..', '..', 'JobSearch'));
const out = join(root, 'static', 'cv');

// JobSearch folder -> published file name (must match `cv` paths in src/lib/data/tracks.ts)
const map = {
	'general graduate': 'Tarek_Darwish_CV.pdf',
	backend: 'Tarek_Darwish_CV_Backend.pdf',
	'ml and ai': 'Tarek_Darwish_CV_ML_AI.pdf',
	'mobile app': 'Tarek_Darwish_CV_Mobile.pdf',
	'frontend and js': 'Tarek_Darwish_CV_Frontend.pdf',
	'systems and oss': 'Tarek_Darwish_CV_Systems.pdf'
};

if (!existsSync(jobSearch)) {
	console.error(`JobSearch folder not found: ${jobSearch}`);
	process.exit(1);
}
mkdirSync(out, { recursive: true });

let failed = false;
for (const [folder, name] of Object.entries(map)) {
	const src = join(jobSearch, folder, 'Tarek_Darwish.pdf');
	if (!existsSync(src)) {
		console.error(`missing: ${src}`);
		failed = true;
		continue;
	}
	copyFileSync(src, join(out, name));
	console.log(`${folder.padEnd(18)} -> static/cv/${name}`);
}
process.exit(failed ? 1 : 0);
