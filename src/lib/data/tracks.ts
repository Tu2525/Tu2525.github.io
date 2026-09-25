// The six role tracks mirror the six CV variants in F:\Workspace\JobSearch.
// Headlines and summaries are copied from the matching CV, so keep them in sync.

export type TrackId = 'general' | 'backend' | 'ml' | 'mobile' | 'frontend' | 'systems';

export interface Track {
	id: TrackId;
	label: string;
	headline: string;
	summary: string;
	/** Path under /static. Filled by `npm run sync-cvs`. */
	cv: string;
	/** Project slugs shown in "Featured", in order. */
	featured: string[];
	/** Skill group names, in display order. */
	skillOrder: string[];
}

export const tracks: Track[] = [
	{
		id: 'general',
		label: 'General',
		headline: 'Software Engineer · Full-Stack, Backend & Applied ML',
		summary:
			'Software engineer finishing a B.Sc. in Intelligent Systems Engineering, with backend, mobile, and applied-ML experience across six internships and two hackathon-placing projects (1st and 2nd) spanning on-device ML for a wearable, an AI mentor app, and a serverless Gemini app. Seeking a junior/graduate role, remote or sponsorship-eligible.',
		cv: '/cv/Tarek_Darwish_CV.pdf',
		featured: ['atlas', 'healthica', 'fraud-detection', 'roast-master', 'zeroclip', 'musebridge'],
		skillOrder: ['Languages', 'Frameworks', 'Cloud & DevOps', 'Data & ML']
	},
	{
		id: 'backend',
		label: 'Backend',
		headline: 'Backend Software Engineer · APIs, Cloud & Data',
		summary:
			'Software engineer finishing a B.Sc. in Intelligent Systems Engineering, focused on backend systems: real-time messaging on Supabase, a LLaMA-70B pipeline on Azure, a Dockerized IoT backend, and a legacy .NET-to-MVC migration that cut load time 20%. Looking for a junior/entry-level backend role, remote or sponsorship-eligible.',
		cv: '/cv/Tarek_Darwish_CV_Backend.pdf',
		featured: [
			'fraud-detection',
			'risk-ai',
			'roast-master',
			'atlas',
			'logistics-optimizer',
			'sdn-load-balancer'
		],
		skillOrder: ['Frameworks', 'Cloud & DevOps', 'Languages', 'Data & ML']
	},
	{
		id: 'ml',
		label: 'ML / AI',
		headline: 'Software Engineer · Applied Machine Learning & AI',
		summary:
			'Software engineer finishing a B.Sc. in Intelligent Systems Engineering, with applied ML spanning an explainable fraud-detection platform (SHAP attributions narrated by Gemini), a Gemini-Vision generative AI app, and a LLaMA-70B backend pipeline in production. Looking for a junior/graduate ML/AI role, fully remote or with relocation support.',
		cv: '/cv/Tarek_Darwish_CV_ML_AI.pdf',
		featured: [
			'fraud-detection',
			'healthica',
			'atlas',
			'musebridge',
			'image-captioning',
			'roast-master'
		],
		skillOrder: ['Data & ML', 'Frameworks', 'Languages', 'Cloud & DevOps']
	},
	{
		id: 'mobile',
		label: 'Mobile',
		headline: 'Mobile Engineer · Flutter, React Native & Native Android',
		summary:
			'Software engineer finishing a B.Sc. in Intelligent Systems Engineering, with cross-platform and native mobile experience across four roles: led a Flutter e-commerce build at Link Development, shipped Kotlin and Flutter apps over 8 months at DEPI, and taught Flutter to 15+ students. Also builds AI backends, so mobile features that depend on models are familiar ground. Seeking a junior mobile role, remote or sponsorship-eligible.',
		cv: '/cv/Tarek_Darwish_CV_Mobile.pdf',
		featured: ['healthica', 'atlas', 'yourgympal', 'roast-master', 'fraud-detection', 'musebridge'],
		skillOrder: ['Frameworks', 'Languages', 'Cloud & DevOps', 'Data & ML']
	},
	{
		id: 'frontend',
		label: 'Frontend',
		headline: 'Frontend / Full-Stack Engineer · Svelte, React & JavaScript',
		summary:
			'Software engineer finishing a B.Sc. in Intelligent Systems Engineering, with frontend and full-stack work: a React + Recharts safety dashboard, SvelteKit apps on Cloudflare, this SvelteKit site, and backend API work as a Backend Engineer Intern at Jiffy. Looking for a junior/entry-level frontend or full-stack role, remote or sponsorship-eligible.',
		cv: '/cv/Tarek_Darwish_CV_Frontend.pdf',
		featured: ['roast-master', 'risk-ai', 'fraud-detection', 'webgl-game', 'healthica', 'atlas'],
		skillOrder: ['Frameworks', 'Languages', 'Cloud & DevOps', 'Data & ML']
	},
	{
		id: 'systems',
		label: 'Systems',
		headline: 'Software Engineer · Systems, Linux & Open Source',
		summary:
			'Software engineer finishing a B.Sc. in Intelligent Systems Engineering, with a self-directed Rust systems project alongside backend/AI internship work. Comfortable close to the OS: Rust, C++, Linux, Docker. Looking for a junior/graduate engineering role, fully remote, open to any country.',
		cv: '/cv/Tarek_Darwish_CV_Systems.pdf',
		featured: [
			'zeroclip',
			'sdn-load-balancer',
			'logistics-optimizer',
			'risk-ai',
			'berghain-solver',
			'fraud-detection'
		],
		skillOrder: ['Languages', 'Cloud & DevOps', 'Frameworks', 'Data & ML']
	}
];

export const defaultTrack: TrackId = 'general';

export function getTrack(id: string | null | undefined): Track {
	return tracks.find((t) => t.id === id) ?? tracks[0];
}
