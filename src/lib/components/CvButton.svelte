<script lang="ts">
	import Icon from './Icon.svelte';
	import { currentTrack } from '$lib/track.svelte';

	// The CV follows the selected track, so the button names the version it downloads.
	let { primary = false }: { primary?: boolean } = $props();
	const track = $derived(currentTrack());
	const file = $derived(track.cv.split('/').pop());
</script>

<a
	class="btn cv"
	class:primary
	href={track.cv}
	download={file}
	title="{track.label} CV, PDF"
	aria-label="Download CV, {track.label} version (PDF)"
>
	<Icon name="download" />Download CV
	{#key track.id}
		<span class="tag">{track.label}</span>
	{/key}
</a>

<style>
	.tag {
		margin-left: 2px;
		padding: 3px 8px;
		border-radius: 999px;
		font-size: 12px;
		font-weight: 500;
		background: color-mix(in srgb, currentColor 14%, transparent);
	}
	@media (prefers-reduced-motion: no-preference) {
		.tag {
			animation: pop 0.35s var(--ease-out);
		}
	}
	@keyframes pop {
		from {
			opacity: 0;
			transform: translateY(3px);
		}
	}
</style>
