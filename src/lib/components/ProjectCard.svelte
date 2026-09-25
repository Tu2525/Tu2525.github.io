<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import Icon from './Icon.svelte';

	// `lead` renders the first featured project across the full grid width, text beside highlights.
	let { project, lead = false }: { project: Project; lead?: boolean } = $props();
	const href = $derived(`/projects/${project.slug}`);
</script>

<article class="card reveal" class:lead>
	<div class="main">
		<div class="meta">
			{#if project.award}
				<span class="badge award"><Icon name="trophy" />{project.award}</span>
			{:else if project.context}
				<span class="badge">{project.context}</span>
			{/if}
			{#if project.status}
				<span class="badge status">{project.status}</span>
			{/if}
			<span class="year">{project.year}</span>
		</div>

		<h3><a {href}>{project.title}</a></h3>
		<p class="tagline">{project.tagline}</p>

		{#if lead}
			<p class="summary">{project.summary}</p>
		{/if}

		<div class="actions">
			<a class="more" {href}>Read more <Icon name="arrow" /></a>
			{#if project.code.status === 'public' && project.code.url}
				<a class="code" href={project.code.url} target="_blank" rel="noopener">
					<Icon name="github" />{project.code.label ?? 'Code'}
				</a>
			{/if}
			{#if project.demo}
				<a class="code" href={project.demo} target="_blank" rel="noopener">
					<Icon name="external" />Live demo
				</a>
			{/if}
		</div>
	</div>

	<div class="detail">
		<ul class="highlights">
			{#each project.highlights as h (h)}
				<li>{h}</li>
			{/each}
		</ul>
		<ul class="stack" aria-label="Tech stack">
			{#each project.stack as s (s)}
				<li class="chip">{s}</li>
			{/each}
		</ul>
	</div>
</article>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding: 26px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--surface);
		transition:
			border-color 0.25s var(--ease-out),
			box-shadow 0.25s var(--ease-out),
			transform 0.25s var(--ease-out);
	}
	.card:hover {
		border-color: color-mix(in srgb, var(--accent) 40%, var(--line));
		box-shadow: var(--shadow);
		transform: translateY(-2px);
	}
	.main,
	.detail {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}
	.detail {
		flex: 1;
	}

	/* Lead card: two columns on wide screens, a tinted surface to set it apart. */
	.lead {
		grid-column: 1 / -1;
		background: color-mix(in srgb, var(--accent-soft) 45%, var(--surface));
	}
	@media (min-width: 860px) {
		.lead {
			display: grid;
			grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
			gap: 40px;
			padding: 36px;
		}
		.lead h3 {
			font-size: 34px;
		}
		.lead .detail {
			justify-content: center;
		}
		.lead .actions {
			margin-top: auto;
		}
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
		min-height: 26px;
	}
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		font-weight: 500;
		padding: 5px 10px;
		border-radius: 6px;
		background: var(--surface-2);
		color: var(--muted);
	}
	.badge.award {
		background: var(--accent-soft);
		color: var(--accent);
	}
	.badge :global(svg) {
		width: 14px;
		height: 14px;
	}
	.badge.status {
		background: transparent;
		border: 1px dashed var(--line);
	}
	.year {
		margin-left: auto;
		font: 12px/1 var(--font-mono);
		color: var(--muted);
		font-variant-numeric: tabular-nums;
	}

	h3 {
		font-size: 24px;
	}
	h3 a {
		text-decoration: none;
	}
	h3 a:hover {
		color: var(--accent);
	}
	.tagline {
		color: var(--muted);
		max-width: 52ch;
	}
	.summary {
		max-width: 56ch;
	}

	.highlights {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 10px;
		font-size: 15px;
	}
	.highlights li {
		position: relative;
		padding-left: 18px;
	}
	.highlights li::before {
		content: '';
		position: absolute;
		left: 2px;
		top: 0.7em;
		width: 7px;
		height: 1.5px;
		background: var(--accent);
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: auto 0 0;
		padding: 0;
		list-style: none;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 18px;
		flex-wrap: wrap;
		font-size: 14px;
		font-weight: 500;
	}
	/* Regular cards flatten their two groups so the actions row sits last and lines up across the grid. */
	.card:not(.lead) .main,
	.card:not(.lead) .detail {
		display: contents;
	}
	.card:not(.lead) .actions {
		order: 1;
	}
	.actions a {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-height: 32px;
		text-decoration: none;
	}
	.actions :global(svg) {
		width: 16px;
		height: 16px;
		transition: transform 0.2s var(--ease-out);
	}
	.more {
		color: var(--accent);
	}
	.more:hover :global(svg) {
		transform: translateX(3px);
	}
	.code {
		color: var(--text);
	}
	.code:hover {
		color: var(--accent);
	}
</style>
