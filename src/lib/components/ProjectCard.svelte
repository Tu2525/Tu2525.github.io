<script lang="ts">
	import type { Project } from '$lib/data/projects';
	import { categoryLabels } from '$lib/data/projects';
	import Icon from './Icon.svelte';

	let { project, featured = false }: { project: Project; featured?: boolean } = $props();
	const href = $derived(`/projects/${project.slug}`);
</script>

<article class="card" class:featured>
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

	{#if featured}
		<ul class="highlights">
			{#each project.highlights as h}
				<li>{h}</li>
			{/each}
		</ul>
	{/if}

	<ul class="stack" aria-label="Tech stack">
		{#each featured ? project.stack : project.stack.slice(0, 4) as s}
			<li class="chip">{s}</li>
		{/each}
	</ul>

	<div class="actions">
		<a class="more" {href}>Details <Icon name="arrow" /></a>
		{#if project.code.status === 'public' && project.code.url}
			<a class="code" href={project.code.url} target="_blank" rel="noopener">
				<Icon name="github" />{project.code.label ?? 'Code'}
			</a>
		{/if}
		{#if project.demo}
			<a class="code" href={project.demo} target="_blank" rel="noopener"
				><Icon name="external" />Live demo</a
			>
		{/if}
		<span class="cats">{project.categories.map((c) => categoryLabels[c]).join(' · ')}</span>
	</div>
</article>

<style>
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 22px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--surface);
		transition:
			border-color 0.15s,
			transform 0.15s,
			box-shadow 0.15s;
	}
	.card:hover {
		border-color: color-mix(in srgb, var(--accent) 45%, var(--line));
		box-shadow: var(--shadow);
	}
	.featured {
		padding: 26px;
		gap: 14px;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
		min-height: 24px;
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
	.badge :global(svg) {
		width: 13px;
		height: 13px;
	}
	.badge.status {
		background: transparent;
		border: 1px dashed var(--line);
	}
	.year {
		margin-left: auto;
		font: 12px/1 var(--font-mono);
		color: var(--muted);
	}

	h3 {
		font-size: 22px;
	}
	.featured h3 {
		font-size: 26px;
	}
	h3 a {
		text-decoration: none;
	}
	h3 a:hover {
		color: var(--accent);
	}
	.tagline {
		color: var(--muted);
	}

	.highlights {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 8px;
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
		top: 0.65em;
		width: 6px;
		height: 6px;
		border-radius: 2px;
		background: var(--accent);
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 16px;
		flex-wrap: wrap;
		margin-top: auto;
		padding-top: 6px;
		font-size: 14px;
		font-weight: 600;
	}
	.actions a {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-height: 32px;
		text-decoration: none;
	}
	.actions :global(svg) {
		width: 15px;
		height: 15px;
	}
	.more {
		color: var(--accent);
	}
	.more:hover :global(svg) {
		transform: translateX(2px);
	}
	.code {
		color: var(--text);
	}
	.code:hover {
		color: var(--accent);
	}
	.cats {
		margin-left: auto;
		font: 12px/1 var(--font-mono);
		color: var(--muted);
		font-weight: 400;
	}
</style>
