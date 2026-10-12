<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import { categoryLabels, projects } from '$lib/data/projects';
	import { profile } from '$lib/data/profile';
	import { homeHref } from '$lib/track.svelte';
	import { repoInfo, shortDate } from '$lib/data/repo';

	let { data } = $props();
	const p = $derived(data.project);
	const gh = $derived(repoInfo(p.slug));
	const i = $derived(projects.findIndex((x) => x.slug === p.slug));
	const prev = $derived(projects[(i - 1 + projects.length) % projects.length]);
	const next = $derived(projects[(i + 1) % projects.length]);

	// Coming from the home page, "All projects" behaves like the browser back button,
	// so the visitor lands where they left off. Otherwise it links to the projects section.
	let cameFromHome = $state(false);
	afterNavigate(({ from }) => {
		cameFromHome = from?.url.pathname === '/';
	});

	function goBack(e: MouseEvent) {
		if (!cameFromHome || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
		e.preventDefault();
		history.back();
	}
</script>

<svelte:head>
	<title>{p.title} · {profile.shortName}</title>
	<meta name="description" content={p.summary} />
	<link rel="canonical" href="{profile.site}/projects/{p.slug}" />
	<meta property="og:title" content="{p.title} · {profile.shortName}" />
	<meta property="og:description" content={p.summary} />
	<meta property="og:url" content="{profile.site}/projects/{p.slug}" />
</svelte:head>

<article class="wrap page">
	<a class="back" href={homeHref('#projects')} onclick={goBack}><Icon name="back" /> All projects</a
	>

	<header>
		<div class="meta">
			{#if p.award}<span class="badge award"><Icon name="trophy" />{p.award}</span>{/if}
			{#if p.context}<span class="badge">{p.context}</span>{/if}
			{#if gh?.version}<span class="badge status">{gh.version}</span>
			{:else if p.status}<span class="badge status">{p.status}</span>{/if}
			<span class="mono">{p.year}, {p.categories.map((c) => categoryLabels[c]).join(', ')}</span>
		</div>
		<p class="path" aria-hidden="true">~/projects/{p.slug}</p>
		<h1>{p.title}</h1>
		<p class="tagline">{p.tagline}</p>
	</header>

	<div class="layout">
		<div class="body">
				{#if gh?.readme}
					<!-- README of the repo, fetched at build time by scripts/sync-github.mjs -->
					<div class="file">
						<span class="fname">README.md</span>
						{#if gh.pushed}<span>updated {shortDate(gh.pushed)}</span>{/if}
						{#if p.code.url}<a href={p.code.url} target="_blank" rel="noopener">view on GitHub</a>{/if}
					</div>
					<div class="readme">{@html gh.readme}</div>
				{:else}
					<p class="summary">{p.summary}</p>

					<h2>Highlights</h2>
					<ul class="highlights">
						{#each p.highlights as h}<li>{h}</li>{/each}
					</ul>

					{#each p.detail ?? [] as section}
						<h2>{section.heading}</h2>
						{#each section.body as para}<p>{para}</p>{/each}
					{/each}
				{/if}
		</div>

		<aside>
			<div class="panel">
				<h2 class="panel-title">Stack</h2>
				<ul class="stack">
					{#each p.stack as s}<li class="chip">{s}</li>{/each}
				</ul>
			</div>

			{#if p.team}
				<div class="panel">
					<h2 class="panel-title">Team</h2>
					<p>{p.team}</p>
				</div>
			{/if}

			<div class="panel links">
				{#if p.code.status === 'public' && p.code.url}
					<a class="btn primary" href={p.code.url} target="_blank" rel="noopener">
						<Icon name="github" />{p.code.label ?? 'View code'}
					</a>
				{:else if p.code.status === 'soon'}
					<p class="muted">Code is being cleaned up for release.</p>
				{:else}
					<p class="muted"><Icon name="lock" />Client or employer work. Code is private.</p>
				{/if}
				{#if p.demo}
					<a class="btn" href={p.demo} target="_blank" rel="noopener"
						><Icon name="external" />{p.demoLabel ?? 'Live demo'}</a
					>
				{/if}
			</div>
		</aside>
	</div>

	<nav class="pager" aria-label="More projects">
		<a href="/projects/{prev.slug}"><span>Previous</span>{prev.title}</a>
		<a href="/projects/{next.slug}"><span>Next</span>{next.title}</a>
	</nav>
</article>

<style>
	.page {
		padding-block: 40px 96px;
	}
	.back {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 14px;
		font-weight: 600;
		color: var(--muted);
		text-decoration: none;
	}
	.back:hover {
		color: var(--accent);
	}
	.back :global(svg) {
		width: 16px;
		height: 16px;
	}
	header {
		margin: 32px 0 40px;
	}
	.meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 16px;
	}
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		font-weight: 600;
		padding: 5px 10px;
		border-radius: 6px;
		background: var(--surface-2);
		color: var(--muted);
	}
	.badge.award {
		background: var(--accent-soft);
		color: var(--accent);
	}
	.badge.status {
		background: transparent;
		border: 1px dashed var(--line);
	}
	.badge :global(svg) {
		width: 13px;
		height: 13px;
	}
	.mono {
		font: 12px/1 var(--font-mono);
		color: var(--muted);
	}
	h1 {
		font-size: clamp(36px, 6vw, 60px);
		letter-spacing: -0.03em;
	}
	.tagline {
		margin-top: 12px;
		font-size: clamp(18px, 2.4vw, 22px);
		color: var(--muted);
	}

	.layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 300px;
		gap: 48px;
		align-items: start;
	}
	@media (max-width: 860px) {
		.layout {
			grid-template-columns: 1fr;
		}
	}
	.body {
		max-width: 68ch;
	}
	.body h2 {
		font-size: 22px;
		margin: 36px 0 12px;
	}
	.body p {
		margin-bottom: 14px;
	}
	.summary {
		font-size: 18px;
	}
	.highlights {
		padding-left: 18px;
		display: grid;
		gap: 8px;
		margin: 0;
	}
	.highlights li::marker {
		color: var(--accent);
	}

	.path {
		margin-bottom: 10px;
		font: 13px/1 var(--font-mono);
		color: var(--muted);
	}
	.file {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 6px 16px;
		padding: 10px 14px;
		margin-bottom: 20px;
		border: 1px solid var(--line);
		border-radius: var(--radius-sm);
		background: var(--surface);
		font: 12px/1.4 var(--font-mono);
		color: var(--muted);
	}
	.fname {
		color: var(--text);
		font-weight: 600;
		margin-right: auto;
	}
	.file a {
		color: var(--accent);
	}
	.pager {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin-top: 72px;
	}
	.pager a {
		display: grid;
		gap: 4px;
		padding: 16px 18px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--surface);
		text-decoration: none;
		font-weight: 600;
		transition: border-color 0.2s var(--ease-out);
	}
	.pager a:last-child {
		text-align: right;
	}
	.pager a:hover {
		border-color: var(--accent);
	}
	.pager span {
		font: 12px/1 var(--font-mono);
		color: var(--muted);
		font-weight: 400;
	}
	@media (max-width: 560px) {
		.pager {
			grid-template-columns: 1fr;
		}
	}
	.readme :global(img) {
		max-width: 100%;
		height: auto;
		margin: 8px 0 20px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
	}
	.readme :global(h2),
	.readme :global(h3) {
		margin: 36px 0 12px;
		letter-spacing: -0.02em;
	}
	.readme :global(h2) {
		font-size: 22px;
	}
	.readme :global(h3) {
		font-size: 18px;
	}
	.readme :global(p),
	.readme :global(li) {
		color: var(--muted);
	}
	.readme :global(p),
	.readme :global(pre) {
		margin-bottom: 14px;
	}
	.readme :global(li) {
		margin-bottom: 6px;
	}
	.readme :global(strong) {
		color: var(--text);
	}
	.readme :global(pre) {
		overflow-x: auto;
		padding: 14px;
		border-radius: var(--radius);
		background: var(--surface-2);
		font: 13px/1.5 var(--font-mono);
	}
	.readme :global(code) {
		font-family: var(--font-mono);
	}
	.readme :global(a) {
		color: var(--accent);
	}
	.readme :global(.anchor) {
		display: none;
	}
	.readme :global(ul),
	.readme :global(ol) {
		padding-left: 20px;
		margin-bottom: 14px;
	}
	.readme :global(table) {
		display: block;
		overflow-x: auto;
		border-collapse: collapse;
		margin-bottom: 14px;
	}
	.readme :global(th),
	.readme :global(td) {
		padding: 6px 10px;
		border: 1px solid var(--line);
	}

	aside {
		display: grid;
		gap: 12px;
		position: sticky;
		top: 88px;
	}
	.panel {
		padding: 18px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--surface);
	}
	.panel-title {
		font: 600 12px/1 var(--font-mono);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--muted);
		margin-bottom: 12px;
	}
	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.links {
		display: grid;
		gap: 10px;
	}
	.links .btn {
		justify-content: center;
	}
	.muted {
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--muted);
		font-size: 14px;
	}
	.muted :global(svg) {
		width: 15px;
		height: 15px;
		flex: none;
	}
</style>
