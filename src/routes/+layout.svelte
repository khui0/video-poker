<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<svelte:head>
  <title>Video Poker</title>
  <meta
    name="description"
    content="Simple online video poker game. Modern web app that runs in your browser. No real money. Play today!"
  />
</svelte:head>

<main class="flex min-h-full flex-col p-4">
  {@render children()}
</main>
