<script>
	let visible = false;

	function typewriter(node, { speed = 50 }) {
		// l'implémentation se fait ici

		return {

		};
	}
</script>

<label>
	<input type="checkbox" bind:checked={visible}>
	visible
</label>

{#if visible}
	<p transition:typewriter>
		Portez ce vieux whisky au juge blond qui fume
	</p>
{/if}
