<script lang="ts">
  import { Deck, type Rank, type Suit } from "$lib/cards";
  import Button from "$lib/components/button.svelte";
  import Card from "../lib/components/card.svelte";

  const deck = new Deck();

  let hand: {
    rank: Rank;
    suit: Suit;
    hidden?: boolean;
    focus?: boolean;
    selected?: boolean;
  }[] = $state([]);

  let remaining = $state(deck.remaining);

  newHand();

  function newHand() {
    hand = [];
    for (let i = 0; i < 5; i++) {
      const result = deck.draw();
      if (result) {
        hand.push(result);
      } else {
        deck.reset();
        break;
      }
    }
    remaining = deck.remaining;
  }
</script>

<div class="flex flex-col gap-4">
  <Button onclick={newHand}>New Hand</Button>
  <p class="text-lg font-bold">In Deck: {remaining}/52</p>

  <div class="flex items-center justify-center gap-2">
    {#each hand as card}
      <div
        class={{
          "w-48 transition-transform": true,
          "-translate-y-8": card.selected,
        }}
        role="button"
        tabindex="0"
        onmouseenter={() => {
          card.focus = true;
        }}
        onmouseleave={() => {
          card.focus = false;
        }}
        onclick={() => {
          card.selected = !card.selected;
        }}
        onkeydown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            card.selected = !card.selected;
          }
        }}
      >
        <Card {...card} />
      </div>
    {/each}
  </div>
</div>
