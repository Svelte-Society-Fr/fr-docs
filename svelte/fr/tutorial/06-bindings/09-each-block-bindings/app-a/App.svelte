<script>
	let todos = [
		{ done: false, text: 'finir le tutoriel Svelte' },
		{ done: false, text: 'construire une app' },
		{ done: false, text: 'dominer le monde' }
	];

	function add() {
		todos = todos.concat({ done: false, text: '' });
	}

	function clear() {
		todos = todos.filter(t => !t.done);
	}

	$: remaining = todos.filter(t => !t.done).length;
</script>

<h1>À faire</h1>

{#each todos as todo}
	<div class:done={todo.done}>
		<input
			type=checkbox
			checked={todo.done}
		>

		<input
			placeholder="Qu'avez-vous besoin de faire ?"
			value={todo.text}
		>
	</div>
{/each}

<p>Encore {remaining}</p>

<button on:click={add}>
	Ajouter
</button>

<button on:click={clear}>
	Effacer les tâches complétées
</button>

<style>
	.done {
		opacity: 0.4;
	}
</style>
