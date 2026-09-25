<script lang="ts">
	// Small inline icon set (Lucide-style paths, drawn at 24x24).
	type Name =
		| 'github'
		| 'linkedin'
		| 'mail'
		| 'download'
		| 'arrow'
		| 'external'
		| 'sun'
		| 'moon'
		| 'lock'
		| 'trophy';
	let { name, label }: { name: Name; label?: string } = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden={label ? undefined : 'true'}
	role={label ? 'img' : undefined}
	aria-label={label}
>
	{#if name === 'github'}
		<path
			d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
		/><path d="M9 18c-4.51 2-5-2-7-2" />
	{:else if name === 'linkedin'}
		<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect
			x="2"
			y="9"
			width="4"
			height="12"
		/><circle cx="4" cy="4" r="2" />
	{:else if name === 'mail'}
		<rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
	{:else if name === 'download'}
		<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path
			d="M12 15V3"
		/>
	{:else if name === 'arrow'}
		<path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
	{:else if name === 'external'}
		<path d="M15 3h6v6" /><path d="M10 14 21 3" /><path
			d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
		/>
	{:else if name === 'sun'}
		<circle cx="12" cy="12" r="4" /><path
			d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
		/>
	{:else if name === 'moon'}
		<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
	{:else if name === 'lock'}
		<rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
	{:else if name === 'trophy'}
		<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path
			d="M4 22h16"
		/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path
			d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
		/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
	{/if}
</svg>
