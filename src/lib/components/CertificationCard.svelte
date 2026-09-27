<script lang="ts">
	export let title: string;
	export let issuer: string;
	export let date: string;
	export let link: string = '#';
	export let badge: string | null = null;
	export let description: string;

	let cardElement: HTMLAnchorElement;
	let mouseX = 0;
	let mouseY = 0;
	let opacity = 0;

	function handleMouseMove(e: MouseEvent) {
		if (!cardElement) return;
		const rect = cardElement.getBoundingClientRect();
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
	rel="noreferrer"
	bind:this={cardElement}
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
	class="group relative grid grid-cols-1 gap-4 overflow-hidden rounded-md p-4 transition-all sm:grid-cols-8 lg:group-hover/list:opacity-50 lg:hover:!opacity-100"
>
	<div
		class="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
		style="background: radial-gradient(600px circle at {mouseX}px {mouseY}px, var(--glow-strong), transparent 40%); opacity: {opacity};"
	></div>

	<div
		class="lg:group-hover:bg-bg-card/50 absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition lg:-inset-x-6 lg:block lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)]"
	></div>

	<header class="z-10 flex flex-col items-center gap-4 pt-1 sm:col-span-3">
		{#if badge}
			<div class="w-full max-w-[140px] transition-transform duration-500 group-hover:scale-110">
				<img
					src={badge}
					alt={`${issuer} badge`}
					class="h-auto w-full object-contain opacity-100 transition-all duration-500"
				/>
			</div>
		{/if}
		<span class="text-cloud-dim text-xs font-mono font-semibold tracking-wide uppercase">
			{date}
		</span>
	</header>

	<div class="relative z-10 flex flex-col justify-center pt-1 sm:col-span-5">
		<h3 class="text-cloud leading-snug font-medium text-xl">
			<span
				class="text-cloud group-hover:text-reze inline-flex items-baseline leading-tight font-medium transition-colors"
			>
				{title} · {issuer}
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
		</h3>

		<p class="text-cloud-dim mt-3 text-sm leading-relaxed">
			{description}
		</p>
	</div>
</a>
