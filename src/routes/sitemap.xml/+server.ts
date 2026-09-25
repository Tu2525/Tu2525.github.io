import { projects } from '$lib/data/projects';
import { profile } from '$lib/data/profile';

export const prerender = true;

export function GET() {
	const urls = ['/', ...projects.map((p) => `/projects/${p.slug}`)];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `\t<url><loc>${profile.site}${u}</loc></url>`).join('\n')}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
