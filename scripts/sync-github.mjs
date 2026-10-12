// Pulls each public project's rendered README and latest release tag from GitHub into
// src/lib/data/github.json. Runs before dev/build; offline or private repos keep the old entry.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const out = new URL('../src/lib/data/github.json', import.meta.url);
const src = readFileSync(new URL('../src/lib/data/projects.ts', import.meta.url), 'utf8');
const token = process.env.GITHUB_TOKEN;
const headers = { 'User-Agent': 'portfolio-sync', ...(token && { Authorization: `Bearer ${token}` }) };
const get = (path, accept = 'application/vnd.github+json') =>
	fetch(`https://api.github.com/repos/${path}`, { headers: { ...headers, Accept: accept } });

const data = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : {};
const found = [...src.matchAll(/slug: '([^']+)'[\s\S]*?github\.com\/([\w.-]+\/[\w.-]+)'/g)];

for (const [, slug, repo] of found) {
	try {
		const r = await get(`${repo}/readme`, 'application/vnd.github.html+json');
		if (!r.ok) {
			console.log(`skip ${slug}: ${r.status}`);
			continue;
		}
		const raw = `https://raw.githubusercontent.com/${repo}/HEAD/`;
		let html = await r.text();
		// Default `flutter create` / template READMEs say nothing; keep the hand-written copy instead.
		const stub = /A new Flutter project|Getting Started with Create React App/.test(html);
		html = html
			.replace(/<div class="markdown-heading"[^>]*><h1[\s\S]*?<\/a><\/div>/, '') // page has its own h1
			.replace(/(src|srcset)="(?!https?:|data:|\/\/|#)\/?([^"]+)"/g, `$1="${raw}$2"`)
			.replace(/href="(?!https?:|mailto:|\/\/|#)\/?([^"]+)"/g, `href="https://github.com/${repo}/blob/HEAD/$1"`)
			.replace(/ id="user-content-/g, ' id="');
		const rel = await get(`${repo}/releases/latest`);
		const version = rel.ok ? (await rel.json()).tag_name : undefined;
		const meta = await (await get(repo)).json();
		data[slug] = {
			readme: stub ? undefined : html,
			version,
			stars: meta.stargazers_count,
			language: meta.language ?? undefined,
			pushed: meta.pushed_at?.slice(0, 10)
		};
		console.log(`ok   ${slug}${version ? ' ' + version : ''}${stub ? ' (stub readme ignored)' : ''}`);
	} catch (e) {
		console.log(`keep ${slug}: ${e.message}`);
	}
}
writeFileSync(out, JSON.stringify(data, null, '\t') + '\n');
