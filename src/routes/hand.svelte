<script lang="ts">
  import Card from "$lib/components/card.svelte";
  import { type Rank, type Suit } from "$lib/cards";

  let {
    hand = $bindable(),
    state: gameState = $bindable(),
  }: {
    hand: {
      rank: Rank;
      suit: Suit;
      hidden?: boolean;
      focus?: boolean;
      selected?: boolean;
    }[];
    state: GameState;
  } = $props();
</script>

<div class="flex touch-manipulation items-center justify-center gap-2 pt-8">
  {#each hand as card}
    <div
      class={{
        "w-48 select-none rounded-[1rem] transition-all focus:outline-none focus-visible:z-10 focus-visible:shadow-[0_0_0_0.5rem] focus-visible:shadow-blue-500": true,
        "-translate-y-8": card.selected,
        "pointer-events-none": gameState !== "hold",
      }}
      role="button"
      tabindex={gameState === "hold" ? 0 : -1}
      onpointerenter={() => {
        card.focus = true;
      }}
      onpointerleave={() => {
        card.focus = false;
      }}
      onpointerdown={() => {
        if (gameState !== "hold") return;
        card.selected = !card.selected;
      }}
      onkeydown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          if (gameState !== "hold") return;
          card.selected = !card.selected;
        }
      }}
    >
      <Card {...card} />
    </div>
  {/each}
</div>
