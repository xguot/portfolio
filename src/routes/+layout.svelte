<script lang="ts">
	import '../app.css';
	import { asset, resolve } from '$app/paths';
	import Socials from '$lib/components/Socials.svelte';
	import ThemeSwitch from '$lib/components/ThemeSwitch.svelte';
	import LanguageToggle from '$lib/components/LanguageToggle.svelte';
	import { t, initializeLanguage, isZh } from '$lib/i18n';
	import { onMount } from 'svelte';

	let { children } = $props();
	let active = $state('about');
	const sections = ['about', 'research', 'experience', 'projects', 'talks'];

	onMount(() => {
		initializeLanguage();
		const observer = new IntersectionObserver(
			() => {
				active =
					sections.findLast((id) => {
						const section = document.getElementById(id);
						return section && section.getBoundingClientRect().top <= window.innerHeight * 0.25;
					}) ?? 'about';
			},
			{ rootMargin: '-10% 0px -55% 0px', threshold: 0 }
		);
		for (const id of sections) {
			const section = document.getElementById(id);
			if (section) observer.observe(section);
		}
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>{$t('title')}</title>
	<meta name="description" content={$t('metaDescription')} />
	<link rel="canonical" href="https://xguo.info/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={$t('title')} />
	<meta property="og:description" content={$t('metaDescription')} />
	<meta property="og:url" content="https://xguo.info/" />
	<meta property="og:locale" content={$isZh ? 'zh_CN' : 'en_US'} />
	<meta property="og:image" content="https://xguo.info/social-preview.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta
		property="og:image:alt"
		content="Xiyuan (Tommy) Guo · Quantum error correction and constrained optimization · University of Virginia"
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={$t('title')} />
	<meta name="twitter:description" content={$t('metaDescription')} />
	<meta name="twitter:image" content="https://xguo.info/social-preview.png" />
</svelte:head>

<a href="#content" class="skip-link">{$t('skip')}</a>
<div id="top" class="mx-auto max-w-6xl px-6 py-6 sm:px-10 lg:px-14 lg:py-9">
	<div class="mb-6 flex items-center justify-end gap-4 sm:mb-10 lg:mb-14">
		<ThemeSwitch />
		<LanguageToggle />
	</div>
	<div class="grid gap-8 sm:gap-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16 xl:gap-24">
		<header class="profile-sidebar self-start lg:sticky lg:top-12">
			<div class="flex items-center gap-4 lg:block">
				<a
					href={asset('/picture.jpg')}
					target="_blank"
					rel="noreferrer"
					class="inline-block shrink-0 rounded-full"
				>
					<img
						src={asset('/profile.jpg')}
						alt="Xiyuan (Tommy) Guo"
						width="88"
						height="88"
						fetchpriority="high"
						class="size-16 rounded-full border border-cloud/10 object-cover sm:size-20 lg:mb-5 lg:size-22"
					/>
				</a>
				<h1 class="text-3xl leading-tight font-semibold tracking-tight text-cloud sm:text-4xl">
					<a href={resolve('/')}>Xiyuan<br class="hidden lg:block" /> (Tommy) Guo</a>
				</h1>
			</div>
			<p class="mt-4 text-sm leading-relaxed text-cloud-dim">{$t('subtitle')}</p>
			<p class="mt-3 max-w-xs text-sm leading-relaxed text-cloud">{$t('interests')}</p>
			<div class="mt-6 flex items-center gap-5 text-sm">
				<a
					class="text-link font-medium"
					href={asset('/Xiyuan_Guo_CV.pdf')}
					target="_blank"
					rel="noreferrer">{$t('viewCV')} <span aria-hidden="true">↗</span></a
				>
				<a class="text-link" href="mailto:mhn4xq@virginia.edu"
					>{$t('email')} <span aria-hidden="true">↗</span></a
				>
				<div class="ml-auto lg:hidden"><Socials /></div>
			</div>
			<nav
				class="mt-6 border-y border-cloud/10 py-2 lg:mt-10 lg:border-0 lg:py-0"
				aria-label={$t('navigation')}
			>
				<ul class="flex flex-wrap gap-x-5 gap-y-1 lg:flex-col lg:items-start lg:gap-1">
					{#each sections as item (item)}
						<li>
							<a
								href="#{item}"
								aria-current={active === item ? 'location' : undefined}
								class="nav-link inline-flex items-center gap-3 py-2 text-xs font-medium"
								><span class="nav-line hidden h-px w-5 lg:block" aria-hidden="true"></span>{$t(
									'nav.' + item
								)}</a
							>
						</li>
					{/each}
				</ul>
			</nav>
			<div class="mt-10 hidden lg:block"><Socials /></div>
		</header>
		<main id="content" tabindex="-1" class="min-w-0 pb-8 focus:outline-none lg:pb-12">
			{@render children()}
		</main>
	</div>
</div>
