<script>
	import Timer from './Timer.svelte';

	let open = false;
	let seconds = 0;

	const toggle = () => (open = !open);
	const handleTick = () => (seconds += 1);
</script>

<div>
	<button on:click={toggle}>{open ? 'Fermer' : 'Ouvrir'} le Timer</button>
	<p>
		Le composant Timer est ouvert depuis
		{seconds} {seconds === 1 ? 'seconde' : 'secondes'}
	</p>
	{#if open}
	<Timer callback={handleTick} />
	{/if}
</div>
