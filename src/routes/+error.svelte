<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} · Tarek Darwish</title>
</svelte:head>

<section class="wrap err">
	<p class="eyebrow">Error {page.status}</p>
	<h1>{page.status === 404 ? 'This page does not exist.' : 'Something went wrong.'}</h1>
	<a class="btn primary" href="/">Back to the home page</a>
</section>

<style>
	.err {
		padding-block: 120px;
		display: grid;
		gap: 20px;
		justify-items: start;
	}
	h1 {
		font-size: clamp(32px, 5vw, 48px);
	}
</style>
