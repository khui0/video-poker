<script lang="ts">
  import GameIconsDiamonds from "~icons/game-icons/diamonds";
  import GameIconsClubs from "~icons/game-icons/clubs";
  import GameIconsHearts from "~icons/game-icons/hearts";
  import GameIconsSpades from "~icons/game-icons/spades";

  type Rank = "A" | "K" | "Q" | "J" | number;
  type Suit = "D" | "C" | "H" | "S";

  let {
    rank,
    suit,
    hidden = $bindable(false),
  }: { rank: Rank; suit: Suit; hidden?: boolean } = $props();
</script>

{#snippet label()}
  <div class="flex flex-col px-1 [&>svg]:h-auto [&>svg]:w-full">
    <p class="text-center text-[13cqw] font-bold leading-tight">{rank}</p>
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

<div
  class={{
    "relative grid aspect-[63/88] max-w-48 grid-cols-[1fr_3fr_1fr] overflow-hidden rounded-[1rem] border-4 bg-white transition-transform @container": true,
    "text-red-500": suit === "D" || suit === "H",
    flipped: hidden,
  }}
>
  {@render label()}
  {#if rank === "K" || rank === "Q" || rank === "J"}
    <div class="flex items-center p-5">
      {@render symbol()}
    </div>
  {:else}
    {@const count = rank === "A" ? 1 : rank}
    <div class="flex flex-wrap items-center justify-center overflow-hidden">
      {#each Array(count) as _}
        <div class="w-[20cqw]">{@render symbol()}</div>
      {/each}
    </div>
  {/if}
  <div class="rotate-180">
    {@render label()}
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
