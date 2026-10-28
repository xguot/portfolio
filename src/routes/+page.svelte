<script lang="ts">
	import { asset } from '$app/paths';
	import ResearchCard from '$lib/components/ResearchCard.svelte';
	import NameExplanation from '$lib/components/NameExplanation.svelte';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { t } from '$lib/i18n';

	const research = [
		{
			id: 'qudec',
			name: 'qudec',
			link: 'https://github.com/xguot/qudec',
			featured: true,
			evaluation: true
		},
		{ id: 'lensless', name: 'lensless-recon', link: 'https://github.com/xguot/lensless-recon' },
		{ id: 'prism', name: 'prism', link: 'https://github.com/xguot/prism' }
	];
	const experience = [
		{
			id: 'yale',
			link: 'https://engineering.yale.edu/research-and-faculty/faculty-directory/mengxia-liu'
		},
		{ id: 'prism', link: 'https://github.com/xguot/prism' },
		{ id: 'ke', link: 'https://engineering.virginia.edu/faculty/liqin-ke', description: true },
		{ id: 'biocomplexity', link: 'https://biocomplexity.virginia.edu/', description: true }
	];
</script>

<section id="about" aria-labelledby="about-heading" class="page-section">
	<h2 id="about-heading" class="section-heading">{$t('nav.about')}</h2>
	<NameExplanation />
	<p class="text-lg leading-relaxed text-pretty text-cloud">{$t('about1')}</p>
	<p class="mt-4 leading-relaxed text-pretty text-cloud-dim">{$t('about2')}</p>
	<p class="mt-4 leading-relaxed text-cloud-dim">
		{$t('about2a')}{$t('about2sheltie')}
		<a
			href={asset('/winter.JPG')}
			target="_blank"
			rel="noreferrer"
			class="text-link"
			aria-label={$t('pet')}>∪･ω･∪</a
		>
	</p>
</section>

<section id="research" aria-labelledby="research-heading" class="page-section">
	<h2 id="research-heading" class="section-heading">{$t('sections.research')}</h2>
	<div class="space-y-7">
		{#each research as item (item.id)}
			<ResearchCard
				name={item.name}
				title={$t(`research.${item.id}.title`)}
				context={$t(`research.${item.id}.context`)}
				description={$t(`research.${item.id}.description`)}
				method={$t(`research.${item.id}.method`)}
				finding={$t(`research.${item.id}.finding`)}
				evaluation={item.evaluation ? $t(`research.${item.id}.evaluation`) : undefined}
				link={item.link}
				featured={item.featured}
			/>
		{/each}
	</div>
</section>

<section id="experience" aria-labelledby="experience-heading" class="page-section">
	<h2 id="experience-heading" class="section-heading">{$t('sections.experience')}</h2>
	<div class="space-y-6">
		{#each experience as item (item.id)}
			<ExperienceCard
				title={$t(`exp.${item.id}.title`)}
				company={$t(`exp.${item.id}.company`)}
				date={$t(`exp.${item.id}.date`)}
				description={item.description ? $t(`exp.${item.id}.description`) : undefined}
				link={item.link}
			/>
		{/each}
	</div>
</section>

<section id="projects" aria-labelledby="software-heading" class="page-section">
	<h2 id="software-heading" class="section-heading">{$t('sections.projects')}</h2>
	<div class="space-y-7">
		<ProjectCard
			title={$t('proj.stim.title')}
			description={$t('proj.stim.description')}
			link="https://github.com/quantumlib/Stim/pull/1099"
		/>
		<ProjectCard
			title={$t('proj.difi.title')}
			description={$t('proj.difi.description')}
			link="https://github.com/xguot/difi"
			thumbnail="/difi-preview.webp"
			demo="/difi-demo.gif"
			hnLink="https://news.ycombinator.com/item?id=46870917"
		/>
		<ProjectCard
			title={$t('proj.neovim.title')}
			description={$t('proj.neovim.description')}
			link="https://github.com/neovim/neovim/pulls?q=is%3Apr+author%3Axguot"
		/>
	</div>
	<a
		class="text-link mt-6 inline-block text-sm"
		href="https://github.com/xguot?tab=repositories"
		target="_blank"
		rel="noreferrer">{$t('viewAll')} <span aria-hidden="true">↗</span></a
	>
</section>

<section id="talks" aria-labelledby="talks-heading" class="page-section">
	<h2 id="talks-heading" class="section-heading">{$t('sections.talks')}</h2>
	<article class="flex items-start gap-5">
		<img
			src="/cyberchat.jpg"
			alt=""
			width="120"
			height="68"
			loading="lazy"
			decoding="async"
			class="mt-1 hidden w-28 rounded border border-cloud/10 sm:block"
		/>
		<div>
			<h3 class="leading-snug font-medium text-cloud">{$t('talk.title')}</h3>
			<p class="mt-2 text-sm leading-relaxed text-cloud-dim">{$t('talk.description')}</p>
			<div class="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
				<a class="text-link" href="https://youtu.be/6Ay2lwDMxpI" target="_blank" rel="noreferrer"
					>{$t('talk.short')} <span aria-hidden="true">↗</span></a
				>
				<a class="text-link" href="https://youtu.be/lS-xTCjV5kc" target="_blank" rel="noreferrer"
					>{$t('talk.extended')} <span aria-hidden="true">↗</span></a
				>
			</div>
		</div>
	</article>
</section>

<section aria-labelledby="background-heading" class="page-section">
	<h2 id="background-heading" class="section-heading">{$t('sections.background')}</h2>
	<div class="space-y-5 text-sm">
		<div>
			<p class="font-medium text-cloud">{$t('background.degree')}</p>
			<p class="mt-1 text-cloud-dim">{$t('background.graduation')}</p>
			<p class="mt-2 leading-relaxed text-cloud-dim">{$t('background.course')}</p>
		</div>
		<p class="font-medium text-cloud">
			{$t('background.award')}
			<span class="ml-2 font-normal text-cloud-dim">{$t('background.awardDate')}</span>
		</p>
	</div>
</section>

<footer class="border-t border-cloud/10 pt-7 text-sm leading-relaxed">
	<div class="flex items-center justify-between gap-4 text-xs text-cloud-dim">
		<span>{$t('footer')}</span>
		<a class="text-link" href="#top">{$t('backToTop')} <span aria-hidden="true">↑</span></a>
	</div>
</footer>
