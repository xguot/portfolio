<script lang="ts">
	import { t } from '$lib/i18n';
	let {
		name,
		title,
		context,
		description,
		method,
		evaluation,
		finding,
		link,
		featured = false
	}: {
		name: string;
		title: string;
		context: string;
		description: string;
		method: string;
		evaluation?: string;
		finding: string;
		link: string;
		featured?: boolean;
	} = $props();
</script>

<article class:featured class="research-card">
	<p class="mb-2 text-xs leading-relaxed text-cloud-dim">{context}</p>
	<h3 class="text-lg leading-snug font-medium text-cloud">
		<a
			href={link}
			target="_blank"
			rel="noreferrer external"
			class="transition-colors hover:text-reze"
			>{title} <span aria-hidden="true" class="text-sm text-reze">↗</span></a
		>
	</h3>
	<p class="mt-2 text-sm leading-relaxed text-cloud-dim">{description}</p>
	<details class="mt-4">
		<summary class="text-link w-fit cursor-pointer text-xs"
			><span>{$t('methods')}<span class="sr-only"> · {title}</span></span></summary
		>
		<dl class="research-notes mt-4 space-y-3 border-l pl-4 text-sm leading-relaxed">
			<div>
				<dt class="font-medium text-cloud">{$t('method')}</dt>
				<dd class="mt-1 text-cloud-dim">{method}</dd>
			</div>
			{#if evaluation}<div>
					<dt class="font-medium text-cloud">{$t('evaluation')}</dt>
					<dd class="mt-1 text-cloud-dim">{evaluation}</dd>
				</div>{/if}
			<div>
				<dt class="font-medium text-cloud">{$t('finding')}</dt>
				<dd class="mt-1 text-cloud-dim">{finding}</dd>
			</div>
		</dl>
		<a
			class="text-link mt-3 inline-block font-mono text-xs"
			href={link}
			target="_blank"
			rel="noreferrer external">{name} <span aria-hidden="true">↗</span></a
		>
	</details>
</article>
