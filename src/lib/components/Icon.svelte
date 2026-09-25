<script lang="ts">
	// Thin wrapper over Phosphor so call sites stay short and every icon shares one weight.
	import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import DownloadSimple from 'phosphor-svelte/lib/DownloadSimple';
	import EnvelopeSimple from 'phosphor-svelte/lib/EnvelopeSimple';
	import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
	import LinkedinLogo from 'phosphor-svelte/lib/LinkedinLogo';
	import LockSimple from 'phosphor-svelte/lib/LockSimple';
	import Moon from 'phosphor-svelte/lib/Moon';
	import Sun from 'phosphor-svelte/lib/Sun';
	import Trophy from 'phosphor-svelte/lib/Trophy';

	const icons = {
		back: ArrowLeft,
		arrow: ArrowRight,
		external: ArrowUpRight,
		download: DownloadSimple,
		mail: EnvelopeSimple,
		github: GithubLogo,
		linkedin: LinkedinLogo,
		lock: LockSimple,
		moon: Moon,
		sun: Sun,
		trophy: Trophy
	};

	let { name, label }: { name: keyof typeof icons; label?: string } = $props();
	const Glyph = $derived(icons[name]);
</script>

{#if label}
	<Glyph weight="regular" aria-label={label} />
{:else}
	<Glyph weight="regular" aria-hidden="true" role="presentation" />
{/if}
