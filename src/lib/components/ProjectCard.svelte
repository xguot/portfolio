<script lang="ts">
	import { asset } from '$app/paths';
	import type { Asset } from '$app/types';
	import { t } from '$lib/i18n';
	let {
		title,
		description,
		link,
		thumbnail,
		demo,
		hnLink
	}: {
		title: string;
		description: string;
		link: string;
		thumbnail?: string;
		demo?: Asset;
		hnLink?: string;
	} = $props();
</script>

<article class="flex items-start gap-5">
	{#if thumbnail}<img
			src={thumbnail}
			alt=""
			width="160"
			height="100"
			loading="lazy"
			decoding="async"
			class="mt-1 hidden aspect-[8/5] w-28 rounded border border-cloud/10 object-cover object-top sm:block"
		/>{/if}
	<div class="min-w-0">
		<h3 class="leading-snug font-medium text-cloud">
			<a
				href={link}
				target="_blank"
				rel="noreferrer external"
				class="transition-colors hover:text-reze"
				>{title} <span class="text-xs text-reze" aria-hidden="true">↗</span></a
			>
		</h3>
		<p class="mt-2 text-sm leading-relaxed text-cloud-dim">{description}</p>
		{#if demo || hnLink}<div class="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
				{#if demo}<a class="text-link" href={asset(demo)} target="_blank" rel="noreferrer"
						>{$t('demo')}<span class="sr-only"> · {title}</span>
						<span aria-hidden="true">↗</span></a
					>{/if}
				{#if hnLink}<a class="text-link" href={hnLink} target="_blank" rel="noreferrer external"
						>{$t('discussion')} <span aria-hidden="true">↗</span></a
					>{/if}
			</div>{/if}
	</div>
</article>
