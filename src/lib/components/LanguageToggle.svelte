<script lang="ts">
	import { t, toggleLang, isZh } from '$lib/i18n';
</script>

<div class="pointer-events-none fixed right-4 bottom-28 z-40 sm:right-6 lg:top-4 lg:right-24 lg:bottom-auto">
	<button
		type="button"
		onclick={toggleLang}
		aria-label={$t('langLabel')}
		class="text-cloud-dim hover:text-cloud bg-bg-card/60 border-cloud/15 hover:border-reze/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-reze pointer-events-auto rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide transition-colors"
	>
		{$isZh ? 'EN' : '中文'}
	</button>
</div>
