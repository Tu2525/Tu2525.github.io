<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Icon from './Icon.svelte';
	import { projects } from '$lib/data/projects';
	import { profile } from '$lib/data/profile';
	import { currentTrack, homeHref } from '$lib/track.svelte';

	interface Cmd {
		label: string;
		hint: string;
		run: () => void;
	}

	let dialog = $state<HTMLDialogElement>();
	let input = $state<HTMLInputElement>();
	let query = $state('');
	let sel = $state(0);

	const section = (id: string) => () =>
		page.url.pathname === '/' ? (location.hash = id) : goto(homeHref('#' + id));

	const all = $derived<Cmd[]>([
		...['projects', 'experience', 'skills', 'modelling', 'contact'].map((id) => ({
			label: id === 'modelling' ? '3D modelling' : id[0].toUpperCase() + id.slice(1),
			hint: 'section',
			run: section(id)
		})),
		...projects.map((p) => ({
			label: p.title,
			hint: 'project',
			run: () => goto(`/projects/${p.slug}`)
		})),
		{ label: 'Download CV', hint: currentTrack().label, run: () => open(currentTrack().cv) },
		{ label: 'GitHub', hint: 'link', run: () => open(profile.github) },
		{ label: 'LinkedIn', hint: 'link', run: () => open(profile.linkedin) },
		{ label: 'Copy email', hint: profile.email, run: () => navigator.clipboard?.writeText(profile.email) }
	]);

	// Keep the highlighted row visible when arrowing past the edge of the list.
	$effect(() => {
		document.getElementById(`cmd-${sel}`)?.scrollIntoView({ block: 'nearest' });
	});

	const shown = $derived(
		all.filter((c) => (c.label + ' ' + c.hint).toLowerCase().includes(query.trim().toLowerCase()))
	);

	export function show() {
		query = '';
		sel = 0;
		dialog?.showModal();
		input?.focus();
	}

	function pick(c?: Cmd) {
		if (!c) return;
		dialog?.close();
		c.run();
	}

	function onKey(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			dialog?.open ? dialog.close() : show();
		} else if (e.key === '/' && !dialog?.open && !/INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement).tagName)) {
			e.preventDefault();
			show();
		}
	}

	function onInputKey(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') sel = (sel + 1) % Math.max(shown.length, 1);
		else if (e.key === 'ArrowUp') sel = (sel - 1 + shown.length) % Math.max(shown.length, 1);
		else if (e.key === 'Enter') pick(shown[sel]);
		else return;
		e.preventDefault();
	}
</script>

<svelte:window onkeydown={onKey} />

<dialog
	bind:this={dialog}
	aria-label="Command palette"
	onclick={(e) => e.target === dialog && dialog.close()}
>
	<div class="search">
		<Icon name="search" />
		<input
			bind:this={input}
			bind:value={query}
			oninput={() => (sel = 0)}
			onkeydown={onInputKey}
			placeholder="Jump to a project, section or link"
			aria-label="Search"
			role="combobox"
			aria-expanded="true"
			aria-controls="cmd-list"
			aria-activedescendant="cmd-{sel}"
			autocomplete="off"
			spellcheck="false"
		/>
		<kbd>esc</kbd>
	</div>
	<ul id="cmd-list" role="listbox">
		{#each shown as c, i (c.label + c.hint)}
			<!-- Keyboard use goes through the combobox input above. -->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<li
				id="cmd-{i}"
				role="option"
				aria-selected={i === sel}
				class:on={i === sel}
				onmousemove={() => (sel = i)}
				onclick={() => pick(c)}
			>
				<span>{c.label}</span><span class="hint">{c.hint}</span>
			</li>
		{:else}
			<li class="none">Nothing matches "{query}"</li>
		{/each}
	</ul>
</dialog>

<style>
	dialog {
		width: min(560px, calc(100vw - 32px));
		margin: 14vh auto 0;
		padding: 0;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--surface);
		color: var(--text);
		box-shadow: var(--shadow);
		overflow: hidden;
	}
	dialog::backdrop {
		background: rgb(0 0 0 / 0.45);
	}
	.search {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 0 16px;
		border-bottom: 1px solid var(--line);
	}
	.search :global(svg) {
		width: 18px;
		height: 18px;
		color: var(--muted);
		flex: none;
	}
	input {
		flex: 1;
		min-width: 0;
		height: 54px;
		border: 0;
		background: transparent;
		color: inherit;
		font: var(--fs-body) var(--font-sans);
	}
	input:focus-visible {
		outline: none;
	}
	input::placeholder {
		color: var(--muted);
	}
	kbd {
		font: var(--fs-micro)/1 var(--font-mono);
		padding: 4px 6px;
		border: 1px solid var(--line);
		border-radius: 6px;
		color: var(--muted);
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 6px;
		max-height: 340px;
		overflow-y: auto;
	}
	li {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		padding: 10px 12px;
		border-radius: var(--radius-sm);
		font-size: var(--fs-body);
		cursor: pointer;
	}
	li.on {
		background: var(--surface-2);
	}
	li.on span:first-child {
		color: var(--accent);
	}
	.hint {
		font: var(--fs-micro)/1.6 var(--font-mono);
		color: var(--muted);
	}
	.none {
		color: var(--muted);
		cursor: default;
	}
</style>
