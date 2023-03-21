<div class="box">
	<slot name="header">Aucun en-tête n'a été fourni</slot>
	<p>Un peu de contenu entre l'en-tête et le pied-de-page</p>
	<slot name="footer"></slot>
</div>

<style>
	.box {
		width: 300px;
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
		padding: 1em;
		margin: 0 0 1em 0;

		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
