<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';

	let dark = $state(false);

	onMount(() => {
		const set = document.documentElement.dataset.theme;
		dark = set ? set === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
	});

	function toggle() {
		dark = !dark;
		const theme = dark ? 'dark' : 'light';
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem('theme', theme);
		} catch {
			// Storage can be blocked; the toggle still works for this visit.
		}
	}
</script>

<button
	class="toggle"
	onclick={toggle}
	aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
>
	<Icon name={dark ? 'sun' : 'moon'} />
</button>

<style>
	.toggle {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 999px;
		border: 1px solid var(--line);
		background: var(--surface);
		color: var(--text);
		cursor: pointer;
	}
	.toggle:hover {
		border-color: var(--text);
	}
	.toggle :global(svg) {
		width: 18px;
		height: 18px;
	}
</style>
