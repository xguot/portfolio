<script lang="ts">
	import { onMount } from 'svelte';

	let theme = $state('light');
	let pulled = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const themeColors: Record<string, string> = { light: '#fdfefd', dark: '#060806' };

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
		pulled = true;
		clearTimeout(timer);
		timer = setTimeout(() => (pulled = false), 450);
	}
</script>

<div
	class="fixed top-0 right-6 z-40 flex flex-col items-center transition-transform duration-300 ease-out {pulled
		? '-translate-y-2'
		: ''}"
>
	<div class="bg-cloud/25 h-7 w-px sm:h-9" aria-hidden="true"></div>

	<button
		type="button"
		onclick={toggle}
		aria-pressed={theme === 'dark'}
		aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
		class="group relative flex size-10 cursor-pointer items-center justify-center rounded-full border border-cloud/15 bg-bg-card shadow-md transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-reze motion-safe:group-hover:animate-pull-sway motion-reduce:transition-none sm:size-11"
	>
		<span
			class="absolute inset-0 rounded-full blur-md transition-opacity duration-300 {theme === 'dark'
				? 'bg-reze/25 opacity-100'
				: 'bg-amber-300/20 opacity-100'}"
			aria-hidden="true"
		></span>
		<span
			class="absolute inset-0 rounded-full border border-reze/30 transition-opacity duration-300 {theme === 'dark'
				? 'opacity-100'
				: 'opacity-0'}"
			aria-hidden="true"
		></span>

		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.8"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="relative size-4.5 {theme === 'dark' ? 'text-reze' : 'text-amber-500'}"
			aria-hidden="true"
		>
			{#if theme === 'dark'}
				<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path>
			{:else}
				<circle cx="12" cy="12" r="4.5"></circle>
				<path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6"></path>
			{/if}
		</svg>
	</button>

	<div class="bg-cloud/25 h-4 w-px" aria-hidden="true"></div>
	<div
		class="bg-cloud/40 h-1.5 w-1.5 rounded-full"
		aria-hidden="true"
	></div>
</div>
