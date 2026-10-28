import assert from 'node:assert/strict';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { existsSync } from 'node:fs';
import { THEMES, THEME_KEY, normalizePreference, resolveTheme, themeInitScript } from './theme.ts';
import { runThemeTransition } from './theme-transition.ts';

function luminance(hex: string) {
	const channels = [1, 3, 5].map((index) => {
		const channel = parseInt(hex.slice(index, index + 2), 16) / 255;
		return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
	});
	return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrast(a: string, b: string) {
	const [low, high] = [luminance(a), luminance(b)].sort((x, y) => x - y);
	return (high + 0.05) / (low + 0.05);
}

function boot(saved: string | null, legacy: string | null, dark: boolean, blocked = false) {
	const properties: Record<string, string> = {};
	const root = {
		dataset: { theme: '' },
		style: {
			colorScheme: '',
			setProperty: (key: string, value: string) => {
				properties[key] = value;
			}
		},
		classList: {
			toggle: (key: string, value: boolean) => {
				properties[key] = String(value);
			}
		}
	};
	let chrome = '';
	runInNewContext(themeInitScript, {
		localStorage: {
			getItem: (key: string) => {
				if (blocked) throw new Error('Storage disabled');
				return key === THEME_KEY ? saved : legacy;
			}
		},
		window: { matchMedia: () => ({ matches: dark }) },
		document: {
			documentElement: root,
			querySelector: () => ({
				setAttribute: (_key: string, value: string) => {
					chrome = value;
				}
			})
		}
	});
	return { root, properties, chrome };
}

test('all 25 palettes keep normal text and links readable on page and card surfaces', () => {
	assert.equal(THEMES.length, 25);
	assert.equal(new Set(THEMES.map((theme) => theme.id)).size, 25);
	for (const theme of THEMES) {
		for (const background of [theme.colors.bg, theme.colors.surface]) {
			for (const color of [theme.colors.text, theme.colors.muted, theme.colors.link]) {
				assert.ok(
					contrast(color, background) >= 4.5,
					`${theme.id}: ${color} against ${background}`
				);
			}
		}
	}
});

test('every palette has a carousel preview, including Acme and both Modus themes', () => {
	for (const theme of THEMES) {
		const preview = theme.preview ?? `/theme-previews/${theme.id}.webp`;
		assert.ok(existsSync(new URL(`../../static${preview}`, import.meta.url)), theme.id);
	}
	for (const id of ['acme', 'modus-operandi', 'modus-vivendi']) {
		assert.equal(normalizePreference(id), id);
	}
});

test('legacy light/dark preferences migrate and invalid values fall back to system', () => {
	assert.equal(normalizePreference(null, 'light'), 'white');
	assert.equal(normalizePreference(null, 'dark'), 'tokyo-night');
	assert.equal(normalizePreference('nord', 'light'), 'nord');
	assert.equal(normalizePreference('removed-theme'), 'system');
	assert.equal(normalizePreference(null), 'system');
	assert.equal(resolveTheme('system', false).id, 'modus-operandi');
	assert.equal(resolveTheme('system', true).id, 'modus-vivendi');
});

test('a fresh browser uses the Modus pair while saved choices take priority', () => {
	assert.equal(boot(null, null, false).root.dataset.theme, 'modus-operandi');
	assert.equal(boot(null, null, true).root.dataset.theme, 'modus-vivendi');
	assert.equal(boot('acme', null, true).root.dataset.theme, 'acme');
	assert.equal(boot('tokyo-night', null, false).root.dataset.theme, 'tokyo-night');
});

test('before-paint initialization agrees with runtime resolution for every palette', () => {
	for (const dark of [false, true]) {
		for (const saved of ['system', 'invalid', ...THEMES.map((theme) => theme.id)]) {
			const { root, properties, chrome } = boot(saved, null, dark);
			const theme = resolveTheme(normalizePreference(saved), dark);
			assert.equal(root.dataset.theme, theme.id);
			assert.equal(root.style.colorScheme, theme.light ? 'light' : 'dark');
			assert.equal(properties.dark, String(!theme.light));
			assert.equal(chrome, theme.colors.bg);
			for (const [key, value] of Object.entries(theme.colors)) {
				assert.equal(properties[`--palette-${key}`], value);
			}
		}
	}
});

test('initialization preserves legacy choices and works with storage disabled', () => {
	assert.equal(boot(null, 'light', true).root.dataset.theme, 'white');
	assert.equal(boot(null, 'dark', false).root.dataset.theme, 'tokyo-night');
	assert.equal(boot('nord', null, false, true).root.dataset.theme, 'modus-operandi');
	assert.equal(boot('white', null, true, true).root.dataset.theme, 'modus-vivendi');
});

test('theme selection still applies when view transitions are unavailable', () => {
	let applied = 0;
	runThemeTransition(() => applied++, {}, false);
	assert.equal(applied, 1);
});

test('reduced motion applies the theme immediately without starting a wipe', () => {
	let applied = 0;
	runThemeTransition(
		() => applied++,
		{
			startViewTransition: () => {
				throw new Error('Animation should be skipped');
			}
		},
		true
	);
	assert.equal(applied, 1);
});
