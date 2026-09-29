<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import CertificationCard from '$lib/components/CertificationCard.svelte';
	import { t } from '$lib/i18n';

	const experience = $derived([
		{
			date: $t('exp.prism.date'),
			title: $t('exp.prism.title'),
			company: $t('exp.prism.company'),
			description: $t('exp.prism.description'),
			skills: ['C++17', 'RcppArmadillo', 'Convex Optimization', 'KKT', 'Longitudinal Statistics'],
			link: 'https://github.com/xguot/prism'
		},
		{
			date: $t('exp.yale.date'),
			title: $t('exp.yale.title'),
			company: $t('exp.yale.company'),
			description: $t('exp.yale.description'),
			skills: ['PyTorch', 'ADMM', 'Quantum State Tomography', 'Convex Optimization', 'HPC'],
			link: 'https://engineering.yale.edu/research-and-faculty/faculty-directory/mengxia-liu'
		},
		{
			date: $t('exp.ke.date'),
			title: $t('exp.ke.title'),
			company: $t('exp.ke.company'),
			description: $t('exp.ke.description'),
			skills: ['DFT', 'MongoDB', 'Fireworks', 'Go', 'Three.js', 'Quantum Materials'],
			link: 'https://engineering.virginia.edu/faculty/liqin-ke'
		},
		{
			date: $t('exp.biocomplexity.date'),
			title: $t('exp.biocomplexity.title'),
			company: $t('exp.biocomplexity.company'),
			description: $t('exp.biocomplexity.description'),
			skills: ['GNN', 'Network Science', 'Simulation', 'SEIR', 'Python'],
			link: 'https://biocomplexity.virginia.edu/'
		}
	]);

	const projects = $derived([
		{
			title: $t('proj.lensless.title'),
			description: $t('proj.lensless.description'),
			tags: ['PyTorch', 'ADMM', 'QST', 'Lorentz Cone', 'HPC'],
			link: 'https://github.com/xguot/lensless-recon'
		},
		{
			title: $t('proj.prism.title'),
			description: $t('proj.prism.description'),
			tags: ['C++17', 'RcppArmadillo', 'Convex Optimization', 'KKT', 'Statistics'],
			link: 'https://github.com/xguot/prism'
		},
		{
			title: $t('proj.difi.title'),
			description: $t('proj.difi.description'),
			tags: ['Go', 'Bubble Tea', 'Git API', 'CLI', 'Nvim Plugin'],
			link: 'https://difi.vercel.app/',
			stars: 364,
			thumbnail: '/difi-demo.gif',
			hnRanking: 5,
			hnLink: 'https://news.ycombinator.com/item?id=46870917'
		},
		{
			title: $t('proj.stim.title'),
			description: $t('proj.stim.description'),
			tags: ['Quantum Computing', 'Stabilizer Circuits', 'C++', 'Open Source'],
			link: 'https://github.com/quantumlib/stim'
		},
		{
			title: $t('proj.sanjaya.title'),
			description: $t('proj.sanjaya.description'),
			tags: ['Python', 'Scrapy', 'Playwright', 'Data Engineering', 'Academic Graph'],
			link: 'https://sanjaya-six.vercel.app/',
			thumbnail: '/sanjaya.png'
		},
		{
			title: $t('proj.zsweep.title'),
			description: $t('proj.zsweep.description'),
			tags: ['Go', 'TUI', 'Vim Motions', 'CLI'],
			link: 'https://zsweep.com',
			thumbnail: '/zsweep-demo.gif'
		},
		{
			title: $t('proj.neovim.title'),
			description: $t('proj.neovim.description'),
			tags: ['C', 'Lua', 'Open Source', 'Systems'],
			link: 'https://github.com/neovim/neovim/pulls?q=is%3Apr+author%3Axguot+',
			stars: '90k+',
			thumbnail: '/nvim-demo.png'
		}
	]);

	const certifications = $derived([
		{
			title: $t('cert.ai.title'),
			issuer: $t('cert.ai.issuer'),
			date: '2025',
			link: 'https://www.credly.com/badges/639eb293-6ca7-4412-b909-01608c57cc89/linked_in_profile',
			badge: 'aws-ai-practitioner.png',
			description: $t('cert.ai.description')
		},
		{
			title: $t('cert.cloud.title'),
			issuer: $t('cert.cloud.issuer'),
			date: '2025',
			link: 'https://www.credly.com/badges/896f99ca-564e-49b9-978a-177e5f111ca3/linked_in_profile',
			badge: '/aws-cloud-practitioner.png',
			description: $t('cert.cloud.description')
		},
		{
			title: $t('cert.usaco.title'),
			issuer: $t('cert.usaco.issuer'),
			date: '2023',
			link: 'https://usaco.org/',
			badge: '/usaco-logo.png',
			description: $t('cert.usaco.description')
		}
	]);
</script>

<section
	id="about"
	class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
	aria-label="About me"
>
	<p class="text-cloud-dim mb-4 max-w-prose leading-relaxed text-pretty">
		<span class="text-cloud font-mono italic">
			<span class="text-reze">|</span>Xīyuán<span class="text-reze">⟩</span>
			<span class="text-reze">=</span>
			<span class="text-reze">|</span>希<span class="text-reze">⟩</span>
			<span class="text-reze">⊗</span>
			<span class="text-reze">|</span>源<span class="text-reze">⟩</span>
			<span class="text-reze">↦</span>
			<span class="text-reze">|</span><svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linejoin="round"
				class="text-reze inline-block h-4 w-4 align-[-2px]"
				aria-hidden="true"
			>
				<path d="M12 3l1.9 5.8L19.7 12l-5.8 1.9L12 21l-1.9-5.8L4.3 12l5.8-1.9L12 3z"></path>
			</svg><span class="text-reze">⟩</span>
			<span class="text-reze">⊗</span>
			<span class="text-reze">|</span><svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				class="text-reze inline-block h-4 w-4 align-[-2px]"
				aria-hidden="true"
			>
				<path d="M2 12c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"></path>
				<path d="M2 17c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"></path>
			</svg><span class="text-reze">⟩</span>
		</span>
		<span> — {$t('aboutName')}</span>
	</p>

	<p class="text-cloud-dim mb-4 max-w-prose leading-relaxed text-pretty">{$t('about1')}</p>

	<p class="text-cloud-dim mb-4 leading-relaxed">
		{$t('about2a')}
		{$t('about2sheltie')}
		<a
			href="/winter.JPG"
			target="_blank"
			rel="noreferrer"
			class="text-cloud hover:text-reze font-medium transition-colors"
		>
			∪･ω･∪
		</a>
	</p>

	<blockquote class="border-reze/40 mt-6 border-l-2 pl-4">
		<p class="text-cloud-dim leading-relaxed italic">
			Your right is to action alone;<br />
			Never to its fruits at anytime.
		</p>
		<cite class="text-cloud-dim/60 mt-2 block text-sm not-italic">
			— Winthrop Sargeant, <em>The Bhagavad Gita</em>, 2009
		</cite>
	</blockquote>
</section>

<section id="experience" class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
	<div
		class="bg-bg-main/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
	>
		<h2 class="text-cloud text-sm font-bold tracking-widest uppercase lg:sr-only">
			{$t('sections.experience')}
		</h2>
	</div>
	<div class="flex flex-col gap-12">
		{#each experience as job}
			<ExperienceCard {...job} />
		{/each}
	</div>
	<div class="mt-12">
		<a
			href="/Xiyuan_Guo_CV.pdf"
			download="Xiyuan_Guo_CV.pdf"
			target="_blank"
			rel="noreferrer"
			class="group text-cloud hover:text-reze inline-flex items-center leading-tight font-semibold transition-colors"
		>
			<span class="group-hover:border-reze border-b border-transparent pb-px transition"
				>{$t('viewCV')}</span
			>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="ml-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-2"
				><path
					fill-rule="evenodd"
					d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.5a.75.75 0 010 1.08l-5.5 5.5a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
					clip-rule="evenodd"
				/></svg
			>
		</a>
	</div>
</section>

<section id="projects" class="group/list mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
	<div
		class="bg-bg-main/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
	>
		<h2 class="text-cloud text-sm font-bold tracking-widest uppercase lg:sr-only">
			{$t('sections.projects')}
		</h2>
	</div>
	<div class="flex flex-col gap-12">
		{#each projects as project}
			<ProjectCard {...project} />
		{/each}
	</div>
	<div class="mt-12">
		<a
			href="https://github.com/xguot?tab=repositories"
			target="_blank"
			rel="noreferrer"
			class="group text-cloud hover:text-reze inline-flex items-center leading-tight font-semibold transition-colors"
		>
			<span class="group-hover:border-reze border-b border-transparent pb-px transition"
				>{$t('viewAll')}</span
			>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="ml-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-2"
				><path
					fill-rule="evenodd"
					d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.5a.75.75 0 010 1.08l-5.5 5.5a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
					clip-rule="evenodd"
				/></svg
			>
		</a>
	</div>
</section>

<section
	id="certifications"
	class="group/list mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
>
	<div
		class="bg-bg-main/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
	>
		<h2 class="text-cloud text-sm font-bold tracking-widest uppercase lg:sr-only">
			{$t('sections.certifications')}
		</h2>
	</div>
	<div class="flex flex-col gap-8">
		{#each certifications as cert}
			<CertificationCard {...cert} />
		{/each}
	</div>
	<div class="mt-12 flex flex-col items-start gap-4">
		<button
			onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			class="group text-cloud hover:text-reze inline-flex items-center leading-tight font-semibold transition-colors"
		>
			<span class="group-hover:border-reze border-b border-transparent pb-px transition">
				{$t('backToTop')}
			</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="ml-1 h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-2"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.57a.75.75 0 01-1.08-1.04l5.5-5.5a.75.75 0 011.08 0l5.5 5.5a.75.75 0 11-1.08 1.04l-3.96-3.958V16.25A.75.75 0 0110 17z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>

		<p class="text-cloud-dim/60 max-w-md text-sm leading-normal">
			{$t('footer')}&nbsp;
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				class="text-reze inline-block h-3.5 w-3.5"
				aria-hidden="true"
				role="img"
			>
				<title>Keyboard</title>
				<rect x="2" y="5" width="20" height="14" rx="2"></rect>
				<path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M18 13h.01M9 13h6"></path>
			</svg>
		</p>
	</div>
</section>
