<script>
	import CustomButton from './CustomButton.svelte';

	function handleClick() {
		alert('Le button a été cliqué');
	}
</script>

<CustomButton on:click={handleClick}/>
