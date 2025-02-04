<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<svelte:head>
  <title>Video Poker</title>
</svelte:head>

<main class="flex min-h-full flex-col p-4">
  {@render children()}
</main>
