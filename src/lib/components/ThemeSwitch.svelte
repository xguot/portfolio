<script lang="ts">
	import { onMount } from 'svelte';

	let theme = $state('light');
	let showLabel = $state(false);
	let labelTimer: ReturnType<typeof setTimeout> | undefined;

	const themeColors: Record<string, string> = { light: '#fdfefd', dark: '#101018' };

	function applyTheme(next: string, persist = false) {
		theme = next;
		document.documentElement.classList.toggle('dark', next === 'dark');
		if (persist) localStorage.setItem('theme', next);
		const meta = document.querySelector('meta[name="theme-color"]');
		if (meta) meta.setAttribute('content', themeColors[next]);
	}

	onMount(() => {
		const stored = localStorage.getItem('theme');
		const initial = stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		applyTheme(initial);
	});

	function toggle() {
		applyTheme(theme === 'dark' ? 'light' : 'dark', true);
	}

	function handlePull() {
		toggle();
		clearTimeout(labelTimer);
		showLabel = true;
		labelTimer = setTimeout(() => {
			showLabel = false;
		}, 900);
	}
</script>

<div class="pointer-events-none fixed right-4 bottom-4 z-40 sm:right-6 lg:top-4 lg:right-8 lg:bottom-auto">
	<div class="pointer-events-auto flex flex-col items-center">
		<div aria-hidden="true" class="h-10 w-px bg-reze/30 transition-colors duration-300 sm:h-12"></div>
		<div class="relative -translate-y-1">
			<span
				class="bg-reze-dim/60 border-cloud/15 absolute inset-0 m-auto block size-9 rounded-full blur-xl transition-colors duration-500"
				aria-hidden="true"
			></span>
			<span
				aria-hidden="true"
				class="text-reze/60 absolute inset-0 m-auto flex size-9 animate-pulse items-center justify-center rounded-full border-2 border-transparent"
			></span>
			<button
				type="button"
				onclick={handlePull}
				aria-pressed={theme === 'dark'}
				aria-label={theme === 'dark' ? 'Switch to day theme' : 'Switch to night theme'}
				title="Pull to change theme"
				class="group relative flex size-11 cursor-pointer flex-col items-center rounded-full border-2 border-cloud/15 bg-bg-card shadow-lg transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-reze sm:size-12"
			>
				<span
					class="bg-cloud/30 absolute top-2 h-2 w-2 rounded-full transition-colors duration-300"
					aria-hidden="true"
				></span>
				<span
					class="text-reze absolute top-4.5 text-[10px] leading-none transition-colors duration-300"
					aria-hidden="true"
				>
					{theme === 'dark' ? '◐' : '◑'}
				</span>
				<span
					class="border-cloud/15 absolute -bottom-5 h-4 w-px border-l transition-colors duration-300"
					aria-hidden="true"
				></span>
				<span
					class="bg-cloud-dim group-hover:bg-reze absolute -bottom-8 h-3 w-2.5 rounded-b-full transition-all duration-300 group-hover:-bottom-9"
					aria-hidden="true"
				></span>
			</button>
		</div>

		<span
			class="text-cloud-dim bg-bg-card/80 border-cloud/10 text-[11px] rounded-full border px-2.5 py-1 whitespace-nowrap shadow-sm transition-opacity duration-300 {showLabel
				? 'opacity-100'
				: 'opacity-0'}"
			aria-live="polite"
		>
			{theme === 'dark' ? 'Night' : 'Day'}
		</span>
	</div>
</div>
