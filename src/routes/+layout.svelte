<script lang="ts">
	import '$lib/styles/global.css';
	import { page } from '$app/state';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { profile } from '$lib/data/profile';

	let { children } = $props();

	const isHome = $derived(page.url.pathname === '/');
	const base = $derived(isHome ? '' : '/');
</script>

<svelte:head>
	<meta name="author" content={profile.name} />
	<meta property="og:site_name" content={profile.shortName} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
	<meta name="theme-color" content="#f6f4ef" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#0e0f10" media="(prefers-color-scheme: dark)" />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>

<header class="top">
	<div class="wrap bar">
		<a class="brand" href="/" aria-label="{profile.shortName}, home">
			<span class="mark">TD</span>
			<span class="brand-name">{profile.shortName}</span>
		</a>
		<nav aria-label="Main">
			<a href="{base}#projects">Projects</a>
			<a href="{base}#experience">Experience</a>
			<a href="{base}#contact">Contact</a>
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
	nav a:hover {
		color: var(--text);
		background: var(--surface-2);
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
