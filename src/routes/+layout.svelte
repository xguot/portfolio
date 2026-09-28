<script lang="ts">
	import '../app.css';
	import Socials from '$lib/components/Socials.svelte';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import LanguageToggle from '$lib/components/LanguageToggle.svelte';
	import { t, isZh, lang } from '$lib/i18n';
	import { onMount } from 'svelte';

	let mouseX = $state(0);
	let mouseY = $state(0);
	let measured = $state(false);
	let measureTimer: ReturnType<typeof setTimeout> | undefined;

	let { children } = $props();

	function handleMouseMove(event: MouseEvent) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}

	function measure() {
		measured = true;
		clearTimeout(measureTimer);
		measureTimer = setTimeout(() => (measured = false), 1200);
	}

	onMount(() => {
		document.documentElement.lang = $lang === 'zh' ? 'zh-CN' : 'en';
	});
</script>

<svelte:head>
	<title>
		{$isZh
			? '郭希元 (Tommy) | 本科量子计算研究者'
			: 'Xiyuan (Tommy) Guo | Undergraduate Quantum Researcher'}
	</title>
</svelte:head>

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
				<div class="flex items-start gap-3">
					<button
						type="button"
						onclick={measure}
						aria-label="Profile picture"
						class="group relative shrink-0"
					>
						<img
							src="/profile.jpg"
							alt="Xiyuan (Tommy) Guo"
							class="mb-6 size-24 rounded-full border-2 border-reze/40 object-cover shadow-lg transition-all duration-500 hover:scale-105 sm:size-28 {measured
								? 'scale-105 blur-[2px]'
								: ''}"
						/>
					</button>
					{#if measured}
						<span class="text-reze animate-pulse mt-3 font-mono text-lg italic" aria-hidden="true">
							ψ
						</span>
					{/if}
				</div>
				<h1 class="text-cloud text-4xl font-bold tracking-tight sm:text-5xl">
					<a href="/">Xiyuan (Tommy) Guo</a>
				</h1>
				<h2 class="text-cloud-dim mt-3 text-lg font-medium tracking-tight sm:text-xl">
					{$t('subtitle')}
				</h2>
				<p class="text-cloud-dim mt-4 max-w-xs leading-normal">
					{$t('tagline')}
					<span class="text-reze ml-1 font-mono italic">ψ</span>
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
									{$t('nav.' + item)}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>

			<Socials />
		</header>

		<main class="pt-24 lg:w-7/12 lg:py-24">
			{@render children()}
		</main>
	</div>
</div>

<ThemeSwitch />
<LanguageToggle />
