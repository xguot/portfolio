<script lang="ts">
	import { flushSync, onMount, tick } from 'svelte';
	import { asset } from '$app/paths';
	import type { Asset } from '$app/types';
	import { t } from '$lib/i18n';
	import PaletteIcon from './PaletteIcon.svelte';
	import {
		THEMES,
		THEME_KEY,
		DEFAULT_THEMES,
		readPreference,
		normalizePreference,
		applyTheme
	} from '$lib/theme';
	import { runThemeTransition } from '$lib/theme-transition';

	let dialog: HTMLDialogElement;
	let chooseButton = $state<HTMLButtonElement>();
	let opened = $state(false);
	let preference = $state('system');
	let current = $state<string>(DEFAULT_THEMES.light);
	let index = $state(0);
	const selected = $derived(THEMES[index]);
	const active = $derived(THEMES.find((theme) => theme.id === current) ?? THEMES[0]);
	const cards = $derived(
		THEMES.map((theme, i) => {
			const raw = i - index;
			const half = THEMES.length / 2;
			const offset = raw > half ? raw - THEMES.length : raw < -half ? raw + THEMES.length : raw;
			return { theme, offset, depth: Math.abs(offset) };
		}).filter((card) => card.depth <= 2)
	);
	let swipe = { id: -1, from: 0, moved: 0 };
	let ignoreClickUntil = 0;

	onMount(() => {
		preference = readPreference();
		current = applyTheme(preference).id;
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const followSystem = () => {
			if (preference === 'system') current = applyTheme(preference, false).id;
		};
		const sync = (event: StorageEvent) => {
			if (event.key === THEME_KEY || event.key === null) {
				preference = readPreference();
				current = applyTheme(preference, false).id;
			}
		};
		media.addEventListener('change', followSystem);
		window.addEventListener('storage', sync);
		return () => {
			media.removeEventListener('change', followSystem);
			window.removeEventListener('storage', sync);
		};
	});

	async function openPicker() {
		index = Math.max(
			0,
			THEMES.findIndex((theme) => theme.id === current)
		);
		opened = true;
		dialog.showModal();
		await tick();
		if (opened) chooseButton?.focus({ preventScroll: true });
	}

	function closePicker() {
		dialog.close();
		opened = false;
	}

	function step(delta: number) {
		index = (index + delta + THEMES.length) % THEMES.length;
	}

	function choose(value = selected.id) {
		if (value === preference) {
			closePicker();
			return;
		}
		runThemeTransition(() => {
			preference = normalizePreference(value);
			current = applyTheme(preference).id;
			flushSync(closePicker);
		});
	}

	function handleKey(event: KeyboardEvent) {
		const target = event.target;
		if (
			target instanceof HTMLElement &&
			(target.closest('input, textarea, select') || target.isContentEditable)
		)
			return;
		const shortcut =
			event.key.toLowerCase() === 't' && !event.metaKey && !event.ctrlKey && !event.altKey;
		const chord = event.code === 'Space' && event.metaKey && event.ctrlKey && event.shiftKey;
		if (shortcut || chord) {
			event.preventDefault();
			if (opened) closePicker();
			else void openPicker();
			return;
		}
		if (!opened) return;
		if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
			event.preventDefault();
			step(event.key === 'ArrowLeft' ? -1 : 1);
		} else if (
			event.key === 'Enter' &&
			!(target instanceof Element && target.closest('.theme-picker-close'))
		) {
			event.preventDefault();
			// Enter confirms the centered theme even when an arrow button has focus.
			if (!event.repeat) choose();
		}
	}

	function pointerDown(event: PointerEvent) {
		if (event.pointerType === 'touch')
			swipe = { id: event.pointerId, from: event.clientX, moved: 0 };
	}
	function pointerMove(event: PointerEvent) {
		if (event.pointerId === swipe.id) swipe.moved = event.clientX - swipe.from;
	}
	function pointerUp(event: PointerEvent) {
		if (event.pointerId !== swipe.id) return;
		if (Math.abs(swipe.moved) > 44) {
			step(swipe.moved < 0 ? 1 : -1);
			ignoreClickUntil = performance.now() + 400;
		}
		swipe.id = -1;
	}
	function captureClick(event: MouseEvent) {
		if (performance.now() < ignoreClickUntil) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
</script>

<svelte:window onkeydown={handleKey} />

<button
	type="button"
	onclick={openPicker}
	aria-haspopup="dialog"
	aria-keyshortcuts="T"
	aria-label={`${$t('appearance')}: ${active.name}`}
	title={`${$t('appearance')} (T)`}
	class="flex size-8 items-center justify-center text-cloud-dim transition-colors hover:text-cloud"
>
	<PaletteIcon />
</button>

<dialog
	bind:this={dialog}
	class="theme-picker"
	aria-label={$t('themePicker')}
	aria-describedby="theme-instructions"
	onclose={() => (opened = false)}
	onpointerdown={pointerDown}
	onpointermove={pointerMove}
	onpointerup={pointerUp}
	onpointercancel={() => (swipe.id = -1)}
	onclickcapture={captureClick}
>
	{#if opened}
		<button
			type="button"
			tabindex="-1"
			aria-hidden="true"
			class="theme-picker-dimmer"
			onclick={closePicker}
		></button>
		<button type="button" class="theme-picker-close" aria-label={$t('close')} onclick={closePicker}
			>×</button
		>
		<div class="theme-picker-content">
			<div
				class="theme-deck"
				role="group"
				aria-roledescription="carousel"
				aria-label={$t('themePicker')}
			>
				{#each cards as { theme, offset, depth } (theme.id)}
					{@const shift = offset === 0 ? 0 : Math.sign(offset) * (6 + depth * 12)}
					<button
						type="button"
						tabindex="-1"
						aria-hidden={offset !== 0}
						aria-label={`${$t(offset === 0 ? 'useTheme' : 'showTheme')} ${theme.name}`}
						onclick={() => (offset === 0 ? choose(theme.id) : step(offset))}
						class="theme-card"
						class:front={offset === 0}
						style:transform={`translateX(${shift - 50}%) scale(${depth === 0 ? 1 : 0.88})`}
						style:z-index={10 - depth}
						style:--preview-accent={theme.colors.accent}
					>
						<span class="theme-preview-frame"
							><span class="theme-preview-inner"
								><img
									src={asset((theme.preview ?? `/theme-previews/${theme.id}.webp`) as Asset)}
									alt={`${theme.name} theme preview`}
									width="1800"
									height="1012"
									draggable="false"
									decoding="async"
									fetchpriority={offset === 0 ? 'high' : 'low'}
								/></span
							></span
						>
					</button>
				{/each}
				<div class="theme-deck-spacer" aria-hidden="true"></div>
			</div>
			<button
				bind:this={chooseButton}
				type="button"
				class="theme-caption"
				aria-label={`${$t('useTheme')} ${selected.name}`}
				onclick={() => choose()}
			>
				<span
					aria-live="polite"
					aria-atomic="true"
					style:color={selected.light ? selected.colors.bg : selected.colors.text}
					style:-webkit-text-stroke={`2px ${selected.light ? selected.colors.text : selected.colors.bg}`}
					>{selected.name}</span
				>
			</button>
			<p id="theme-instructions" class="sr-only">{$t('themeInstructions')}</p>
		</div>
		<button
			type="button"
			class="theme-arrow previous"
			aria-label={$t('previousTheme')}
			onclick={() => step(-1)}
			><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"
				><path d="m14 5-7 7 7 7" stroke="currentColor" stroke-width="1.5" /></svg
			></button
		>
		<button
			type="button"
			class="theme-arrow next"
			aria-label={$t('nextTheme')}
			onclick={() => step(1)}
			><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"
				><path d="m10 5 7 7-7 7" stroke="currentColor" stroke-width="1.5" /></svg
			></button
		>
	{/if}
</dialog>
