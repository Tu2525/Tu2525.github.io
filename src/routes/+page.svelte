<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import TrackSwitcher from '$lib/components/TrackSwitcher.svelte';
	import { projects, categoryLabels, type Category } from '$lib/data/projects';
	import { profile, experience, skills, education, certifications } from '$lib/data/profile';
	import { tracks } from '$lib/data/tracks';
	import { trackState, readTrackFromUrl, currentTrack } from '$lib/track.svelte';

	import keyedPlateIso from '$lib/assets/gallery/keyed-plate-iso.png?enhanced';
	import keyedPlateTop from '$lib/assets/gallery/keyed-plate-top.png?enhanced';
	import clampBlock from '$lib/assets/gallery/clamp-block-iso.png?enhanced';
	import hopeChest from '$lib/assets/gallery/hope-chest-drawing.png?enhanced';
	import sharpening from '$lib/assets/gallery/sharpening-drawing.png?enhanced';

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
		{ value: '15+', label: 'students taught ML & Flutter' }
	];

	const gallery = [
		{ src: keyedPlateIso, caption: 'Keyed mounting plate, isometric' },
		{ src: clampBlock, caption: 'Split clamp block, isometric' },
		{ src: keyedPlateTop, caption: 'Keyed mounting plate, top view' },
		{ src: sharpening, caption: 'Sharpening station part, dimensioned' },
		{ src: hopeChest, caption: 'Hope chest panel, dimensioned' }
	];

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
		<p class="eyebrow">{profile.location} · Open to remote &amp; relocation</p>
		<h1>{profile.name}</h1>
		<p class="headline">{track.headline}</p>
		<p class="summary">{track.summary}</p>

		<div class="cta">
			<a class="btn primary" href={track.cv} download>
				<Icon name="download" />Download CV{track.id === 'general' ? '' : ` (${track.label})`}
			</a>
			<a class="btn" href={profile.github} rel="me"><Icon name="github" />GitHub</a>
			<a class="btn" href={profile.linkedin} rel="me"><Icon name="linkedin" />LinkedIn</a>
			<a class="btn" href="mailto:{profile.email}"><Icon name="mail" />Email</a>
		</div>

		<TrackSwitcher />

		<dl class="stats">
			{#each stats as s}
				<div>
					<dt>{s.label}</dt>
					<dd>{s.value}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>

<!-- Featured projects -->
<section class="section" id="projects">
	<div class="wrap">
		<p class="eyebrow">Selected work</p>
		<h2 class="section-title">Featured projects</h2>
		<div class="grid featured">
			{#each featured as p (p.slug)}
				<ProjectCard project={p} featured />
			{/each}
		</div>

		<div class="more-head">
			<h3>More projects</h3>
			<div class="filters" role="group" aria-label="Filter projects">
				{#each filters as f}
					<button type="button" aria-pressed={filter === f} onclick={() => (filter = f)}>
						{f === 'all' ? 'All' : categoryLabels[f]}
					</button>
				{/each}
			</div>
		</div>
		<div class="grid compact">
			{#each shown as p (p.slug)}
				<ProjectCard project={p} />
			{:else}
				<p class="empty">No other projects in this category. The featured ones above cover it.</p>
			{/each}
		</div>
	</div>
</section>

<!-- Experience -->
<section class="section" id="experience">
	<div class="wrap">
		<p class="eyebrow">Experience</p>
		<h2 class="section-title">Where I've worked</h2>
		<ol class="timeline">
			{#each experience as r}
				<li>
					<div class="when">
						<span>{r.start} – {r.end}</span>
						<span class="place">{r.place}</span>
					</div>
					<div class="what">
						<h3>{r.title} <span class="org">· {r.org}</span></h3>
						<ul>
							{#each r.bullets as b}
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
			<Icon name="lock" />Code written for employers and clients stays private. Ask me about it in
			an interview.
		</p>
	</div>
</section>

<!-- Skills & education -->
<section class="section" id="skills">
	<div class="wrap two-col">
		<div>
			<p class="eyebrow">Toolbox</p>
			<h2 class="section-title">Skills</h2>
			<dl class="skills">
				{#each orderedSkills as [group, items] (group)}
					<div>
						<dt>{group}</dt>
						<dd>
							{#each items as s}<span class="chip">{s}</span>{/each}
						</dd>
					</div>
				{/each}
			</dl>
		</div>
		<div>
			<p class="eyebrow">Education</p>
			<h2 class="section-title">Education &amp; certifications</h2>
			<div class="edu">
				<h3>{education.degree}</h3>
				<p>{education.school} · {education.place}</p>
				<p class="muted">{education.years}</p>
			</div>
			<ul class="certs">
				{#each certifications as c}
					<li>{c}</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<!-- CAD / 3D -->
<section class="section" id="cad">
	<div class="wrap">
		<p class="eyebrow">Beyond code</p>
		<h2 class="section-title">CAD &amp; 3D modelling</h2>
		<p class="lede">
			Woodworking parts and jigs modelled in Blender and AutoCAD, from dimensioned drawings to
			textured renders.
		</p>
		<div class="gallery">
			{#each gallery as g}
				<figure>
					<enhanced:img
						src={g.src}
						alt={g.caption}
						sizes="(min-width: 1080px) 340px, (min-width: 640px) 45vw, 90vw"
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
		<p class="eyebrow">Contact</p>
		<h2>Hiring for a junior or graduate role?</h2>
		<p class="lede">
			I'm open to remote roles anywhere and to relocation with sponsorship. The fastest way to reach
			me is email.
		</p>
		<div class="cta">
			<a class="btn primary" href="mailto:{profile.email}"><Icon name="mail" />{profile.email}</a>
			<a class="btn" href={track.cv} download><Icon name="download" />CV (PDF)</a>
		</div>
	</div>
</section>

<style>
	/* Hero */
	.hero {
		padding-block: clamp(48px, 10vw, 104px) clamp(40px, 7vw, 72px);
	}
	h1 {
		font-size: clamp(40px, 7.5vw, 76px);
		letter-spacing: -0.035em;
	}
	.headline {
		margin-top: 14px;
		font-family: var(--font-display);
		font-size: clamp(19px, 2.6vw, 26px);
		font-weight: 500;
		color: var(--accent);
	}
	.summary {
		margin-top: 18px;
		max-width: 68ch;
		font-size: 17px;
		color: var(--muted);
	}
	.cta {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-block: 28px;
	}
	.stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1px;
		margin: 40px 0 0;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		overflow: hidden;
		background: var(--line);
	}
	.stats div {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 18px 20px;
		background: var(--surface);
	}
	.stats dd {
		order: -1;
		margin: 0;
		font: 600 30px/1 var(--font-display);
	}
	.stats dt {
		font-size: 13px;
		color: var(--muted);
	}
	@media (max-width: 720px) {
		.stats {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* Projects */
	.grid {
		display: grid;
		gap: 16px;
	}
	.grid.featured {
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 440px), 1fr));
	}
	.grid.compact {
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
	}
	.more-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 12px;
		margin: 56px 0 20px;
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
		background: var(--surface);
		color: var(--muted);
		font: 500 14px/1 var(--font-sans);
		cursor: pointer;
	}
	.filters button:hover {
		color: var(--text);
	}
	.filters button[aria-pressed='true'] {
		background: var(--text);
		border-color: var(--text);
		color: var(--bg);
	}
	.empty {
		color: var(--muted);
	}

	/* Experience */
	.timeline {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.timeline > li {
		display: grid;
		grid-template-columns: 200px 1fr;
		gap: 24px;
		padding-block: 24px;
		border-top: 1px solid var(--line);
	}
	.timeline > li:first-child {
		border-top: 0;
		padding-top: 0;
	}
	.when {
		display: flex;
		flex-direction: column;
		gap: 4px;
		font: 13px/1.4 var(--font-mono);
		color: var(--muted);
	}
	.place {
		font-size: 12px;
		opacity: 0.85;
	}
	.what h3 {
		font-size: 19px;
	}
	.org {
		color: var(--muted);
		font-weight: 500;
	}
	.what ul {
		margin: 10px 0 0;
		padding-left: 18px;
		display: grid;
		gap: 6px;
		color: var(--muted);
	}
	.what ul li::marker {
		color: var(--accent);
	}
	.role-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 10px;
		font-size: 14px;
		font-weight: 600;
		color: var(--accent);
		text-decoration: none;
	}
	.role-link :global(svg) {
		width: 14px;
		height: 14px;
	}
	.note {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 28px;
		padding: 14px 16px;
		border: 1px dashed var(--line);
		border-radius: var(--radius-sm);
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
	.two-col {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 48px;
	}
	@media (max-width: 860px) {
		.two-col {
			grid-template-columns: 1fr;
		}
	}
	.skills {
		margin: 0;
		display: grid;
		gap: 20px;
	}
	.skills dt {
		font-weight: 600;
		margin-bottom: 8px;
	}
	.skills dd {
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.edu {
		padding: 20px;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: var(--surface);
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
	.certs {
		margin: 20px 0 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 0;
	}
	.certs li {
		padding: 10px 0;
		border-bottom: 1px solid var(--line);
		font-size: 15px;
	}

	/* Gallery */
	.lede {
		max-width: 62ch;
		color: var(--muted);
		margin: -16px 0 28px;
	}
	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
		gap: 16px;
	}
	figure {
		margin: 0;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		overflow: hidden;
		background: var(--surface);
	}
	/* Renders are transparent and the drawings are black line art, so they sit on a fixed light "paper" in both themes. */
	figure :global(img) {
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: contain;
		padding: 10px;
		background: #efede7;
	}
	figcaption {
		padding: 12px 14px;
		font-size: 14px;
		color: var(--muted);
	}

	/* Contact */
	.contact h2 {
		font-size: clamp(30px, 5vw, 48px);
		margin-bottom: 18px;
		max-width: 20ch;
	}
	.contact .lede {
		margin: 0;
	}
</style>
