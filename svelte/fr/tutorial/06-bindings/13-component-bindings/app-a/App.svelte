<script>
	import Keypad from './Keypad.svelte';

	let pin;
	$: view = pin ? pin.replace(/\d(?!$)/g, '•') : 'entrez votre code';

	function handleSubmit() {
		alert(`votre code : ${pin}`);
	}
</script>

<h1 style="color: {pin ? '#333' : '#ccc'}">{view}</h1>

<Keypad on:submit={handleSubmit}/>
