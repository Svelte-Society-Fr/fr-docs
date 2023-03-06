import { readable } from 'svelte/store';

export const time = readable(null, function start(set) {
	// l'implémentation se fait ici

	return function stop() {};
});
