<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import CertificationCard from '$lib/components/CertificationCard.svelte';

	const experience = [
		{
			date: 'APR 2026 — PRESENT',
			title: 'Research Assistant',
			company: 'UVA (BAL Lab)',
			description:
				'Formulating a quantum-inspired psychometric framework utilizing Hilbert-space probability models to map how individuals transition from cognitive uncertainty to commitment across repeated longitudinal measurements. Engineering a multivariate longitudinal missing data imputation framework that enforces the Law of Total Variation, with a custom Lagrange-constrained C++17 gradient descent solver implemented via RcppArmadillo.',
			skills: ['C++', 'RcppArmadillo', 'Psychometrics', 'Optimization', 'Mathematical Statistics'],
			link: 'https://xtong.org/'
		},
		{
			date: 'FEB 2026 — PRESENT',
			title: 'Research Assistant',
			company: 'Yale (Liu\'s Group)',
			description:
				'Developing a deep unrolled ADMM framework for blind computational polarimetry, reconstructing the full Stokes polarization cube from single diffuser speckle measurements. Engineering a custom PyTorch U-Net pipeline with rigorous physics-informed constraints using vectorial Stokes parameter representations and Lorentz cone orthogonal projections, yielding 4.5 dB PSNR improvement over baseline methods.',
			skills: ['PyTorch', 'ADMM', 'Computational Imaging', 'Physics-Informed Neural Networks', 'Polarimetry'],
			link: 'https://liu.yale.edu/'
		},
		{
			date: 'OCT 2025 — PRESENT',
			title: 'Research Assistant',
			company: 'UVA (Ke\'s Group)',
			description:
				'Applying quantum mechanics principles to engineer Density Functional Theory (DFT) and Dynamical Mean-Field Theory (DMFT) reconstruction algorithms for frontier rare-earth materials research. Architecting a cloud-native ML pipeline using Go and Next.js backed by DOE-BES and DOE-ARPA-E funding, and creating immersive browser-based 3D atomic visualizations with Three.js and JSmol.',
			skills: ['Go', 'Next.js', 'DFT', 'Three.js', 'Quantum Mechanics', 'Machine Learning'],
			link: 'https://www.virginia.edu/'
		},
		{
			date: 'MAY 2026 — PRESENT',
			title: 'Research Intern',
			company: 'UVA Biocomplexity Institute',
			description:
				'Formulating massive-scale network simulations modeling stochastic viral pathogen spread via SEIR compartmental cascade models. Engineering attention-based Graph Neural Network (GNN) architectures to predict multi-hop epidemic propagation using spatiotemporal message-passing frameworks on HPC infrastructure.',
			skills: ['GNN', 'Network Science', 'Simulation', 'Bayesian Data Science', 'HPC'],
			link: 'https://biocomplexity.virginia.edu/'
		}
	];

	const projects = [
		{
			title: 'smriti — Longitudinal Imputation Engine',
			description:
				'An R package for automated longitudinal missing data imputation. Executes a three-phase architecture combining missForest initialization with a custom C++ Lagrangian projection engine to strictly preserve the structural variance of the target covariance manifold.',
			tags: ['R', 'C++', 'RcppArmadillo', 'Statistics', 'CRAN'],
			link: 'https://github.com/xguot/smriti',
			thumbnail: '/statue-demo.gif'
		},
		{
			title: 'difi — Git Diff Review Tool',
			description:
				'A high-performance CLI tool built in Go for interactive Git diff reviews. Features a keyboard-centric Terminal User Interface (TUI) with a file tree and editor-aware navigation, allowing users to jump directly to specific lines in Neovim/Vim for rapid code refinement.',
			tags: ['Go', 'Bubble Tea', 'Git API', 'CLI', 'Nvim Plugin'],
			link: 'https://github.com/xguot/difi',
			stars: 342,
			thumbnail: '/difi-demo.gif',
			hnRanking: 6,
			hnLink: 'https://news.ycombinator.com/item?id=46870917'
		},
		{
			title: 'sanjaya — Academic Graph Pipeline',
			description:
				'An automated academic literature extraction pipeline utilizing the OpenAlex Academic Graph API, Scrapy, and Playwright. Extracts bilingual data and exports structured CSV/JSON datasets for downstream interdisciplinary research applications.',
			tags: ['Python', 'Scrapy', 'Playwright', 'Data Engineering', 'Academic Graph'],
			link: 'https://github.com/xguot/sanjaya',
			thumbnail: '/zsweep-demo.gif'
		},
		{
			title: 'Neovim — Contributor',
			description:
				'Contributed multiple Pull Requests to the Neovim core (C/Lua). Focused on Lua state change and ENV variable config supporting Vim logic.',
			tags: ['C', 'Lua', 'Open Source', 'Systems'],
			link: 'https://github.com/neovim/neovim/pulls?q=is%3Apr+author%3Axguot+',
			stars: '90k+',
			thumbnail: '/nvim-demo.png'
		}
	];

	const certifications = [
		{
			title: 'AWS Certified AI Practitioner',
			issuer: 'Amazon Web Services',
			date: '2025',
			link: 'https://www.credly.com/badges/639eb293-6ca7-4412-b909-01608c57cc89/linked_in_profile',
			badge: 'aws-ai-practitioner.png',
			description:
				'Validated expertise in deploying production-grade AI solutions on AWS. Focused on prompt engineering, fine-tuning Foundation Models via Amazon Bedrock, and implementing low-latency inference pipelines for real-time financial data processing.'
		},
		{
			title: 'AWS Certified Cloud Practitioner',
			issuer: 'Amazon Web Services',
			date: '2025',
			link: 'https://www.credly.com/badges/896f99ca-564e-49b9-978a-177e5f111ca3/linked_in_profile',
			badge: '/aws-cloud-practitioner.png',
			description:
				'Mastery of the AWS Well-Architected Framework, emphasizing security, high availability, and performance efficiency. Architected cloud-native environments leveraging Amazon Aurora for relational data and EC2/Lambda for scalable compute logic.'
		},
		{
			title: 'USACO Silver Division',
			issuer: 'USA Computing Olympiad',
			date: '2023',
			link: 'https://usaco.org/',
			badge: '/usaco-logo.png',
			description:
				'Competed in high-stakes algorithmic challenges focusing on computational efficiency and data structure optimization. Solved complex problems requiring $O(n \log n)$ performance using greedy algorithms, dynamic programming, and graph theory.'
		}
	];
</script>

<section
	id="about"
	class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
	aria-label="About me"
>
	<p class="text-cloud-dim mb-4 leading-relaxed">
		I’m a software engineer focused on the intersection of
		<span class="text-cloud font-medium">quantitative finance</span> and
		<span class="text-cloud font-medium">distributed systems</span>. I specialize in building
		high-performance <span class="text-cloud font-medium">Svelte</span> applications that bridge the gap
		between complex backend logic and intuitive, low-latency user interfaces.
	</p>

	<p class="text-cloud-dim mb-4 leading-relaxed">
		Currently, I am focused on architecting terminal-centric tooling and reactive web systems,
		notably as the creator of <span class="text-cloud font-medium">difi</span> and
		<span class="text-cloud font-medium">zsweep</span> (HN #5 & #6). Beyond my own projects, I am an
		<span class="text-cloud font-medium">Open Source Contributor</span>
		to Neovim and Statue. I’m also deep-diving into market microstructure—working through
		<span class="text-cloud font-medium">The Green Book</span> to apply systems engineering rigor to quantitative
		finance.
	</p>

	<p class="text-cloud-dim mb-4 leading-relaxed">
		When I’m not at the terminal, you can usually find me at the
		<span class="text-cloud font-medium">Muay Thai</span> gym, training calisthenics, or behind a
		drum kit. I’m an avid off-roader in my
		<span class="text-cloud font-medium">Tacoma TRD Pro</span>
		and a heavy consumer of specialty coffee. I am currently completing my double major in Physics
		and Computer Science (Expected May 2028) at the
		<span class="text-cloud font-medium">University of Virginia</span>.
	</p>
</section>

<section id="experience" class="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
	<div
		class="bg-bg-main/75 sticky top-0 z-20 -mx-6 mb-4 w-screen px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
	>
		<h2 class="text-cloud text-sm font-bold tracking-widest uppercase lg:sr-only">Experience</h2>
	</div>
	<div class="flex flex-col gap-12">
		{#each experience as job}
			<ExperienceCard {...job} />
		{/each}
	</div>
	<div class="mt-12">
		<a
			href="/cv.pdf"
			target="_blank"
			rel="noreferrer"
			class="group text-cloud hover:text-reze inline-flex items-center leading-tight font-semibold transition-colors"
		>
			<span class="group-hover:border-reze border-b border-transparent pb-px transition"
				>View Full CV</span
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
		<h2 class="text-cloud text-sm font-bold tracking-widest uppercase lg:sr-only">Projects</h2>
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
				>View All Projects</span
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
			Certifications
		</h2>
	</div>
	<div class="flex flex-col gap-8">
		{#each certifications as cert}
			<CertificationCard {...cert} />
		{/each}
	</div>
	<div class="mt-12 flex flex-col items-start gap-4">
		<button
			on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			class="group text-cloud hover:text-reze inline-flex items-center leading-tight font-semibold transition-colors"
		>
			<span class="group-hover:border-reze border-b border-transparent pb-px transition">
				Back to Top
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
			Loosely designed in <span class="text-cloud-dim">Figma</span> and engineered in
			<span class="text-cloud-dim">Neovim</span> on an
			<span class="text-cloud-dim">HHKB</span>. Built with
			<span class="text-cloud-dim">SvelteKit</span>
			and
			<span class="text-cloud-dim">Tailwind CSS</span>, reviewed with
			<span class="text-cloud-dim">difi</span>, and deployed with
			<span class="text-cloud-dim">Vercel</span>.
		</p>
	</div>
</section>
