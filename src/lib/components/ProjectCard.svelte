<script lang="ts">
	export let title: string;
	export let description: string;
	export let tags: string[] = [];
	export let link: string = '#';
	export let stars: number | string | null = null;
	export let thumbnail: string | null = null;
	export let hnRanking: string | number | null = null;
	export let hnLink: string | null = null;

	let divElement: HTMLDivElement;
	let mouseX = 0;
	let mouseY = 0;
	let opacity = 0;

	function handleMouseMove(e: MouseEvent) {
		if (!divElement) return;
		const rect = divElement.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = e.clientY - rect.top;
		opacity = 1;
	}

	function handleMouseLeave() {
		opacity = 0;
	}
</script>

<div
	bind:this={divElement}
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
	class="group relative grid overflow-hidden rounded-md p-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:!opacity-100"
>
	<div
		class="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
		style="background: radial-gradient(600px circle at {mouseX}px {mouseY}px, var(--glow-strong), transparent 40%); opacity: {opacity};"
	></div>

	<a
		href={link}
		target="_blank"
		rel="noreferrer"
		class="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition lg:-inset-x-6 lg:block lg:group-hover:bg-bg-card/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]"
	></a>

	{#if thumbnail}
		<div class="z-10 mb-4 w-32 pt-1 sm:col-span-3 sm:mb-0 sm:w-auto">
			<div class="border-cloud-dim/10 bg-bg-card overflow-hidden rounded border-2 shadow-2xl">
				<img
					src={thumbnail}
					alt={`${title} preview`}
					class="h-auto w-full opacity-90 grayscale-0 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 sm:opacity-80 sm:grayscale"
				/>
			</div>
		</div>
	{/if}

	<div
		class="relative z-10 {thumbnail
			? 'sm:col-span-5'
			: 'sm:col-span-8'} flex flex-col justify-center"
	>
		<h3 class="text-cloud text-lg leading-snug font-medium">
			<a
				href={link}
				target="_blank"
				rel="noreferrer"
				class="text-cloud group-hover:text-reze inline-flex items-baseline leading-tight font-medium transition-colors"
			>
				{title}
				<svg
					class="ml-1 h-4 w-4 shrink-0 translate-y-px transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
						clip-rule="evenodd"
					/>
				</svg>
			</a>
		</h3>

		<p class="text-cloud-dim mt-2 text-sm leading-normal">
			{description}
		</p>

		<div class="mt-3 flex items-center gap-4">
			{#if hnRanking}
				<a
					href={hnLink}
					target="_blank"
					class="text-cloud-dim relative z-20 flex items-center gap-1.5 font-mono text-xs transition-colors hover:text-[#ff6600]"
				>
					<span class="font-bold text-[#ff6600]">Y</span> HN #{hnRanking}
				</a>
			{/if}

			{#if stars}
				<div
					class="text-cloud-dim group-hover:text-cloud flex items-center gap-1.5 font-mono text-xs transition-colors"
				>
					<span class="text-reze">★</span>
					{stars}
				</div>
			{/if}
		</div>

		<ul class="mt-4 flex flex-wrap gap-2">
			{#each tags as tag}
				<li
					class="bg-reze-dim text-reze flex items-center rounded-full px-3 py-1 font-mono text-[10px] leading-5 font-semibold tracking-wider uppercase"
				>
					{tag}
				</li>
			{/each}
		</ul>
	</div>
</div>
