type TransitionDocument = {
	startViewTransition?: (update: () => void) => { finished: Promise<unknown> };
};

// Omarchy's split wipe, with immediate updates when motion is reduced or unsupported.
export function runThemeTransition(
	update: () => void,
	doc: TransitionDocument = document,
	reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
	if (reducedMotion || !doc.startViewTransition) {
		update();
		return;
	}
	const root = document.documentElement;
	root.classList.add('theme-wipe-frosted');
	const cleanup = () => root.classList.remove('theme-wipe-frosted');
	try {
		void doc.startViewTransition(update).finished.then(cleanup, cleanup);
	} catch {
		cleanup();
		update();
	}
}
