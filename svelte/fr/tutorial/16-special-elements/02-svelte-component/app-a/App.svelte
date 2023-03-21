<script>
	import RedThing from './RedThing.svelte';
	import GreenThing from './GreenThing.svelte';
	import BlueThing from './BlueThing.svelte';

	const options = [
		{ color: 'rouge', component: RedThing   },
		{ color: 'vert', component: GreenThing },
		{ color: 'bleu', component: BlueThing  },
	];

	let selected = options[0];
</script>

<select bind:value={selected}>
	{#each options as option}
		<option value={option}>{option.color}</option>
	{/each}
</select>

{#if selected.color === 'rouge'}
	<RedThing/>
{:else if selected.color === 'vert'}
	<GreenThing/>
{:else if selected.color === 'bleu'}
	<BlueThing/>
{/if}
