<script lang="ts">
	import Icon from './Icon.svelte';
	import { profile } from '$lib/data/profile';

	// mailto: does nothing when no mail app is set up, so the click also copies the address
	// and says so. The mailto still opens a mail app where one exists.
	let { primary = false }: { primary?: boolean } = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		try {
			await navigator.clipboard.writeText(profile.email);
			copied = true;
			clearTimeout(timer);
			timer = setTimeout(() => (copied = false), 2500);
		} catch {
			// Clipboard can be blocked; the mailto link still runs.
		}
	}
</script>

<a class="btn" class:primary href="mailto:{profile.email}" onclick={copy} title={profile.email}>
	<Icon name="mail" />{copied ? 'Email copied' : 'Email me'}
</a>
<span class="sr-only" aria-live="polite"
	>{copied ? `${profile.email} copied to clipboard` : ''}</span
>
