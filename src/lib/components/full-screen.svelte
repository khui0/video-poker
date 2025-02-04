<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";

  let { children }: { children: Snippet } = $props();
</script>

<div
  in:fade
  out:fade
  class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-base-100/50 p-4 backdrop-blur-sm"
>
  {@render children()}
</div>
