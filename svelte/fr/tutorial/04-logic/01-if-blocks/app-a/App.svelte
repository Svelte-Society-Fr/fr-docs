<script>
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}
</script>

<button on:click={toggle}>
	Déconnexion
</button>

<button on:click={toggle}>
	Connexion
</button>
