<script lang="ts">
  import Card from "../lib/components/card.svelte";

  let checked = $state(false);
</script>

<input type="checkbox" bind:checked />

<Card rank={10} suit="D" bind:hidden={checked} />
<Card rank={2} suit="D" bind:hidden={checked} />
<Card rank={"A"} suit="C" bind:hidden={checked} />
<Card rank={"K"} suit="H" bind:hidden={checked} />
