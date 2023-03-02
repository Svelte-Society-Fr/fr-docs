<script>
	import { onInterval } from './utils.js';

	export let callback;
	export let interval = 1000;

	onInterval(callback, interval);
</script>

<p>
	Ce composant exécute une fonction toutes les
	{interval} milliseconde{interval > 1 ? 's' : ''}
</p>

<style>
	p {
		border: 1px solid blue;
		padding: 5px;
	}
</style>
