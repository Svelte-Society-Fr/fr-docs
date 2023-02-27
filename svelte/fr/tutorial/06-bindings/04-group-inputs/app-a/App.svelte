<script>
	let scoops = 1;
	let flavours = ['Éclats de menthe'];

	function join(flavours) {
		if (flavours.length === 1) return flavours[0];
		return `${flavours.slice(0, -1).join(', ')} and ${flavours[flavours.length - 1]}`;
	}
</script>

<h2>Taille</h2>

<label>
	<input type=radio group={scoops} name="scoops" value={1}>
	Une boule
</label>

<label>
	<input type=radio group={scoops} name="scoops" value={2}>
	Deux boules
</label>

<label>
	<input type=radio group={scoops} name="scoops" value={3}>
	Trois boules
</label>

<h2>Parfums</h2>

<label>
	<input type=checkbox group={flavours} name="flavours" value="Cookie crémeux">
	Cookie crémeux
</label>

<label>
	<input type=checkbox group={flavours} name="flavours" value="Éclats de menthe">
	Éclats de menthe
</label>

<label>
	<input type=checkbox group={flavours} name="flavours" value="Vague à la fraise">
	Vague à la fraise
</label>

{#if flavours.length === 0}
	<p>Veuillez choisir au moins un parfum</p>
{:else if flavours.length > scoops}
	<p>Vous ne pouvez pas choisir plus de parfums que de boules !</p>
{:else}
	<p>
		Vous avez commandé {scoops} {scoops === 1 ? 'boule' : 'boules'}
		de {join(flavours)}
	</p>
{/if}
