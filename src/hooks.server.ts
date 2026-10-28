import type { Handle } from '@sveltejs/kit';
import { themeInitScript } from '$lib/theme';

export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%portfolio.theme%', themeInitScript)
	});
