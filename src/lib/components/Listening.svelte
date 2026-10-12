<script lang="ts">
	import { onMount } from 'svelte';

	// Last.fm scrobbles Spotify; the key is read-only and public by design. On any failure nothing renders.
	let songs = $state<{ label: string; text: string; url: string }[]>([]);
	const live = $derived(songs[0]?.label === 'now playing');

	onMount(async () => {
		try {
			const r = await fetch(
				'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=tikatika_&limit=2&format=json&api_key=68fdf1b5b1227835a8e97fa449950377'
			);
			const tracks = (await r.json()).recenttracks.track;
			// While playing, the first entry is the live one and the second is the last finished track.
			songs = tracks.map((t: any, i: number) => ({
				label: i === 0 && t['@attr']?.nowplaying === 'true' ? 'now playing' : 'last played',
				text: `${t.name} · ${t.artist['#text']}`,
				url: t.url
			}));
			if (songs[0]?.label === 'last played') songs = songs.slice(0, 1);
		} catch {}
	});
</script>

{#if songs.length}
	<div class="listening" aria-label="Listening on Spotify">
		<span class="bars" class:live aria-hidden="true"><i></i><i></i><i></i></span>
		<ul>
			{#each songs as s (s.url)}
				<li>
					<a href={s.url} target="_blank" rel="noopener">
						<span class="label">{s.label}</span>
						<span class="text">{s.text}</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	.listening {
		display: flex;
		gap: 12px;
		align-items: flex-start;
		padding: 12px 16px;
		border-top: 1px solid var(--line);
		font: 12px/1.5 var(--font-mono);
		color: var(--muted);
	}
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		min-width: 0;
		flex: 1;
	}
	a {
		display: flex;
		gap: 8px;
		text-decoration: none;
		min-width: 0;
	}
	a:hover .text {
		color: var(--accent);
	}
	.label {
		flex: none;
		width: 7.5em;
		opacity: 0.7;
	}
	.text {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: var(--text);
	}

	/* Three bars: static when idle, bouncing while a track is live. */
	.bars {
		display: flex;
		align-items: flex-end;
		gap: 2px;
		height: 14px;
		margin-top: 3px;
	}
	.bars i {
		width: 2px;
		height: 40%;
		border-radius: 1px;
		background: var(--muted);
	}
	.bars.live i {
		background: var(--accent);
	}
	@media (prefers-reduced-motion: no-preference) {
		.bars.live i {
			animation: eq 0.9s ease-in-out infinite alternate;
		}
		.bars.live i:nth-child(2) {
			animation-delay: -0.3s;
		}
		.bars.live i:nth-child(3) {
			animation-delay: -0.6s;
		}
	}
	@keyframes eq {
		to {
			height: 100%;
		}
	}
</style>
