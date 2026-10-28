<script lang="ts">
	import { t } from '$lib/i18n';

	const links = [
		{ name: 'GitHub', url: 'https://github.com/xguot', icon: 'github' },
		{ name: 'LinkedIn', url: 'https://linkedin.com/in/xiyuan-tommy-guo', icon: 'linkedin' }
	];
</script>

<ul class="flex items-center gap-5" aria-label={$t('socials')}>
	{#each links as link (link.name)}
		<li>
			<a
				href={link.url}
				target="_blank"
				rel="noreferrer external"
				class="block text-cloud-dim transition-colors duration-300 hover:text-reze"
				aria-label={link.name}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-5 w-5"
				>
					{#if link.icon === 'github'}
						<path
							d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
						></path>
					{/if}

					{#if link.icon === 'linkedin'}
						<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
						></path>
						<rect x="2" y="9" width="4" height="12"></rect>
						<circle cx="4" cy="4" r="2"></circle>
					{/if}
				</svg>
			</a>
		</li>
	{/each}
</ul>
