export type Category = 'mobile' | 'ai' | 'web' | 'systems';

export const categoryLabels: Record<Category, string> = {
	mobile: 'Mobile',
	ai: 'AI / ML',
	web: 'Web',
	systems: 'Systems'
};

/**
 * public: repo is public, link it.
 * soon:   repo exists but is not public yet. No link is shown. Flip to 'public' once published.
 * private: work or client code. Never published; the card says so.
 */
export type CodeStatus = 'public' | 'soon' | 'private';

export interface Project {
	slug: string;
	title: string;
	tagline: string;
	year: number;
	categories: Category[];
	/** Placement or programme, shown as a badge. */
	award?: string;
	context?: string;
	status?: string;
	stack: string[];
	summary: string;
	highlights: string[];
	team?: string;
	code: { status: CodeStatus; url?: string; label?: string };
	demo?: string;
	/** Button text for `demo`, defaults to "Live demo". */
	demoLabel?: string;
	/** Long-form sections for /projects/[slug]. */
	detail?: { heading: string; body: string[] }[];
}

export const projects: Project[] = [
	{
		slug: 'sonora',
		title: 'Sonora',
		tagline: 'Spotify Connect and Jams for a native Rust music client',
		year: 2026,
		categories: ['systems'],
		context: 'Open source contribution',
		status: '4 PRs merged',
		stack: ['Rust', 'GPUI', 'librespot', 'Spotify Connect'],
		summary:
			"Four merged pull requests to Sonora, a native music streaming client built with Rust and GPUI (2k+ stars), plus an upstream fix in librespot that the Connect work depended on.",
		highlights: [
			'Sonora shows up as a Spotify Connect device: a phone can start, pause, skip, seek and set the volume, and Sonora can hand playback to and from other devices (+2.9k lines, #895)',
			"Join, start and share Spotify Jams from the devices menu, with a QR code, participant list and a strip above the player bar (#934)",
			"Likes made in Spotify's other apps update the heart right away (#905); autoplay now defaults to on (#935)",
			'librespot fix: dealer messages carrying plain JSON were dropped as bad base64, which hid Liked Songs changes (#1786)'
		],
		team: 'Open source, maintained by sonorahq',
		code: {
			status: 'public',
			url: 'https://github.com/sonorahq/sonora',
			label: 'Sonora repo'
		},
		detail: [
			{
				heading: 'Connect',
				body: [
					"The feature sits behind a provider-neutral music::connect trait, so state and views never see Spotify directly, following the crate rules in the repo. It is off by default because Spotify may not allow third-party clients.",
					'State updates to Spotify are spaced out and back off when it rate-limits them. Tested on Windows 11 against the Spotify phone app.'
				]
			},
			{
				heading: 'Jams',
				body: [
					'Joining reads a jam link from the clipboard and shows who is in it first. The host can remove people, leaving a jam you own ends it, and the strip stays current as people join and leave.'
				]
			}
		]
	},
	{
		slug: 'arne',
		title: 'arne',
		tagline: 'Claude Code plugin that routes each prompt to the cheapest model that can do it',
		year: 2026,
		categories: ['ai'],
		stack: ['TypeScript', 'Claude Code plugin', 'Haiku', 'Sonnet', 'Opus'],
		summary:
			'arne (auto route and effort) sends every prompt to Haiku, Sonnet or Opus at a suitable effort, and prices staying, switching or handing off a large chat before you commit.',
		highlights: [
			'A small judge model picks tier and effort per prompt; in its bench it cost 53% less per task than Opus-only',
			'A band above the prompt shows the choice and why, with pinning and per-decision cost logged locally',
			'Cache-aware: compares the cost of staying, switching and a Haiku-written handoff summary'
		],
		code: { status: 'public', url: 'https://github.com/Tu2525/arne' }
	},
	{
		slug: 'safi',
		title: 'safi',
		tagline: 'A small harness for running local models',
		year: 2026,
		categories: ['ai'],
		stack: ['Python', 'PowerShell', 'Local LLMs'],
		summary:
			'A mini agent harness built task by task through reviewed pull requests: tool registry, onboarding probe, model profiles, trace logging and resumable runs.',
		highlights: [
			'Tool registry with a math tool, plus redaction, traces and resume support',
			'Onboarding probe and a profile for a 27B model on Windows hardware',
			'Developed through numbered plan tasks, each landing as its own PR'
		],
		code: { status: 'private' }
	},
	{
		slug: 'atlas',
		title: 'Atlas',
		tagline: 'AI mentor that finds your tech track and plans how to learn it',
		year: 2025,
		categories: ['mobile', 'ai'],
		award: '1st place · Leaders of Tomorrow',
		stack: ['Flutter', 'FastAPI', 'Pydantic', 'Gemma 3', 'Gemini'],
		summary:
			'A conversational career mentor. A chat works out which technical track suits you, a generated quiz measures your level, and Atlas plans a learning path from there.',
		highlights: [
			'Exploratory chat that locks in a track (ML, web, embedded…) from the conversation history',
			'Quizzes generated per track and graded into Beginner, Intermediate or Advanced',
			'Stateless FastAPI backend with strict Pydantic contracts; the Flutter client owns chat state'
		],
		team: 'Team project, Pixels Egypt',
		code: { status: 'soon', url: 'https://github.com/Tu2525/Atlas' },
		detail: [
			{
				heading: 'Flow',
				body: [
					'Chat → track selection → dynamic quiz → leveling → personalised recommendations. Each step is one endpoint, so the Flutter app can resume anywhere.',
					'The first version ran Gemma 3 locally through Ollama. The backend was later moved to Gemini 2.5 Flash-Lite through the Google GenAI SDK.'
				]
			},
			{
				heading: 'Backend',
				body: [
					'FastAPI with Pydantic models for every request and response, written against an API contract shared with the mobile team.',
					'The server holds no session state. The client sends the chat history with each call.'
				]
			}
		]
	},
	{
		slug: 'healthica',
		title: 'Healthica',
		tagline: 'Smart-band health monitor with on-device glucose prediction',
		year: 2026,
		categories: ['mobile', 'ai'],
		award: '1st · YLF Hackathon 2026, 2nd · Banha Hackathon 2025',
		stack: ['Flutter', 'Riverpod', 'BLE', 'ESP32', 'TensorFlow Lite', 'Supabase'],
		summary:
			'A Flutter app that streams vitals from an ESP32 smart band over Bluetooth Low Energy and predicts blood glucose on the phone with TensorFlow Lite. No server sits in the real-time path.',
		highlights: [
			'ESP32 firmware sends vitals plus 27 derived features as JSON over BLE GATT at 1 Hz',
			'Glucose regression (HR, SpO2, temperature, GSR) runs on-device; linear and neural models compared, then quantised',
			'Tiered health alerts, a supervisor view, GSR-guided breathing mode, Supabase auth and history'
		],
		team: 'Team project',
		code: { status: 'soon', url: 'https://github.com/Tu2525/healthica' },
		detail: [
			{
				heading: 'Data path',
				body: [
					'Band → BLE notification → BleService → EdgeMlService (TFLite) → Riverpod providers → UI. The phone does all real-time work, so the app keeps running with no connection.',
					'The firmware sends both full and legacy short key names, and the app accepts both, so older bands keep working.'
				]
			},
			{
				heading: 'Doctor dashboard',
				body: [
					"A companion web dashboard (React, TypeScript, Vite on Cloudflare) lets a doctor sign in with an email code, watch patient alerts, and open a patient's history. It has a separate admin view."
				]
			},
			{
				heading: 'Model',
				body: [
					'Trained on the GlucoBench and PhysioCGM datasets. Linear, polynomial and small neural models were compared across several prediction horizons and exported as float and quantised .tflite files.'
				]
			}
		]
	},
	{
		slug: 'fraud-detection',
		title: 'Explainable Fraud Detection',
		tagline: 'A fraud classifier that explains its decisions in plain English',
		year: 2026,
		categories: ['ai', 'web'],
		context: 'DEPI Generative AI track',
		stack: ['Python', 'SHAP', 'Gemini', 'FastAPI', 'Svelte', 'Docker', 'Hugging Face Spaces'],
		summary:
			'A 310-feature tree-based fraud classifier behind a FastAPI backend. SHAP picks the features that drove each decision, and Gemini turns them into a short risk explanation an analyst can read.',
		highlights: [
			'Returns a risk score from 0 to 100, a verdict and the primary risk factor for every transaction',
			'SHAP TreeExplainer attributions, top three features narrated by Gemini',
			'Svelte frontend with CSV upload and sample loaders; Dockerised and deployed to Hugging Face Spaces'
		],
		code: { status: 'public', url: 'https://github.com/Tu2525/DEPIGrad' },
		detail: [
			{
				heading: 'Pipeline',
				body: [
					'Raw transaction → quantile transform → classifier with a tuned decision threshold → SHAP attribution → Gemini explanation.',
					'If Gemini is unavailable, the API still returns the score and the SHAP factors, so the explanation is an enhancement, not a dependency.'
				]
			}
		]
	},
	{
		slug: 'roast-master',
		title: 'AI Roast Master',
		tagline: 'Webcam roast bot on a fully serverless Cloudflare stack',
		year: 2025,
		categories: ['web', 'ai'],
		context: 'Cloudflare 2026 AI internship project',
		stack: ['SvelteKit', 'Cloudflare Workers', 'Pages', 'R2', 'Gemini 2.5 Flash', 'Web Speech API'],
		summary:
			'Take one webcam shot and Gemini Vision writes a personalised roast. A second pass picks the matching sound effect, and the browser reads the roast aloud.',
		highlights: [
			'A single Gemini 2.5 Flash call does both the vision analysis and the writing',
			'Sound effect chosen from a library of 9, served from an R2 bucket',
			'SvelteKit UI on Pages, API on a Worker. Nothing to run or pay for when idle'
		],
		code: { status: 'public', url: 'https://github.com/Tu2525/cf_ai_TheRoastMaster' }
	},
	{
		slug: 'nutqai',
		title: 'NutqAI',
		tagline: 'Egyptian Arabic speech practice for kids, scored at the phoneme level',
		year: 2026,
		categories: ['mobile', 'ai'],
		context: 'Graduation project, Helwan National University',
		status: 'In progress',
		stack: ['Flutter', 'Python', 'FastAPI', 'ONNX', 'Docker'],
		summary:
			'A practice app for children in speech therapy and kids who default to English. Speech is aligned and scored per phoneme against Egyptian Arabic targets, and a backend tracks plans, progress and doctor reports.',
		highlights: [
			'Python speech package with an aligner, scoring, a quality gate and training with ONNX export',
			'Shared phoneme, lexicon and score contracts that every service reads from',
			'FastAPI backend for accounts, consent, doctor links, practice plans and reports, deployed with Docker Compose'
		],
		team: 'Team project',
		code: { status: 'soon', url: 'https://github.com/Tu2525/natqai' }
	},
	{
		slug: 'zeroclip',
		title: 'ZeroClip',
		tagline: 'A zero-impact game clipper for Windows, written in Rust',
		year: 2026,
		categories: ['systems'],
		status: 'In progress',
		stack: [
			'Rust',
			'egui',
			'Direct3D 11',
			'Windows.Graphics.Capture',
			'Media Foundation',
			'WASAPI'
		],
		summary:
			'Keeps the last few minutes of gameplay in memory and saves them with one hotkey, without touching the game, without copying frames off the GPU, and without losing the clip if the game crashes.',
		highlights: [
			'Anti-cheat safe by design: only public OS APIs, no injection, no hooks',
			'Zero-copy capture: frames go from the compositor to the hardware encoder without leaving VRAM',
			'GOP-aware DVR buffer and fragmented containers, so every clip decodes and survives a crash'
		],
		code: { status: 'soon', url: 'https://github.com/Tu2525/zeroclip' },
		detail: [
			{
				heading: 'Design',
				body: [
					'The ring buffer evicts whole GOPs, so every saved clip starts on a keyframe. Audio is evicted in step, so clips are never silent.',
					'The watchdog is a state machine (drain → flush → re-init → resume) that steps down the codec ladder, AV1 → HEVC → H.264, when a GPU cannot keep up.',
					'Trim and stitch work by stream copy with no re-encode, and keyframe snap points show on the timeline.'
				]
			},
			{
				heading: 'Structure',
				body: [
					'A Cargo workspace of small crates: zc-core (time, packets, DVR buffer, watchdog), zc-engine, zc-mux, zc-video, zc-audio, zc-input and zc-win. Platform code plugs into a platform-free core, which keeps the hard logic unit-testable.'
				]
			}
		]
	},
	{
		slug: 'opencrosshair',
		title: 'OpenCrosshair',
		tagline: 'A lightweight, open-source crosshair overlay for Windows games',
		year: 2026,
		categories: ['systems'],
		status: 'Released',
		stack: ['Rust', 'Win32 API', 'egui', 'WinHTTP', 'GitHub Actions'],
		summary:
			'Draws a custom crosshair in a transparent, click-through window over any game, without touching the game process. One 7 MB exe that idles at a few MB of RAM in the tray.',
		highlights: [
			'Zero idle cost: redraws only on change, and focus events arrive through SetWinEventHook, so nothing polls',
			'Per-game presets, a 64×64 pixel canvas, custom images, and hide or swap while aiming',
			'Self-updates from GitHub releases over WinHTTP, swapping the running exe once you leave your game'
		],
		code: { status: 'public', url: 'https://github.com/Tu2525/OpenCrosshair' },
		demo: 'https://github.com/Tu2525/OpenCrosshair/releases/latest',
		demoLabel: 'Download',
		detail: [
			{
				heading: 'No injection',
				body: [
					'Everything runs in its own process: no DLLs, no hooks into the game, no memory reading. When an anti-cheat refuses even a limited process handle, it falls back to a Toolhelp snapshot to find the focused game.'
				]
			},
			{
				heading: 'Rendering',
				body: [
					'Crosshairs are drawn into premultiplied BGRA buffers and pushed with UpdateLayeredWindow. Shapes write coverage into fill and outline masks using max instead of blending, so overlaps never double-darken. The circle is anti-aliased from its distance field.'
				]
			},
			{
				heading: 'One binary, three roles',
				body: [
					'The same exe is the app, the installer and the uninstaller. It installs per user with no admin rights, creates its Start menu shortcut through COM, and keeps a single instance with a named mutex and window messages.',
					'GitHub Actions builds the releases and refuses to publish when the git tag and the Cargo.toml version disagree, so installs can never loop on the same update.'
				]
			}
		]
	},
	{
		slug: 'musebridge',
		title: 'MuseBridge',
		tagline: 'Song recommendations based on how the lyrics feel',
		year: 2025,
		categories: ['ai'],
		status: 'Prototype · v2 in progress',
		stack: ['Python', 'PyTorch', 'Transformers', 'scikit-learn', 'aiohttp', 'Flask'],
		summary:
			'Recommends songs by emotional similarity instead of genre. Every song in a large Spotify tracks dataset gets an emotion vector from its lyrics, and nearest neighbours in that space become the recommendations.',
		highlights: [
			'Async lyrics fetcher (aiohttp, LRCLIB API) with bounded concurrency over the full dataset',
			'DistilRoBERTa emotion model run in GPU batches to build a 7-emotion vector per song',
			'KNN recommender with a Flask web UI and a CLI'
		],
		code: { status: 'soon', url: 'https://github.com/Tu2525/musebridge' }
	},
	{
		slug: 'risk-ai',
		title: 'Risk AI',
		tagline: 'Industrial IoT safety monitor that predicts gas leaks',
		year: 2025,
		categories: ['web', 'ai'],
		stack: ['React', 'Recharts', 'Python', 'Docker', 'SQLite', 'ESP32'],
		summary:
			'A real-time dashboard for ESP32 sensors (temperature, humidity, CO2, acetone). It predicts gas-leak risk from the rate of change, before readings reach hazardous levels.',
		highlights: [
			'Live sensor updates every 2 seconds',
			'Slope-based risk prediction with a full-screen critical alert',
			'Dockerised backend with SQLite history'
		],
		team: 'Team project',
		code: {
			status: 'public',
			url: 'https://github.com/mohammedmokhtar2/RiskAI-IoT-System',
			label: 'Team repo'
		}
	},
	{
		slug: 'logistics-optimizer',
		title: 'Logistics Route Optimizer',
		tagline: 'Multi-vehicle, multi-warehouse routing for the Beltone hackathon',
		year: 2025,
		categories: ['systems'],
		context: 'Beltone hackathon',
		stack: ['Python', 'Graph search', 'Heuristics'],
		summary:
			'Routing solvers and a network validator for the Robin Logistics simulation: assign orders to vehicles and warehouses, respect inventory and capacity, and minimise cost and time.',
		highlights: [
			'Iterated through dozens of solver versions, each benchmarked against the last',
			'Standalone network validator to catch infeasible routes before submission',
			'Written-up comparisons and time optimisations for each major version'
		],
		code: { status: 'soon', url: 'https://github.com/Tu2525/beltone-logistics-solver' }
	},
	{
		slug: 'berghain-solver',
		title: 'Berghain Bouncer Solver',
		tagline: 'Online admission control for the Listen Labs challenge',
		year: 2025,
		categories: ['systems', 'ai'],
		context: 'Listen Labs challenge',
		stack: ['Python', 'Online algorithms', 'Parameter tuning'],
		summary:
			'People arrive one at a time with a set of attributes. Admit or reject each one so the venue meets every attribute quota before it fills, with as few rejections as possible.',
		highlights: [
			'Several solver iterations with a scoring harness',
			'Automated parameter tuner with logged runs per scenario'
		],
		code: { status: 'soon', url: 'https://github.com/Tu2525/berghain-solver' }
	},
	{
		slug: 'image-captioning',
		title: 'Image Captioning',
		tagline: 'ResNet-50 + GPT-2 captioner, benchmarked against BLIP and ViT-GPT2',
		year: 2025,
		categories: ['ai'],
		stack: ['PyTorch', 'Transformers', 'ResNet-50', 'GPT-2', 'Flickr30k'],
		summary:
			'A custom encoder-decoder captioner trained on Flickr30k, behind a unified API that also serves BLIP and ViT-GPT2 for comparison, plus a small web client.',
		highlights: [
			'One API for three captioning models',
			'Custom ResNet-50 encoder feeding a GPT-2 decoder',
			'Browser client that uploads an image and shows the caption'
		],
		code: { status: 'soon', url: 'https://github.com/Tu2525/MLProject' }
	},
	{
		slug: 'sdn-load-balancer',
		title: 'SDN Load Balancer',
		tagline: 'Intelligent load balancing on a software-defined network',
		year: 2025,
		categories: ['systems'],
		stack: ['Python', 'Mininet', 'POX', 'Open vSwitch', 'Flask'],
		summary:
			'A POX controller that balances traffic across a custom 6-switch, 6-host Mininet topology, with a live web dashboard for monitoring and control.',
		highlights: [
			'Custom controller logic for load balancing across paths',
			'Real-time Flask dashboard',
			'One script launches the whole environment; Docker image included'
		],
		code: { status: 'soon', url: 'https://github.com/Tu2525/sdn-load-balancer' }
	},
	{
		slug: 'link-ecommerce',
		title: 'Link E-commerce',
		tagline: 'Bilingual Flutter shop with Firebase auth, orders and push notifications',
		year: 2025,
		categories: ['mobile'],
		context: 'Link Development internship',
		stack: ['Flutter', 'Riverpod', 'Firebase', 'Firestore', 'FCM', 'Clean Architecture'],
		summary:
			'A cross-platform e-commerce app built during the Link Development cross-platform internship: browse and wishlist products, check out, and follow orders, in English or Arabic.',
		highlights: [
			'Email and Facebook sign-in on Firebase Auth, with Firestore-backed orders and wishlist',
			'Orders feature split into data, domain and presentation layers with Riverpod providers',
			'English and Arabic localisation, light and dark themes, push notifications'
		],
		team: 'Intern team, led by me',
		code: { status: 'public', url: 'https://github.com/Tu2525/LinkFlutterEcommerceApp' }
	},
	{
		slug: 'skeleton-scan',
		title: 'Skeleton Scan Concierge',
		tagline: 'Joint range-of-motion capture that ends in a clinician-ready PDF',
		year: 2025,
		categories: ['ai'],
		stack: ['Python', 'MediaPipe', 'OpenCV', 'Gemini', 'PDF reports'],
		summary:
			'A command-line intake assistant. It measures joint range of motion from a webcam with MediaPipe, asks follow-up questions through the Gemini API, and builds a PDF report for a clinician.',
		highlights: [
			'MediaPipe pose analysis per joint, advanced by a keypress when the patient finishes the movement',
			"Gemini follow-up questions about the patient's responses",
			'One PDF report per patient'
		],
		team: 'Team project',
		code: {
			status: 'public',
			url: 'https://github.com/devAhmedMustafa/Limitless-Labs-AI',
			label: 'Team repo'
		}
	},
	{
		slug: 'yourgympal',
		title: 'YourGymPal',
		tagline: 'Flutter fitness tracker',
		year: 2025,
		categories: ['mobile'],
		stack: ['Flutter', 'Firebase', 'Provider'],
		summary:
			'Tracks workouts, weight progression, personal records and training schedules, synced with Firebase.',
		highlights: ['Workout and PR logging', 'Progress tracking over time', 'Firebase sync'],
		code: { status: 'soon', url: 'https://github.com/3amtarekelgamd/YourGymPal' }
	},
	{
		slug: 'webgl-game',
		title: 'WebGL Arena',
		tagline: 'First-person browser game in Three.js',
		year: 2025,
		categories: ['web'],
		stack: ['JavaScript', 'Three.js', 'WebGL'],
		summary:
			'A first-person arena in the browser: move, jump, shoot, collect coins and dodge enemies, with hand-written physics and particle effects.',
		highlights: [
			'Custom movement, gravity and collision',
			'Enemies, obstacles and a high score',
			'No build step, plain JavaScript'
		],
		code: { status: 'public', url: 'https://github.com/Tu2525/upgraded-waddle' }
	}
];

export function getProject(slug: string): Project | undefined {
	return projects.find((p) => p.slug === slug);
}
