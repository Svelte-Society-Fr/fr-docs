<script>
  let count = 0;

  function incrementCount() {
    count += 1;
  }
</script>

<button on:click={incrementCount}>
  Il y a eu {count}
  {count === 1 ? 'clic' : 'clics'}
</button>
