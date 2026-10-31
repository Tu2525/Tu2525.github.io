<script lang="ts">
	import { onMount } from 'svelte';

	// Cursor ripples drawn as code glyphs. A height-field wave sim that sleeps once the water is still.
	const CELL = 14;
	const GLYPHS = ' .:/=<>{}#';
	const DAMP = 0.975;
	const FRAME_MS = 33;

	let canvas: HTMLCanvasElement;

	onMount(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const ctx = canvas.getContext('2d')!;
		let w = 0;
		let h = 0;
		let dpr = 1;
		let cur = new Float32Array(0);
		let prev = new Float32Array(0);
		let raf = 0;
		let last = 0;

		const wake = () => {
			if (!raf) raf = requestAnimationFrame(frame);
		};

		const resize = () => {
			const r = canvas.getBoundingClientRect();
			dpr = Math.min(devicePixelRatio || 1, 2);
			canvas.width = r.width * dpr;
			canvas.height = r.height * dpr;
			w = Math.ceil(r.width / CELL);
			h = Math.ceil(r.height / CELL);
			cur = new Float32Array(w * h);
			prev = new Float32Array(w * h);
		};

		const frame = (now: number) => {
			raf = requestAnimationFrame(frame);
			if (now - last < FRAME_MS) return;
			last = now;

			for (let y = 1; y < h - 1; y++) {
				for (let x = 1; x < w - 1; x++) {
					const i = y * w + x;
					prev[i] = ((cur[i - 1] + cur[i + 1] + cur[i - w] + cur[i + w]) / 2 - prev[i]) * DAMP;
				}
			}
			[cur, prev] = [prev, cur];

			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.clearRect(0, 0, w * CELL, h * CELL);
			ctx.font = `500 ${CELL - 2}px "Geist Mono Variable", ui-monospace, monospace`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillStyle = getComputedStyle(canvas).getPropertyValue('--muted');

			let drawn = 0;
			const top = GLYPHS.length - 1;
			for (let y = 1; y < h - 1; y++) {
				for (let x = 1; x < w - 1; x++) {
					const a = Math.abs(cur[y * w + x]);
					if (a < 0.15) continue;
					const level = Math.min(top, 1 + Math.floor(a * 1.5));
					ctx.globalAlpha = 0.2 + (0.5 * level) / top;
					ctx.fillText(GLYPHS[level], x * CELL + CELL / 2, y * CELL + CELL / 2);
					drawn++;
				}
			}

			if (!drawn) {
				cancelAnimationFrame(raf);
				raf = 0;
			}
		};

		const splash = (x: number, y: number) => {
			if (x < 1 || y < 1 || x >= w - 1 || y >= h - 1) return;
			const i = y * w + x;
			cur[i] = Math.min(cur[i] + 5, 10);
			wake();
		};

		// Splash along the path since the last event so fast moves leave a continuous wake.
		let px = -1;
		let py = -1;
		const move = (e: PointerEvent) => {
			const r = canvas.getBoundingClientRect();
			const x = Math.floor((e.clientX - r.left) / CELL);
			const y = Math.floor((e.clientY - r.top) / CELL);
			const steps = px < 0 ? 1 : Math.max(Math.abs(x - px), Math.abs(y - py), 1);
			for (let s = 1; s <= steps; s++) {
				const t = s / steps;
				splash(Math.round(px < 0 ? x : px + (x - px) * t), Math.round(py < 0 ? y : py + (y - py) * t));
			}
			px = x;
			py = y;
		};

		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas);
		addEventListener('pointermove', move, { passive: true });
		// One drop on load so the effect shows before the cursor reaches it.
		splash(Math.floor(w * 0.7), Math.floor(h * 0.45));

		return () => {
			cancelAnimationFrame(raf);
			removeEventListener('pointermove', move);
			ro.disconnect();
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
	canvas {
		position: absolute;
		inset: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		pointer-events: none;
		-webkit-mask-image: linear-gradient(to bottom, #000 55%, transparent);
		mask-image: linear-gradient(to bottom, #000 55%, transparent);
	}
</style>
