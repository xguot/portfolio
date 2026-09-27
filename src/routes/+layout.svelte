<script lang="ts">
	import '../app.css';
	import Socials from '$lib/components/Socials.svelte';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';

	let mouseX = 0;
	let mouseY = 0;

	function handleMouseMove(event: MouseEvent) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}
</script>

<svelte:window on:mousemove={handleMouseMove} />

<div
	class="pointer-events-none fixed inset-0 z-30 dark:hidden"
	style="background: radial-gradient(600px at {mouseX}px {mouseY}px, var(--glow), transparent 80%);"
></div>

<div
	class="pointer-events-none fixed top-0 left-0 z-30 hidden dark:block"
	style="transform: translate({mouseX}px, {mouseY}px);"
	aria-hidden="true"
>
	<div
		class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
		style="width: 380px; height: 380px; background: radial-gradient(circle, var(--glow), transparent 65%);"
	></div>
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
					Undergraduate Researcher · Quantum Computing · CS @ UVA
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
