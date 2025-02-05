<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    onclick,
    disabled,
  }: {
    children: Snippet;
    onclick?: Function;
    disabled?: boolean;
  } = $props();
</script>

<button
  class={{
    "group relative h-12 flex-shrink-0 rounded-lg px-4 text-xl font-semibold text-white": true,
    "pointer-events-none opacity-50": disabled,
  }}
  onclick={() => {
    onclick?.();
  }}
  {disabled}
>
  <span role="presentation" class="opacity-0">{@render children?.()}</span>
  <div class="absolute bottom-0 left-0 h-10 w-full rounded-lg bg-blue-600"></div>
  <div
    class="absolute left-0 top-0 flex h-10 w-full items-center justify-center rounded-lg bg-blue-500 transition-[top] group-hover:top-0.5 group-active:top-1"
  >
    {@render children?.()}
  </div>
</button>
