<script lang="ts">
  import { type Rank, type Suit } from "$lib/cards";

  import GameIconsDiamonds from "~icons/game-icons/diamonds";
  import GameIconsClubs from "~icons/game-icons/clubs";
  import GameIconsHearts from "~icons/game-icons/hearts";
  import GameIconsSpades from "~icons/game-icons/spades";
  import Button from "./button.svelte";

  let {
    rank,
    suit,
    hidden = $bindable(false),
    focus = $bindable(false),
  }: {
    rank: Rank;
    suit: Suit;
    hidden?: boolean;
    focus?: boolean;
  } = $props();
</script>

{#snippet label()}
  <div class="flex flex-col px-1 [&>svg]:h-auto [&>svg]:w-full">
    <p class="text-center font-bold leading-snug">{rank}</p>
    {#if suit === "D"}
      <GameIconsDiamonds />
    {:else if suit === "C"}
      <GameIconsClubs />
    {:else if suit === "H"}
      <GameIconsHearts />
    {:else if suit === "S"}
      <GameIconsSpades />
    {/if}
  </div>
{/snippet}

{#snippet symbol()}
  <div class="w-full [&>svg]:h-auto [&>svg]:w-full">
    {#if suit === "D"}
      <GameIconsDiamonds />
    {:else if suit === "C"}
      <GameIconsClubs />
    {:else if suit === "H"}
      <GameIconsHearts />
    {:else if suit === "S"}
      <GameIconsSpades />
    {/if}
  </div>
{/snippet}

{#snippet single()}
  <div class="flex w-full justify-between">
    <div class="m-auto w-[20cqw]">{@render symbol()}</div>
  </div>
{/snippet}

{#snippet double()}
  <div class="flex w-full justify-between">
    <div class="m-auto w-[20cqw]">{@render symbol()}</div>
    <div class="m-auto w-[20cqw]">{@render symbol()}</div>
  </div>
{/snippet}

{#snippet count()}
  {@const count = parseInt(rank)}
  <div class="flex flex-col items-center justify-between py-[10cqw]">
    {#if count <= 3}
      {#each Array(count) as _}
        {@render single()}
      {/each}
    {:else if count <= 6}
      {@render double()}
      <div class="flex w-full justify-between">
        {#each Array(count % 4) as _}
          <div class="m-auto w-[20cqw]">{@render symbol()}</div>
        {/each}
      </div>
      {@render double()}
    {:else if count === 7}
      {@render double()}
      {@render single()}
      {@render double()}
      <div></div>
      {@render double()}
    {:else if count === 8}
      {@render double()}
      {@render single()}
      {@render double()}
      {@render single()}
      {@render double()}
    {:else if count === 9}
      {@render double()}
      {@render double()}
      {@render single()}
      {@render double()}
      {@render double()}
    {:else if count === 10}
      {@render double()}
      {@render single()}
      {@render double()}
      {@render double()}
      {@render single()}
      {@render double()}
    {/if}
  </div>
{/snippet}

<div
  class={{
    "relative grid aspect-[63/88] max-w-48 flex-shrink-0 grid-cols-[1fr_3fr_1fr] overflow-hidden rounded-[1rem] border-4 bg-white transition-[transform,box-shadow] @container": true,
    "text-red-500": suit === "D" || suit === "H",
    flipped: hidden,
    "z-10 shadow-[0_0_0_0.5rem] shadow-blue-500": focus,
  }}
>
  <div class="text-[15cqw]">
    {@render label()}
  </div>
  {#if rank === "A" || rank === "K" || rank === "Q" || rank === "J"}
    <div class="flex items-center justify-center">
      <div class="w-[50cqw]">{@render symbol()}</div>
    </div>
  {:else if parseInt(rank) <= 10}
    {@render count()}
  {:else}
    <div class="flex flex-wrap items-center justify-center overflow-hidden">
      {#each Array(parseInt(rank)) as _}
        <div class="w-[20cqw]">{@render symbol()}</div>
      {/each}
    </div>
  {/if}
  <div class="rotate-180 text-[15cqw]">
    {@render label()}
  </div>
  <div class="absolute inset-0 flex items-center justify-center bg-white px-2 @[5rem]:hidden">
    <div class="text-[45cqw]">
      {@render label()}
    </div>
  </div>
  <div
    class={{
      "absolute inset-0 bg-white p-3 opacity-0 transition-opacity delay-75 duration-0": true,
      "opacity-100": hidden,
    }}
  >
    <div class="stripe h-full w-full rounded-[0.25rem] bg-indigo-400"></div>
  </div>
</div>

<style>
  .flipped {
    transform: rotateY(180deg);
  }

  .stripe {
    background: repeating-linear-gradient(
      45deg,
      theme(colors.indigo.400) 0 10px,
      theme(colors.indigo.500) 10px 20px
    );
  }
</style>
