<script lang="ts">
	let {
		date,
		title,
		company,
		description,
		link
	}: {
		date: string;
		title: string;
		company: string;
		description?: string;
		link: string;
	} = $props();
</script>

<article class="grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-5">
	<h3 class="text-sm leading-relaxed font-medium text-cloud">
		<a
			href={link}
			target="_blank"
			rel="noreferrer external"
			class="transition-colors hover:text-reze"
			>{company} <span class="text-xs text-reze" aria-hidden="true">↗</span></a
		>
	</h3>
	<p class="text-xs leading-6 text-cloud-dim sm:text-right">{date}</p>
	<p class="text-sm text-cloud-dim sm:col-span-2">{title}</p>
	{#if description}<p class="mt-1 text-sm leading-relaxed text-cloud-dim sm:col-span-2">
			{description}
		</p>{/if}
</article>
