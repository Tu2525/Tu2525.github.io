// Copied from the master CV (F:\Workspace\JobSearch\Tarek_Darwish_CV_Master.docx) and its variants.

export const profile = {
	name: 'Tarek Shereen Darwish',
	shortName: 'Tarek Darwish',
	location: 'Cairo, Egypt',
	email: 'tareksheren@gmail.com',
	github: 'https://github.com/Tu2525',
	linkedin: 'https://www.linkedin.com/in/Tarekshereen',
	site: 'https://tu2525.github.io'
};

export interface Role {
	title: string;
	org: string;
	start: string;
	end: string;
	place: string;
	bullets: string[];
	link?: { label: string; url: string };
}

// Newest first. Work code is private, so roles never link to code unless the employer made it public.
export const experience: Role[] = [
	{
		title: 'Generative AI Engineer',
		org: 'Digital Egypt Pioneers Initiative',
		start: 'Nov 2025',
		end: 'Jul 2026',
		place: 'Cairo, Egypt · Hybrid',
		bullets: [
			'Built an explainable fraud-detection platform: a 310-feature classifier behind a FastAPI backend',
			'Layered Gemini over SHAP attributions to turn model output into plain-English risk explanations',
			'Shipped it end to end: Svelte frontend, Dockerized, deployed to Hugging Face Spaces'
		],
		link: { label: 'Project', url: '/projects/fraud-detection' }
	},
	{
		title: 'Backend & AI Engineer Intern',
		org: 'Aispeak',
		start: 'Jul 2025',
		end: 'Jan 2026',
		place: 'Madrid, Spain · Remote',
		bullets: [
			'Built a backend pipeline routing user messages to Azure, processed by a LLaMA-70B model',
			'Stood up real-time messaging on Supabase; owned database schema design and API development'
		]
	},
	{
		title: 'Backend Engineer Intern',
		org: 'Jiffy',
		start: 'Aug 2025',
		end: 'Dec 2025',
		place: 'Remote',
		bullets: [
			'Built core backend services: a multi-featured calendar and a containerized auth system in Docker',
			'Architected and documented RESTful APIs for new features, streamlining frontend integration'
		]
	},
	{
		title: 'Cross Platform Mobile Developer Intern',
		org: 'Link Development',
		start: 'Jul 2025',
		end: 'Aug 2025',
		place: 'Maadi, Egypt',
		bullets: [
			'Led interns building a Flutter e-commerce app with Clean Architecture, Riverpod and Firebase',
			'Managed delivery and code quality through feature-branch workflows and pull-request reviews'
		],
		link: { label: 'Repo', url: 'https://github.com/Tu2525/LinkFlutterEcommerceApp' }
	},
	{
		title: 'Instructor & Projects Contributor',
		org: 'Pixels Egypt Org.',
		start: 'Oct 2023',
		end: 'Oct 2025',
		place: 'Helwan, Egypt',
		bullets: [
			'Taught ML, Computer Vision and Flutter to 15+ students; 95% satisfaction, 80% project completion',
			'Contributed ML and dev work to student projects recognized at university and national competitions'
		]
	},
	{
		title: 'Mobile App Developer',
		org: 'Digital Egypt Pioneers Initiative',
		start: 'Oct 2024',
		end: 'May 2025',
		place: 'Cairo, Egypt · Hybrid',
		bullets: [
			'Designed and maintained native Android apps in Kotlin and cross-platform apps in Dart/Flutter',
			'Conducted unit testing and implemented Android security protocols for robust app performance'
		]
	},
	{
		title: 'Data Analyst Intern',
		org: 'National Telecommunication Institute',
		start: 'Dec 2024',
		end: 'Mar 2025',
		place: 'Giza, Egypt',
		bullets: [
			'Cleaned and structured raw telecom datasets in Python/Pandas for exploratory and inferential analysis',
			'Built interactive Power BI and Tableau dashboards, using Power Query and DAX for custom metrics'
		]
	},
	{
		title: 'Software Engineer Intern',
		org: 'PETROBEL',
		start: 'Sep 2024',
		end: 'Oct 2024',
		place: 'Nasr City, Egypt',
		bullets: [
			'Supported a legacy .NET to modern .NET (MVC) migration, cutting system load time by 20%',
			'Collaborated on Flutter app enhancements that made the app 15% faster'
		]
	}
];

export const skills: Record<string, string[]> = {
	Languages: [
		'Python',
		'JavaScript/TypeScript',
		'Dart',
		'Kotlin',
		'Java',
		'C++',
		'C',
		'Rust',
		'SQL'
	],
	Frameworks: [
		'React',
		'Svelte/SvelteKit',
		'React Native',
		'Flutter',
		'Node.js',
		'Flask',
		'FastAPI',
		'Django',
		'TensorFlow',
		'PyTorch',
		'scikit-learn'
	],
	'Cloud & DevOps': ['AWS', 'Cloudflare', 'Azure', 'Docker', 'CI/CD', 'Supabase', 'Firebase'],
	'Data & ML': [
		'Machine Learning',
		'Deep Learning',
		'NLP',
		'Computer Vision',
		'LLM/RAG',
		'Pandas',
		'Power BI',
		'Tableau'
	]
};

export const education = {
	degree: 'B.Sc. Intelligent Systems Engineering',
	school: 'Helwan National University',
	place: 'Helwan, Egypt',
	years: '2022 - 2027 (expected)'
};

export const certifications: { name: string; issuer: string }[] = [
	{ name: 'Generative AI Track', issuer: 'Digital Egypt Pioneers Initiative, 2025-26' },
	{
		name: 'Mobile Development Track (Flutter & Kotlin)',
		issuer: 'Digital Egypt Pioneers Initiative, 2024-25'
	},
	{ name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services' },
	{ name: 'HCIP-AI', issuer: 'Huawei' },
	{ name: 'ICT Associate, AI & Cloud', issuer: 'Huawei' },
	{ name: 'Machine Learning Specialization', issuer: 'Stanford, Coursera' },
	{ name: 'Natural Language Processing', issuer: 'National Telecommunication Institute' },
	{ name: 'React Native Bootcamp', issuer: 'ITI' }
];

// Unturned mods on the Steam Workshop, made with the Normedian modding team.
// Subscriber counts as of 2026-09-25.
export const mods = [
	{
		title: 'WWII Submarine',
		year: 2018,
		summary: 'The first working WWII submarines on the Unturned workshop. Models with Boom.',
		subscribers: 12191,
		visitors: 45115,
		url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=1583312406'
	},
	{
		title: 'Fallout: Broken Steel',
		year: 2019,
		summary: 'Fallout armour sets, guns and gear brought to Unturned. Models with Media.',
		subscribers: 11965,
		visitors: 29774,
		url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=1688587902'
	},
	{
		title: 'Normedian WWII Expansion',
		year: 2018,
		summary: 'An expansion to a popular WW2 mod pack. One of six modellers.',
		subscribers: 2380,
		visitors: 10926,
		url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=1430446698'
	}
];
