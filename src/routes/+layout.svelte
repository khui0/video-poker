<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<main class="h-full p-4">
  {@render children()}
</main>
