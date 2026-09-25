<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { categoryLabels } from '$lib/data/projects';
	import { profile } from '$lib/data/profile';

	let { data } = $props();
	const p = $derived(data.project);
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
	<a class="back" href="/#projects"><span aria-hidden="true">←</span> All projects</a>

	<header>
		<div class="meta">
			{#if p.award}<span class="badge award"><Icon name="trophy" />{p.award}</span>{/if}
			{#if p.context}<span class="badge">{p.context}</span>{/if}
			{#if p.status}<span class="badge status">{p.status}</span>{/if}
			<span class="mono">{p.year} · {p.categories.map((c) => categoryLabels[c]).join(' · ')}</span>
		</div>
		<h1>{p.title}</h1>
		<p class="tagline">{p.tagline}</p>
	</header>

	<div class="layout">
		<div class="body">
			<p class="summary">{p.summary}</p>

			<h2>Highlights</h2>
			<ul class="highlights">
				{#each p.highlights as h}<li>{h}</li>{/each}
			</ul>

			{#each p.detail ?? [] as section}
				<h2>{section.heading}</h2>
				{#each section.body as para}<p>{para}</p>{/each}
			{/each}
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
						><Icon name="external" />Live demo</a
					>
				{/if}
			</div>
		</aside>
	</div>
</article>

<style>
	.page {
		padding-block: 40px 96px;
	}
	.back {
		display: inline-flex;
		gap: 6px;
		font-size: 14px;
		font-weight: 600;
		color: var(--muted);
		text-decoration: none;
	}
	.back:hover {
		color: var(--accent);
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
		padding: 4px 10px;
		border-radius: 999px;
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
