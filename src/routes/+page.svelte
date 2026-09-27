<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
	import CertificationCard from '$lib/components/CertificationCard.svelte';

	const experience = [
		{
			date: 'APR 2026 — PRESENT',
			title: 'Research Assistant',
			company: 'UVA BAL Lab (Prof. Tong)',
			description:
				'Engineered PRISM, a constrained optimization framework for multivariate longitudinal missing data imputation: an initial imputation is projected onto the FIML model-implied mean and covariance structure under a regularized objective that counteracts the variance attenuation inherent in unconstrained imputation. Built the solver engine in C++17 (RcppArmadillo) as projected gradient descent with Armijo backtracking line search, exact mean-constraint enforcement via per-column zero-sum gradient projection, and KKT convergence certification.',
			skills: ['C++17', 'RcppArmadillo', 'Convex Optimization', 'KKT', 'Longitudinal Statistics'],
			link: 'https://github.com/xguot/prism'
		},
		{
			date: 'FEB 2026 — PRESENT',
			title: 'Research Assistant',
			company: "Yale (Liu's Group)",
			description:
				'Engineered a joint spectro-polarimetric forward model recovering a 324-channel scene datacube (spatial × 81 wavelengths × 4 Stokes channels) from a single multiplexed lensless speckle image. Formulated the reconstruction as a conic-constrained inverse problem mathematically isomorphic to quantum state tomography: the Poincaré-Bloch map S ↦ ρ = ½(I + S·σ) sends each Stokes vector to a single-qubit density matrix, and the enforced Lorentz cone constraint S₀ ≥ ‖S₁:₃‖ is precisely the density-matrix positivity condition ρ ⪰ 0. Architected a GPU-accelerated consensus ADMM solver in PyTorch with exact joint proximal operators and closed-form Sherman-Morrison inversions, scaling across SLURM HPC clusters.',
			skills: ['PyTorch', 'ADMM', 'Quantum State Tomography', 'Convex Optimization', 'HPC'],
			link: 'https://liu.yale.edu/'
		},
		{
			date: 'OCT 2025 — PRESENT',
			title: 'Research Assistant',
			company: "UVA (Ke's Group)",
			description:
				'Applied Density Functional Theory (DFT) to investigate transition-metal magnetic anisotropy and its relationship to structural motifs. Created immersive browser-based 3D atomic visualizations with Three.js and JSmol, and engineered a cloud-native machine learning pipeline in Go and Next.js for secure dataset sharing across collaborators. Designing RareEarth DB, a rare-earth-focused analogue of the Materials Project: a MongoDB document architecture linking 4,648 curated magnetic-anisotropy measurements to ICSD/Pearson crystal structures, with a schema designed for Fireworks-orchestrated DFT workflows on UVA HPC; DOE funding proposal in preparation.',
			skills: ['DFT', 'MongoDB', 'Fireworks', 'Go', 'Three.js', 'Quantum Materials'],
			link: 'https://www.virginia.edu/'
		},
		{
			date: 'MAY 2026 — AUG 2026',
			title: 'Research Intern',
			company: 'UVA Biocomplexity Institute',
			description:
				'Formulated massive-scale network simulations modeling the stochastic spread of viral pathogens, implementing SEIR compartmental cascade models to capture heterogeneous transmission dynamics. Engineered Graph Neural Network (GNN) architectures utilizing spatiotemporal message-passing frameworks to extract predictive topological features from dynamic contact networks.',
			skills: ['GNN', 'Network Science', 'Simulation', 'SEIR', 'Python'],
			link: 'https://biocomplexity.virginia.edu/'
		}
	];

	const projects = [
		{
			title: 'lensless-recon — Conic-Constrained QST Solver',
			description:
				'GPU-accelerated consensus ADMM solver in PyTorch recovering a 324-channel spectro-polarimetric datacube from a single lensless speckle image. The conic-constrained inverse problem is isomorphic to quantum state tomography via the Poincaré-Bloch map, with the Lorentz cone constraint enforcing density-matrix positivity. Exact joint proximal operators and Sherman-Morrison closed-form inversions scale across SLURM HPC clusters.',
			tags: ['PyTorch', 'ADMM', 'QST', 'Lorentz Cone', 'HPC'],
			link: 'https://github.com/xguot/lensless-recon'
		},
		{
			title: 'prism — Projected Gradient Imputation Engine',
			description:
				'A C++17 (RcppArmadillo) solver for multivariate longitudinal missing data imputation. Projected gradient descent with Armijo backtracking projects the imputation onto the FIML model-implied mean and covariance structure, with per-column zero-sum gradient projection enforcing mean constraints and KKT certification at every iterate.',
			tags: ['C++17', 'RcppArmadillo', 'Convex Optimization', 'KKT', 'Statistics'],
			link: 'https://github.com/xguot/prism'
		},
		{
			title: 'difi — Git Diff Review Tool',
			description:
				'A high-performance CLI tool built in Go for interactive Git diff reviews. Features a keyboard-centric Terminal User Interface (TUI) with a file tree and editor-aware navigation, allowing users to jump directly to specific lines in Neovim/Vim for rapid code refinement.',
			tags: ['Go', 'Bubble Tea', 'Git API', 'CLI', 'Nvim Plugin'],
			link: 'https://github.com/xguot/difi',
			stars: 342,
			thumbnail: '/difi-demo.gif',
			hnRanking: 5,
			hnLink: 'https://news.ycombinator.com/item?id=46870917'
		},
		{
			title: 'stim — Quantum Circuit Simulator Contributor',
			description:
				'Authored a pull request to stim, the high-performance stabilizer circuit simulator used across the quantum error correction community, contributing to circuit rendering and execution frameworks.',
			tags: ['Quantum Computing', 'Stabilizer Circuits', 'C++', 'Open Source'],
			link: 'https://github.com/quantumlib/stim'
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
		I’m a Computer Science major at the University of Virginia pursuing research at the
		intersection of <span class="text-cloud font-medium">quantum information</span> and
		<span class="text-cloud font-medium">computational imaging</span>. My work spans quantum
		state tomography (QST), conic-constrained convex optimization, and
		<span class="text-cloud font-medium">density functional theory (DFT)</span> —
		bridging rigorous theory with GPU-accelerated numerical implementations.
	</p>

	<p class="text-cloud-dim mb-4 leading-relaxed">
		Currently, I am reconstructing 324-channel spectro-polarimetric datacubes from single
		lensless speckle images with a conic-constrained ADMM solver, a problem formally
		isomorphic to QST via the
		<span class="text-cloud font-medium">Poincaré-Bloch map</span>. In parallel, I built
		<span class="text-cloud font-medium">PRISM</span>, a C++17 projected gradient descent
		engine with KKT convergence certification for longitudinal missing data imputation, and I
		am designing <span class="text-cloud font-medium">RareEarth DB</span>, a MongoDB-backed
		materials database with Fireworks-orchestrated DFT workflows on UVA HPC. I also contribute
		to <span class="text-cloud font-medium">stim</span>, the open-source quantum circuit
		simulator.
	</p>

	<p class="text-cloud-dim mb-4 leading-relaxed">
		When I’m not at the terminal, you can usually find me at the
		<span class="text-cloud font-medium">Muay Thai</span> gym, training calisthenics, or behind a
		drum kit. I’m an avid off-roader in my
		<span class="text-cloud font-medium">Tacoma TRD Pro</span>
		and a heavy consumer of specialty coffee. I am currently completing my B.A. in Computer
		Science (Expected May 2027) at the
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
