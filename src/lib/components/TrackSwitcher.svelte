<script lang="ts">
	import { replaceState } from '$app/navigation';
	import { page } from '$app/state';
	import { tracks, defaultTrack, type TrackId } from '$lib/data/tracks';
	import { trackState } from '$lib/track.svelte';

	function select(id: TrackId) {
		trackState.id = id;
		const url = new URL(page.url);
		if (id === defaultTrack) url.searchParams.delete('track');
		else url.searchParams.set('track', id);
		replaceState(url, {});
	}
</script>

<div class="switcher">
	<span class="label" id="track-label">Viewing as</span>
	<div class="options" role="group" aria-labelledby="track-label">
		{#each tracks as t (t.id)}
			<button type="button" aria-pressed={trackState.id === t.id} onclick={() => select(t.id)}>
				{t.label}
			</button>
		{/each}
	</div>
</div>

<style>
	.switcher {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}
	.label {
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--muted);
	}
	.options {
		display: flex;
		gap: 4px;
		padding: 4px;
		border: 1px solid var(--line);
		border-radius: 999px;
		background: var(--surface);
		max-width: 100%;
		overflow-x: auto;
		scrollbar-width: none;
	}
	.options::-webkit-scrollbar {
		display: none;
	}
	/* On narrow screens the list scrolls sideways; fade the right edge so that is visible. */
	@media (max-width: 640px) {
		.options {
			-webkit-mask-image: linear-gradient(to right, #000 82%, transparent);
			mask-image: linear-gradient(to right, #000 82%, transparent);
			padding-right: 28px;
		}
	}
	button {
		flex: none;
		min-height: 36px;
		padding: 0 14px;
		border: 0;
		border-radius: 999px;
		background: transparent;
		color: var(--muted);
		font: 500 14px/1 var(--font-sans);
		cursor: pointer;
		white-space: nowrap;
	}
	button:hover {
		color: var(--text);
	}
	button[aria-pressed='true'] {
		background: var(--text);
		color: var(--bg);
	}
</style>
