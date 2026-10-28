import palettes from './themes.json' with { type: 'json' };

// Palette references for the editor themes:
// Acme: https://github.com/9fans/plan9port/blob/master/src/cmd/acme/acme.c#L1001
// Modus: https://protesilaos.com/emacs/modus-themes-colors

export const THEMES = palettes;
export type Theme = (typeof THEMES)[number];
export const THEME_KEY = 'portfolio-theme';
export const DEFAULT_THEMES = { light: 'modus-operandi', dark: 'modus-vivendi' } as const;
const LEGACY_THEMES: Record<string, string> = { light: 'white', dark: 'tokyo-night' };

export function normalizePreference(saved: string | null, legacy: string | null = null): string {
	const value = saved ?? legacy ?? 'system';
	const id = LEGACY_THEMES[value] ?? value;
	return THEMES.some((theme) => theme.id === id) ? id : 'system';
}

export function readPreference(): string {
	try {
		return normalizePreference(localStorage.getItem(THEME_KEY), localStorage.getItem('theme'));
	} catch {
		return 'system';
	}
}

export function resolveTheme(preference: string, dark: boolean): Theme {
	return (
		THEMES.find((theme) => theme.id === preference) ??
		THEMES.find((theme) => theme.id === DEFAULT_THEMES[dark ? 'dark' : 'light'])!
	);
}

export function applyTheme(preference: string, persist = true): Theme {
	const normalized = normalizePreference(preference);
	const theme = resolveTheme(normalized, window.matchMedia('(prefers-color-scheme: dark)').matches);
	const root = document.documentElement;
	root.dataset.theme = theme.id;
	root.classList.toggle('dark', !theme.light);
	root.style.colorScheme = theme.light ? 'light' : 'dark';
	for (const [key, value] of Object.entries(theme.colors)) {
		root.style.setProperty(`--palette-${key}`, value);
	}
	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.colors.bg);
	if (persist) {
		try {
			localStorage.setItem(THEME_KEY, normalized);
		} catch {
			/* Storage is optional. */
		}
	}
	return theme;
}

// Included in the document head by the server hook, before any page content paints.
// All interpolated values come from the local palette registry.
export const themeInitScript = `(() => {
	const themes = ${JSON.stringify(THEMES)};
	const aliases = ${JSON.stringify(LEGACY_THEMES)};
	const defaults = ${JSON.stringify(DEFAULT_THEMES)};
	let saved = null;
	try { saved = localStorage.getItem('${THEME_KEY}') ?? localStorage.getItem('theme'); } catch {}
	const id = aliases[saved] ?? saved;
	const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const theme = themes.find(t => t.id === id) ?? themes.find(t => t.id === (dark ? defaults.dark : defaults.light));
	const root = document.documentElement;
	root.dataset.theme = theme.id;
	root.classList.toggle('dark', !theme.light);
	root.style.colorScheme = theme.light ? 'light' : 'dark';
	for (const [key, value] of Object.entries(theme.colors)) root.style.setProperty('--palette-' + key, value);
	document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.colors.bg);
})();`;
