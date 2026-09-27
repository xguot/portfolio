<script lang="ts">
	export let date: string;
	export let title: string;
	export let company: string;
	export let description: string;
	export let skills: string[] = [];
	export let link: string = '#';

	let card: HTMLAnchorElement;
	let mouseX = 0;
	let mouseY = 0;
	let opacity = 0;

	function handleMouseMove(e: MouseEvent) {
		if (!card) return;
		const rect = card.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
		opacity = 1;
	}

	function handleMouseLeave() {
		opacity = 0;
	}
</script>

<a
	href={link}
	target="_blank"
	bind:this={card}
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
	class="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:!opacity-100"
>
	<div
		class="lg:group-hover:bg-bg-card/50 pointer-events-none absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"
	>
		<div
			class="absolute inset-0 z-0 opacity-0 transition duration-300 group-hover:opacity-100"
			style="
                background: radial-gradient(
                    600px circle at {mouseX}px {mouseY}px,
                    var(--glow-strong),
                    transparent 40%
                );
            "
		></div>
	</div>

	<header
		class="text-cloud-dim z-10 mt-1 mb-2 text-xs font-semibold tracking-wide uppercase sm:col-span-2"
		aria-label={date}
	>
		{date}
	</header>

	<div class="z-10 sm:col-span-6">
		<h3 class="text-cloud leading-snug font-medium">
			<div>
				<span
					class="text-cloud group-hover:text-reze inline-flex items-baseline leading-tight font-medium transition-colors"
				>
					{title} ·&nbsp;<span class="inline-block">{company}</span>
					<svg
						class="ml-1 h-4 w-4 shrink-0 translate-y-px transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
						viewBox="0 0 20 20"
						fill="currentColor"
						><path
							fill-rule="evenodd"
							d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
							clip-rule="evenodd"
						/></svg
					>
				</span>
			</div>
		</h3>
		<p class="text-cloud-dim mt-2 text-sm leading-normal">
			{description}
		</p>
		<ul class="mt-2 flex flex-wrap gap-2">
			{#each skills as skill}
				<li
					class="bg-reze-dim text-reze flex items-center rounded-full px-3 py-1 font-mono text-xs leading-5 font-medium"
				>
					{skill}
				</li>
			{/each}
		</ul>
	</div>
</a>
