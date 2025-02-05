<script lang="ts">
  import type { Snippet } from "svelte";
  import { fade } from "svelte/transition";

  let { children }: { children: Snippet } = $props();
</script>

<div
  in:fade
  out:fade
  data-fullscreen
  class="fixed inset-0 flex items-center overflow-auto bg-base-100/50 p-4 text-center backdrop-blur-sm"
>
  <div class="m-auto flex max-w-sm flex-col items-center gap-4">
    {@render children()}
  </div>
</div>
