<script lang="ts">
  import "../app.css";
  let { children } = $props();

  import { stats } from "$lib/stats";
  import { onMount } from "svelte";

  onMount(() => {
    setInterval(() => {
      $stats.minutesPlayed++;
    }, 60000);
  });
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
