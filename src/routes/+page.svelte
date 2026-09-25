<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import TrackSwitcher from '$lib/components/TrackSwitcher.svelte';
	import { projects, categoryLabels, type Category } from '$lib/data/projects';
	import { profile, experience, skills, education, certifications, mods } from '$lib/data/profile';
	import { tracks } from '$lib/data/tracks';
	import { readTrackFromUrl, currentTrack } from '$lib/track.svelte';

	import keyedPlateIso from '$lib/assets/gallery/keyed-plate-iso.png?enhanced';
	import keyedPlateTop from '$lib/assets/gallery/keyed-plate-top.png?enhanced';
	import clampBlock from '$lib/assets/gallery/clamp-block-iso.png?enhanced';
	import rifleM16 from '$lib/assets/gallery/game-rifle-m16.webp?enhanced';
	import rifleAk from '$lib/assets/gallery/game-rifle-ak.webp?enhanced';
	import truckCargo from '$lib/assets/gallery/game-truck-cargo.webp?enhanced';
	import truckUral from '$lib/assets/gallery/game-truck-ural.webp?enhanced';

	onMount(() => readTrackFromUrl(new URL(location.href)));

	const track = $derived(currentTrack());
	const featured = $derived(
		track.featured.map((s) => projects.find((p) => p.slug === s)!).filter(Boolean)
	);
	const others = $derived(projects.filter((p) => !track.featured.includes(p.slug)));

	let filter = $state<Category | 'all'>('all');
	const filters: (Category | 'all')[] = ['all', 'ai', 'mobile', 'web', 'systems'];
	const shown = $derived(
		filter === 'all' ? others : others.filter((p) => p.categories.includes(filter as Category))
	);

	const orderedSkills = $derived(track.skillOrder.map((g) => [g, skills[g]] as const));

	const stats = [
		{ value: '1st', label: 'Leaders of Tomorrow hackathon' },
		{ value: '2nd', label: 'Banha hackathon' },
		{ value: '8', label: 'roles since 2023' },
		{ value: '15+', label: 'students taught ML and Flutter' }
	];

	// Seven renders in a 4-column grid: game assets fill the first row, the first CAD render spans two cells.
	const gallery = [
		{ src: rifleM16, caption: 'Low-poly M16-style rifle', kind: 'game' },
		{ src: rifleAk, caption: 'Low-poly AK-style rifle and magazine', kind: 'game' },
		{ src: truckCargo, caption: '6×6 cargo truck', kind: 'game' },
		{ src: truckUral, caption: '6×6 truck with roof lights', kind: 'game' },
		{ src: keyedPlateIso, caption: 'Keyed mounting plate, woodworking jig', kind: 'cad wide' },
		{ src: clampBlock, caption: 'Split clamp block', kind: 'cad' },
		{ src: keyedPlateTop, caption: 'Keyed plate, top view', kind: 'cad' }
	];
	const totalSubscribers = mods.reduce((n, m) => n + m.subscribers, 0);
	const fmt = (n: number) => n.toLocaleString('en-US');

	const description = tracks[0].summary;
	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: profile.name,
		url: profile.site,
		email: `mailto:${profile.email}`,
		jobTitle: 'Software Engineer',
		address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
		alumniOf: education.school,
		sameAs: [profile.github, profile.linkedin]
	});
</script>

<svelte:head>
	<title>{profile.shortName} · Software Engineer</title>
	<meta name="description" content={description} />
	<link rel="canonical" href="{profile.site}/" />
	<meta property="og:title" content="{profile.shortName} · Software Engineer" />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="{profile.site}/" />
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>

<!-- Hero -->
<section class="hero">
	<div class="wrap">
		<p class="eyebrow rise" style="--i: 0">{profile.location} · Open to remote and relocation</p>
		<h1 class="rise" style="--i: 1">{profile.name}</h1>
		<p class="headline rise" style="--i: 2">{track.headline}</p>
		<p class="pitch rise" style="--i: 3">{track.pitch}</p>

		<div class="cta rise" style="--i: 4">
			<a class="btn primary" href={track.cv} download>
				<Icon name="download" />Download CV
			</a>
			<a class="btn" href="mailto:{profile.email}"><Icon name="mail" />Email me</a>
			<span class="socials">
				<a class="icon-link" href={profile.github} rel="me"><Icon name="github" label="GitHub" /></a
				>
				<a class="icon-link" href={profile.linkedin} rel="me">
					<Icon name="linkedin" label="LinkedIn" />
				</a>
			</span>
		</div>

		<div class="rise" style="--i: 5">
			<TrackSwitcher />
		</div>
	</div>
</section>

<!-- Highlights -->
<div class="wrap">
	<dl class="stats">
		{#each stats as s (s.label)}
			<div class="reveal">
				<dt>{s.label}</dt>
				<dd>{s.value}</dd>
			</div>
		{/each}
	</dl>
</div>

<!-- Projects -->
<section class="section" id="projects">
	<div class="wrap">
		<h2 class="section-title">Selected work</h2>
		<div class="featured">
			{#each featured as p, i (p.slug)}
				<ProjectCard project={p} lead={i === 0} />
			{/each}
		</div>

		<div class="more-head">
			<h3>More projects</h3>
			<div class="filters" role="group" aria-label="Filter projects">
				{#each filters as f (f)}
					<button type="button" aria-pressed={filter === f} onclick={() => (filter = f)}>
						{f === 'all' ? 'All' : categoryLabels[f]}
					</button>
				{/each}
			</div>
		</div>
		<ul class="index">
			{#each shown as p (p.slug)}
				<li class="reveal">
					<a class="index-main" href="/projects/{p.slug}">
						<span class="index-title">{p.title}</span>
						<span class="index-tagline">{p.tagline}</span>
					</a>
					<span class="index-meta">
						{#if p.code.status === 'public' && p.code.url}
							<a
								class="icon-link small"
								href={p.code.url}
								target="_blank"
								rel="noopener"
								aria-label="{p.title} code on GitHub"
							>
								<Icon name="github" />
							</a>
						{/if}
						<span class="index-year">{p.year}</span>
					</span>
				</li>
			{:else}
				<li class="empty">Nothing else in this category. The projects above cover it.</li>
			{/each}
		</ul>
	</div>
</section>

<!-- Experience -->
<section class="section" id="experience">
	<div class="wrap">
		<h2 class="section-title">Experience</h2>
		<ol class="timeline">
			{#each experience as r (r.title + r.org)}
				<li class="reveal">
					<div class="when">
						<span>{r.start} - {r.end}</span>
						<span class="place">{r.place}</span>
					</div>
					<div class="what">
						<h3>{r.title}</h3>
						<p class="org">{r.org}</p>
						<ul>
							{#each r.bullets as b (b)}
								<li>{b}</li>
							{/each}
						</ul>
						{#if r.link}
							<a class="role-link" href={r.link.url}>{r.link.label} <Icon name="arrow" /></a>
						{/if}
					</div>
				</li>
			{/each}
		</ol>
		<p class="note">
			<Icon name="lock" />Code I wrote for employers and clients stays private. Happy to walk
			through it in an interview.
		</p>
	</div>
</section>

<!-- Skills & education -->
<section class="section" id="skills">
	<div class="wrap split">
		<div>
			<h2 class="section-title">Skills</h2>
			<dl class="skills">
				{#each orderedSkills as [group, items] (group)}
					<div>
						<dt>{group}</dt>
						<dd>
							{#each items as s (s)}<span class="chip">{s}</span>{/each}
						</dd>
					</div>
				{/each}
			</dl>
		</div>
		<div>
			<h2 class="section-title">Education</h2>
			<div class="edu">
				<h3>{education.degree}</h3>
				<p>{education.school}, {education.place}</p>
				<p class="muted">{education.years}</p>
			</div>
			<h3 class="sub">Certifications</h3>
			<ul class="certs">
				{#each certifications as c (c.name)}
					<li>
						<span class="cert-name">{c.name}</span>
						<span class="cert-issuer">{c.issuer}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- 3D modelling -->
<section class="section" id="modelling">
	<div class="wrap">
		<div class="mods-split">
			<div class="mods-intro">
				<h2 class="section-title">3D modelling and game mods</h2>
				<p class="lede">
					Before software, I made low-poly models for Unturned mods on the Steam Workshop with the
					Normedian modding team. Now I also model woodworking parts and jigs in Blender and
					AutoCAD.
				</p>
				<p class="big-number">
					<strong>{fmt(totalSubscribers)}</strong>
					<span>Steam Workshop subscribers across three mods</span>
				</p>
			</div>
			<ul class="mods">
				{#each mods as m (m.url)}
					<li class="reveal">
						<a href={m.url} target="_blank" rel="noopener">
							<span class="mod-top">
								<span class="mod-title">{m.title}</span>
								<span class="mod-year">{m.year}</span>
							</span>
							<span class="mod-summary">{m.summary}</span>
							<span class="mod-stats">
								<span><strong>{fmt(m.subscribers)}</strong> subscribers</span>
								<span><strong>{fmt(m.visitors)}</strong> visitors</span>
								<span class="mod-link">Steam Workshop <Icon name="external" /></span>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="gallery">
			{#each gallery as g (g.caption)}
				<figure class="reveal {g.kind}">
					<enhanced:img
						src={g.src}
						alt={g.caption}
						sizes="(min-width: 1120px) 520px, (min-width: 640px) 50vw, 100vw"
					/>
					<figcaption>{g.caption}</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>

<!-- Contact -->
<section class="section" id="contact">
	<div class="wrap contact">
		<h2>Hiring for a junior or graduate role?</h2>
		<p class="lede">
			I'm open to remote roles anywhere, and to relocation with sponsorship. Email is the fastest
			way to reach me: <a href="mailto:{profile.email}">{profile.email}</a>
		</p>
		<div class="cta">
			<a class="btn primary" href="mailto:{profile.email}"><Icon name="mail" />Email me</a>
			<a class="btn" href={track.cv} download><Icon name="download" />Download CV</a>
		</div>
	</div>
</section>

<style>
	/* Hero */
	.hero {
		padding-block: clamp(56px, 9vw, 96px) clamp(40px, 6vw, 64px);
	}
	.hero .eyebrow {
		margin-bottom: 18px;
	}
	h1 {
		font-size: clamp(42px, 7vw, 72px);
		font-weight: 600;
		letter-spacing: -0.04em;
		line-height: 1.02;
	}
	.headline {
		margin-top: 16px;
		font-size: clamp(19px, 2.4vw, 24px);
		font-weight: 500;
		letter-spacing: -0.01em;
		color: var(--accent);
	}
	.pitch {
		margin-top: 14px;
		max-width: 56ch;
		font-size: 18px;
		color: var(--muted);
	}
	.cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
		margin-block: 30px 26px;
	}
	.socials {
		display: inline-flex;
		gap: 2px;
		margin-left: 4px;
	}
	.icon-link {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 999px;
		color: var(--muted);
		transition:
			color 0.2s var(--ease-out),
			background 0.2s var(--ease-out);
	}
	.icon-link:hover {
		color: var(--text);
		background: var(--surface-2);
	}
	.icon-link :global(svg) {
		width: 22px;
		height: 22px;
	}
	.icon-link.small {
		width: 32px;
		height: 32px;
	}
	.icon-link.small :global(svg) {
		width: 17px;
		height: 17px;
	}

	/* Highlights: plain figures, no boxes */
	.stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px;
		margin: 0 0 clamp(48px, 7vw, 72px);
		padding-top: 28px;
		border-top: 1px solid var(--line);
	}
	.stats div {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.stats dd {
		order: -1;
		margin: 0;
		font-size: clamp(30px, 4vw, 40px);
		font-weight: 600;
		letter-spacing: -0.03em;
		line-height: 1;
		font-variant-numeric: tabular-nums;
	}
	.stats dt {
		font-size: 14px;
		color: var(--muted);
		max-width: 20ch;
	}
	@media (max-width: 720px) {
		.stats {
			grid-template-columns: repeat(2, 1fr);
			row-gap: 28px;
		}
	}

	/* Featured projects: one lead card across the top, then a 2x2 grid */
	.featured {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px;
	}
	@media (max-width: 760px) {
		.featured {
			grid-template-columns: 1fr;
		}
	}

	/* More projects: an index list, not another card grid */
	.more-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;
		margin: 72px 0 12px;
	}
	.more-head h3 {
		font-size: 22px;
	}
	.filters {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}
	.filters button {
		min-height: 36px;
		padding: 0 14px;
		border: 1px solid var(--line);
		border-radius: 999px;
		background: transparent;
		color: var(--muted);
		font: 500 14px/1 var(--font-sans);
		cursor: pointer;
		transition:
			color 0.2s var(--ease-out),
			background 0.2s var(--ease-out),
			border-color 0.2s var(--ease-out);
	}
	.filters button:hover {
		color: var(--text);
		border-color: var(--muted);
	}
	.filters button:active {
		transform: translateY(1px);
	}
	.filters button[aria-pressed='true'] {
		background: var(--text);
		border-color: var(--text);
		color: var(--bg);
	}
	.index {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		column-gap: 40px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.index li {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 12px;
		margin-inline: -12px;
		border-radius: var(--radius-sm);
		transition: background 0.2s var(--ease-out);
	}
	.index li:hover {
		background: var(--surface);
	}
	.index-main {
		display: flex;
		flex-direction: column;
		gap: 4px;
		text-decoration: none;
		min-width: 0;
	}
	.index-title {
		font-weight: 600;
		font-size: 17px;
	}
	.index-main:hover .index-title {
		color: var(--accent);
	}
	.index-tagline {
		color: var(--muted);
		font-size: 15px;
	}
	.index-meta {
		display: flex;
		align-items: center;
		gap: 8px;
		flex: none;
		font: 12px/1 var(--font-mono);
		color: var(--muted);
	}
	.index-year {
		font-variant-numeric: tabular-nums;
	}
	.empty {
		color: var(--muted);
		padding: 16px 0;
	}
	@media (max-width: 760px) {
		.index {
			grid-template-columns: 1fr;
		}
	}

	/* Experience: dates beside roles, separated by space rather than rules */
	.timeline {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 44px;
	}
	.timeline > li {
		display: grid;
		grid-template-columns: 190px minmax(0, 1fr);
		gap: 32px;
	}
	.when {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding-top: 3px;
		font: 13px/1.4 var(--font-mono);
		color: var(--muted);
		font-variant-numeric: tabular-nums;
	}
	.place {
		font-size: 12px;
	}
	.what {
		max-width: 68ch;
	}
	.what h3 {
		font-size: 20px;
	}
	.org {
		margin-top: 2px;
		color: var(--accent);
		font-weight: 500;
	}
	.what ul {
		margin: 12px 0 0;
		padding-left: 18px;
		display: grid;
		gap: 6px;
		color: var(--muted);
	}
	.what ul li::marker {
		color: var(--line);
	}
	.role-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 12px;
		font-size: 14px;
		font-weight: 500;
		color: var(--accent);
		text-decoration: none;
	}
	.role-link :global(svg) {
		width: 15px;
		height: 15px;
	}
	.note {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 48px;
		color: var(--muted);
		font-size: 14px;
	}
	.note :global(svg) {
		width: 16px;
		height: 16px;
		flex: none;
	}
	@media (max-width: 720px) {
		.timeline > li {
			grid-template-columns: 1fr;
			gap: 8px;
		}
		.when {
			flex-direction: row;
			flex-wrap: wrap;
			gap: 4px 12px;
		}
	}

	/* Skills & education */
	.split {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 56px;
	}
	@media (max-width: 860px) {
		.split {
			grid-template-columns: 1fr;
		}
	}
	.skills {
		margin: 0;
		display: grid;
		gap: 22px;
	}
	.skills dt {
		font-weight: 600;
		margin-bottom: 10px;
	}
	.skills dd {
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.edu {
		padding: 22px;
		border-radius: var(--radius);
		background: var(--surface);
		border: 1px solid var(--line);
		display: grid;
		gap: 4px;
	}
	.edu h3 {
		font-size: 19px;
	}
	.muted {
		color: var(--muted);
		font-size: 14px;
	}
	.sub {
		font-size: 17px;
		margin: 32px 0 14px;
	}
	.certs {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 18px 24px;
	}
	.certs li {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.cert-name {
		font-weight: 500;
		font-size: 15px;
	}
	.cert-issuer {
		font-size: 13px;
		color: var(--muted);
	}
	@media (max-width: 480px) {
		.certs {
			grid-template-columns: 1fr;
		}
	}

	/* 3D modelling: intro and headline number beside the mod list, then one gallery grid */
	.mods-split {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: 56px;
		align-items: start;
		margin-bottom: 48px;
	}
	@media (max-width: 860px) {
		.mods-split {
			grid-template-columns: 1fr;
			gap: 32px;
		}
	}
	.lede {
		max-width: 60ch;
		color: var(--muted);
	}
	.big-number {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-top: 32px;
	}
	.big-number strong {
		font-size: clamp(44px, 6vw, 64px);
		font-weight: 600;
		letter-spacing: -0.04em;
		line-height: 1;
		color: var(--accent);
		font-variant-numeric: tabular-nums;
	}
	.big-number span {
		color: var(--muted);
		font-size: 15px;
	}
	.mods {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 6px;
	}
	.mods a {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 18px 20px;
		border-radius: var(--radius);
		text-decoration: none;
		transition: background 0.2s var(--ease-out);
	}
	.mods a:hover {
		background: var(--surface);
	}
	.mod-top {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
	}
	.mod-title {
		font-size: 19px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}
	.mod-year {
		font: 12px/1 var(--font-mono);
		color: var(--muted);
	}
	.mod-summary {
		color: var(--muted);
		font-size: 15px;
	}
	.mod-stats {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 4px 18px;
		font-size: 14px;
		color: var(--muted);
	}
	.mod-stats strong {
		color: var(--text);
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}
	.mod-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		margin-left: auto;
		font-weight: 500;
		color: var(--accent);
	}
	.mod-link :global(svg) {
		width: 15px;
		height: 15px;
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 12px;
	}
	.gallery .wide {
		grid-column: span 2;
	}
	@media (max-width: 860px) {
		.gallery {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 480px) {
		.gallery {
			grid-template-columns: 1fr;
		}
		.gallery .wide {
			grid-column: auto;
		}
		.wide :global(img) {
			aspect-ratio: 16 / 10;
		}
	}
	figure {
		margin: 0;
		border-radius: var(--radius);
		overflow: hidden;
		background: var(--surface);
		border: 1px solid var(--line);
	}
	/* Renders have light or transparent backgrounds, so they sit on a fixed light "paper" in both themes. */
	figure :global(img) {
		width: 100%;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		background: #ececee;
	}
	/* Twice as wide at the same height as a single cell. */
	.wide :global(img) {
		aspect-ratio: 32 / 10;
	}
	.cad :global(img) {
		object-fit: contain;
		padding: 8px;
	}
	figcaption {
		padding: 10px 14px;
		font-size: 13px;
		color: var(--muted);
	}

	/* Contact */
	.contact h2 {
		font-size: clamp(32px, 5.5vw, 56px);
		letter-spacing: -0.035em;
		margin-bottom: 18px;
		max-width: 18ch;
	}
	.contact .lede a {
		color: var(--text);
		text-underline-offset: 3px;
	}
	.contact .lede a:hover {
		color: var(--accent);
	}
</style>
