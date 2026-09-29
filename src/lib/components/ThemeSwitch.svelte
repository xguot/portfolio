<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';

	let theme = $state('light');
	let pulled = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;

	const themeColors: Record<string, string> = { light: '#fdfefd', dark: '#000000' };

	function applyTheme(next: string, persist = false) {
		theme = next;
		document.documentElement.classList.toggle('dark', next === 'dark');
		if (persist) localStorage.setItem('theme', next);
		const meta = document.querySelector('meta[name="theme-color"]');
		if (meta) meta.setAttribute('content', themeColors[next]);
	}

	onMount(() => {
		const stored = localStorage.getItem('theme');
		const initial =
			stored ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
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
	class="fixed top-0 right-4 z-40 flex flex-col items-center transition-transform duration-300 ease-out sm:right-6 {pulled
		? '-translate-y-2'
		: ''}"
>
	<button
		type="button"
		onclick={toggle}
		aria-pressed={theme === 'dark'}
		aria-label={theme === 'dark' ? $t('switchToLight') : $t('switchToDark')}
		title={theme === 'dark' ? $t('switchToLight') : $t('switchToDark')}
		class="group focus-visible:outline-reze flex cursor-pointer flex-col items-center px-3 pb-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
	>
		<span
			class="bg-cloud/25 group-hover:bg-cloud/40 h-9 w-px transition-colors sm:h-11"
			aria-hidden="true"
		></span>
		<span class="bg-cloud/25 group-hover:bg-cloud/40 h-5 w-px transition-colors" aria-hidden="true"
		></span>
		<span
			class="bg-cloud/40 group-hover:bg-reze h-2 w-2 rounded-full transition-colors"
			aria-hidden="true"
		></span>
	</button>
</div>
