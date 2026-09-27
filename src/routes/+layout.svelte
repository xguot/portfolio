<script lang="ts">
	import '../app.css';
	import Socials from '$lib/components/Socials.svelte';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';

	let mouseX = 0;
	let mouseY = 0;

	// Discrete photon specks that orbit the flashlight, rendering light as
	// quantized packets (particle nature) instead of a continuous glow.
	const photonDots = Array.from({ length: 20 }, (_, i) => {
		const angle = (i / 20) * Math.PI * 2;
		const radius = 50 + (i % 4) * 26;
		return {
			left: 140 + Math.cos(angle) * radius,
			top: 140 + Math.sin(angle) * radius,
			size: 2 + (i % 3),
			duration: 2 + (i % 5) * 0.7,
			delay: (i % 7) * 0.35
		};
	});

	function handleMouseMove(event: MouseEvent) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}
</script>

<svelte:window on:mousemove={handleMouseMove} />

<div
	class="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
	style="background: radial-gradient(var(--glow-size) at {mouseX}px {mouseY}px, var(--glow), transparent 80%);"
></div>

<div
	class="pointer-events-none fixed top-0 left-0 z-30 hidden size-70 dark:block"
	style="transform: translate({mouseX - 140}px, {mouseY - 140}px);"
	aria-hidden="true"
>
	<div
		class="absolute inset-0 rounded-full opacity-70"
		style="background: radial-gradient(circle, var(--glow-strong), transparent 45%);"
	></div>
	{#each photonDots as dot, i (i)}
		<span
			class="bg-reze absolute rounded-full motion-safe:animate-twinkle motion-reduce:opacity-50"
			style="left: {dot.left}px; top: {dot.top}px; width: {dot.size}px; height: {dot.size}px; animation-duration: {dot.duration}s; animation-delay: {dot.delay}s; box-shadow: 0 0 {dot.size * 2}px var(--color-reze);"
		></span>
	{/each}
</div>

<div class="mx-auto min-h-screen max-w-screen-2xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
	<div class="lg:flex lg:justify-between lg:gap-4">
		<header
			class="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-4/12 lg:flex-col lg:justify-between lg:py-24"
		>
			<div>
				<img
					src="/profile.jpg"
					alt="Xiyuan (Tommy) Guo"
					class="mb-6 size-24 rounded-full border-2 border-reze/40 object-cover shadow-lg sm:size-28"
				/>
				<h1 class="text-cloud text-4xl font-bold tracking-tight sm:text-5xl">
					<a href="/">Xiyuan (Tommy) Guo</a>
				</h1>
				<h2 class="text-cloud-dim mt-3 text-lg font-medium tracking-tight sm:text-xl">
					Quantum Computing Researcher · CS @ UVA
				</h2>
				<p class="text-cloud-dim mt-4 max-w-xs leading-normal">
					Applying convex optimization and GPU-accelerated numerical linear algebra to
					quantum state reconstruction and quantum materials.
				</p>

				<nav class="mt-16 hidden lg:block">
					<ul class="w-max">
						{#each ['about', 'experience', 'projects'] as item}
							<li>
								<a
									href="#{item}"
									class="group text-cloud-dim hover:text-cloud flex items-center py-3 text-xs font-bold tracking-widest uppercase"
								>
									<span
										class="bg-cloud-dim group-hover:bg-reze mr-4 h-px w-8 transition-all duration-300 group-hover:w-16"
									></span>
									{item}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>

			<Socials />
		</header>

		<main class="pt-24 lg:w-7/12 lg:py-24">
			<slot />
		</main>
	</div>
</div>

<ThemeSwitch />
