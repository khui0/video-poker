<script lang="ts">
  import type { Snippet } from "svelte";

  let { children, onclick }: { children: Snippet; onclick?: Function } = $props();
</script>

<button
  class="group relative h-12 px-4 text-xl font-semibold text-white rounded-lg"
  onclick={() => {
    onclick?.();
  }}
>
  <span role="presentation" class="opacity-0">{@render children?.()}</span>
  <div class="absolute bottom-0 left-0 h-10 w-full rounded-lg bg-blue-600"></div>
  <div
    class="absolute left-0 top-0 flex h-10 w-full items-center justify-center rounded-lg bg-blue-500 transition-[top] group-hover:top-0.5 group-active:top-1"
  >
    {@render children?.()}
  </div>
</button>
