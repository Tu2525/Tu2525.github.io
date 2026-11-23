<script lang="ts">
	import Icon from './Icon.svelte';
	import { currentTrack } from '$lib/track.svelte';

	// The CV follows the selected track. The version shows in the tooltip and to screen readers,
	// not as a second label on the button, so the hero keeps one clear action.
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
</a>
