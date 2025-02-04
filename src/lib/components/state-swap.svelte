<script lang="ts">
  import type { Snippet } from "svelte";
  import { fly } from "svelte/transition";

  let {
    state = $bindable(),
    betState,
    holdState,
    resultState,
  }: {
    state: GameState;
    betState?: Snippet;
    holdState?: Snippet;
    resultState?: Snippet;
  } = $props();
</script>

<div class="relative h-12">
  {#if state === "bet"}
    <div
      in:fly={{ y: 25 }}
      out:fly={{ y: -25 }}
      class="absolute inset-0 flex items-center justify-center gap-4"
    >
      {@render betState?.()}
    </div>
  {:else if state === "hold"}
    <div
      in:fly={{ y: 25 }}
      out:fly={{ y: -25 }}
      class="absolute inset-0 flex items-center justify-center gap-4"
    >
      {@render holdState?.()}
    </div>
  {:else if state === "result"}
    <div
      in:fly={{ y: 25 }}
      out:fly={{ y: -25 }}
      class="absolute inset-0 flex items-center justify-center gap-4"
    >
      {@render resultState?.()}
    </div>
  {/if}
</div>
