<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<main class="flex min-h-full flex-col p-4">
  {@render children()}
</main>
