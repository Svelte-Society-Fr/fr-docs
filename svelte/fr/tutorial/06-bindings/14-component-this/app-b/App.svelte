<script>
	import InputField from './InputField.svelte';

	let field;
</script>

<InputField bind:this={field}/>

<button on:click={() => field.focus()}>Mettre le focus sur le champ</button>
