<script lang="ts">
	import '$lib/styles/global.css';
	import { page } from '$app/state';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { profile } from '$lib/data/profile';
	import { homeHref } from '$lib/track.svelte';

	let { children } = $props();

	const isHome = $derived(page.url.pathname === '/');

	// `wide` items only show on larger screens so the bar fits on one line on phones.
	const sections = [
		{ id: 'projects', label: 'Projects', wide: false },
		{ id: 'experience', label: 'Experience', wide: false },
		{ id: 'skills', label: 'Skills', wide: true },
		{ id: 'modelling', label: '3D', wide: true },
		{ id: 'contact', label: 'Contact', wide: false }
	];

	// Highlight the section that crosses the middle of the viewport, home page only.
	let active = $state<string | null>(null);
	$effect(() => {
		if (!isHome) {
			active = null;
			return;
		}
		const seen = new Set<string>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) seen.add(e.target.id);
					else seen.delete(e.target.id);
				}
				active = sections.find((s) => seen.has(s.id))?.id ?? null;
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		for (const s of sections) {
			const el = document.getElementById(s.id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<meta name="author" content={profile.name} />
	<meta property="og:site_name" content={profile.shortName} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="{profile.site}/og.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="{profile.name}, Software Engineer" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="{profile.site}/og.png" />
	<meta name="theme-color" content="#f4f4f5" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#0e0e10" media="(prefers-color-scheme: dark)" />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>

<header class="top">
	<div class="wrap bar">
		<a class="brand" href={homeHref()} aria-label="{profile.shortName}, home">
			<span class="mark">TD</span>
			<span class="brand-name">{profile.shortName}</span>
		</a>
		<nav aria-label="Main">
			{#each sections as s (s.id)}
				<a
					href={isHome ? `#${s.id}` : homeHref(`#${s.id}`)}
					class:wide={s.wide}
					aria-current={active === s.id ? 'true' : undefined}>{s.label}</a
				>
			{/each}
		</nav>
		<ThemeToggle />
	</div>
</header>

<main id="main">
	{@render children()}
</main>

<footer class="foot">
	<div class="wrap foot-row">
		<p>© {new Date().getFullYear()} {profile.name}</p>
		<div class="foot-links">
			<a href={profile.github} rel="me"><Icon name="github" label="GitHub" /></a>
			<a href={profile.linkedin} rel="me"><Icon name="linkedin" label="LinkedIn" /></a>
			<a href="mailto:{profile.email}"><Icon name="mail" label="Email" /></a>
		</div>
	</div>
</footer>

<style>
	.skip {
		position: absolute;
		left: 16px;
		top: -60px;
		z-index: 100;
		padding: 10px 14px;
		background: var(--accent);
		color: var(--on-accent);
		border-radius: var(--radius-sm);
		font-weight: 600;
		text-decoration: none;
	}
	.skip:focus {
		top: 12px;
	}

	.top {
		position: sticky;
		top: 0;
		z-index: 50;
		background: color-mix(in srgb, var(--bg) 82%, transparent);
		backdrop-filter: saturate(1.4) blur(12px);
		-webkit-backdrop-filter: saturate(1.4) blur(12px);
		border-bottom: 1px solid var(--line);
	}
	.bar {
		display: flex;
		align-items: center;
		gap: 16px;
		height: 64px;
	}
	.brand {
		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		font-family: var(--font-display);
		font-weight: 600;
		margin-right: auto;
	}
	.mark {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		border-radius: 9px;
		background: var(--accent);
		color: var(--on-accent);
		font: 700 13px/1 var(--font-mono);
	}
	nav {
		display: flex;
		gap: 4px;
	}
	nav a {
		padding: 8px 12px;
		border-radius: 999px;
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		color: var(--muted);
	}
	nav a {
		position: relative;
		transition:
			color 0.2s var(--ease-out),
			background 0.2s var(--ease-out);
	}
	nav a:hover {
		color: var(--text);
		background: var(--surface-2);
	}
	/* Current section: full-strength text and a short accent bar under the label. */
	nav a[aria-current='true'] {
		color: var(--text);
	}
	nav a::after {
		content: '';
		position: absolute;
		left: 50%;
		bottom: 2px;
		width: 14px;
		height: 2px;
		border-radius: 2px;
		background: var(--accent);
		transform: translateX(-50%) scaleX(0);
		transition: transform 0.25s var(--ease-out);
	}
	nav a[aria-current='true']::after {
		transform: translateX(-50%) scaleX(1);
	}
	@media (max-width: 860px) {
		nav a.wide {
			display: none;
		}
	}
	@media (max-width: 640px) {
		.brand-name {
			display: none;
		}
		nav a {
			padding: 8px;
		}
	}

	.foot {
		border-top: 1px solid var(--line);
		padding-block: 28px;
		color: var(--muted);
		font-size: 14px;
	}
	.foot-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		flex-wrap: wrap;
	}
	.foot-links {
		display: flex;
		gap: 4px;
	}
	.foot-links a {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 999px;
		color: var(--muted);
	}
	.foot-links a:hover {
		color: var(--text);
		background: var(--surface-2);
	}
	.foot-links :global(svg) {
		width: 18px;
		height: 18px;
	}
</style>
