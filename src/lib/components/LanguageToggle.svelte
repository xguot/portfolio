<script lang="ts">
	import { t, toggleLang, isZh } from '$lib/i18n';
</script>

<button
	type="button"
	onclick={toggleLang}
	aria-label={$t('langLabel')}
	class="px-1 py-2 text-xs text-cloud-dim transition-colors hover:text-cloud"
	>{$isZh ? 'EN' : '中文'}</button
>
