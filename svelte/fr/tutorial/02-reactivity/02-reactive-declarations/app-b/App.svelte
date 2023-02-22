<script>
  let count = 0;
  $: doubled = count * 2;

  function handleClick() {
    count += 1;
  }
</script>

<button on:click={handleClick}>
  Il y a eu {count}
  {count === 1 ? 'clic' : 'clics'}
</button>

<p>{count} fois 2 vaut {doubled}</p>
