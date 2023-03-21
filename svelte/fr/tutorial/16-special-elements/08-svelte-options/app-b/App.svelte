<script>
	import Todo from './Todo.svelte';

	let todos = [
		{ id: 1, done: true, text: 'laver la voiture' },
		{ id: 2, done: false, text: 'sortir le chien' },
		{ id: 3, done: false, text: 'tondre la pelouse' }
	];

	function toggle(toggled) {
		todos = todos.map(todo => {
			if (todo === toggled) {
				// on renvoie un nouvel objet
				return {
					id: todo.id,
					text: todo.text,
					done: !todo.done
				};
			}

			// on renvoie le même objet
			return todo;
		});
	}
</script>

<h2>Todos</h2>
{#each todos as todo}
	<Todo {todo} on:click={() => toggle(todo)}/>
{/each}
