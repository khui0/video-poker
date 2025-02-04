<script lang="ts">
  import { Deck, type Rank, type Suit } from "$lib/cards";
  import Button from "$lib/components/button.svelte";
  import SuitDecor from "$lib/components/suit-decor.svelte";
  import { onMount } from "svelte";
  import Card from "../lib/components/card.svelte";

  import TablerChevronLeft from "~icons/tabler/chevron-left";
  import TablerChevronRight from "~icons/tabler/chevron-right";
  import { fly } from "svelte/transition";

  const POKER_HANDS: {
    [key: string]: {
      name: string;
      mult: number;
    };
  } = {
    "royal-flush": {
      name: "Royal Flush",
      mult: 100,
    },
    "straight-flush": {
      name: "Stright Flush",
      mult: 50,
    },
    "four-kind": {
      name: "Four of a Kind",
      mult: 20,
    },
    "full-house": {
      name: "Full House",
      mult: 10,
    },
    flush: {
      name: "Flush",
      mult: 8,
    },
    straight: {
      name: "Straight",
      mult: 6,
    },
    "three-kind": {
      name: "Three of a Kind",
      mult: 3,
    },
    "two-pair": {
      name: "Two Pair",
      mult: 2,
    },
    pair: {
      name: "Pair",
      mult: 1,
    },
    "high-card": {
      name: "High Card",
      mult: 0,
    },
  };

  const MIN_BET = 10;

  const deck = new Deck();

  interface HandCard {
    rank: Rank;
    suit: Suit;
    hidden?: boolean;
    focus?: boolean;
    selected?: boolean;
  }

  let hand: HandCard[] = $state([]);

  let amount: number = $state(1000);
  let bet: number = $state(10);

  let allowBet: boolean = $state(true);
  let allowSelect: boolean = $state(true);
  let allowDraw: boolean = $state(false);

  let showResult: boolean = $state(false);
  let result: string = $state("");

  onMount(() => {
    newHand();
  });

  function newHand() {
    hand = [];
    for (let i = 0; i < 5; i++) {
      const result = deck.draw();
      if (result) {
        hand.push({
          ...result,
          hidden: true,
        });
      } else {
        deck.reset();
        break;
      }
    }
  }

  let revealInterval: number = 0;
  let revealIndex: number = 0;

  function startRound() {
    allowBet = false;
    allowDraw = true;
    clearInterval(revealInterval);
    revealInterval = setInterval(() => {
      if (revealIndex < hand.length) {
        hand[revealIndex].hidden = false;
      }
      revealIndex++;
    }, 25);
  }

  function drawCards() {
    allowDraw = false;
    for (let i = 0; i < hand.length; i++) {
      if (!hand[i].selected) {
        const result = deck.draw();
        if (!result) throw new Error("Out of cards");
        hand[i] = { ...result, hidden: true };
        setTimeout(() => {
          hand[i].hidden = false;
        }, 300);
      }
    }
    setTimeout(() => {
      result = checkHand(hand);
      showResult = true;
    }, 300);
  }

  function checkHand(hand: { rank: Rank; suit: Suit }[]) {
    const sorted = hand.toSorted((a, b) => rankToValue(a.rank) - rankToValue(b.rank));
    const flush = hand.every((card) => card.suit === hand[0].suit);
    const straight = isConsecutive(sorted.map((card) => rankToValue(card.rank)));
    const lowSorted = hand.toSorted(
      (a, b) => toLowAce(rankToValue(a.rank)) - toLowAce(rankToValue(b.rank)),
    );
    const lowStraight = isConsecutive(lowSorted.map((card) => rankToValue(card.rank)));
    const kinds = countKinds(hand);

    if (flush) {
      if (sorted[sorted.length - 1].rank === "A" && straight) return "royal-flush";
      if (straight || lowStraight) return "straight-flush";
      return "flush";
    }
    if (straight) return "straight";
    if (kinds[0].count === 4) return "four-kind";
    if (kinds[0].count === 3) {
      if (kinds[1].count === 2) return "full-house";
      return "three-kind";
    }
    if (kinds[0].count === 2) {
      if (kinds[1].count === 2) return "two-pair";
      return "pair";
    }
    return "high-card";
  }

  function rankToValue(rank: Rank): number {
    const values: { [key: string]: number } = {
      A: 14,
      K: 13,
      Q: 12,
      J: 11,
    };
    if (rank in values) {
      return values[rank];
    }
    return parseInt(rank);
  }

  function toLowAce(rank: number): number {
    if (rank === 14) return 1;
    return rank;
  }

  function isConsecutive(array: number[]): boolean {
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] + 1 !== array[i]) return false;
    }
    return true;
  }

  function countKinds(hand: { rank: Rank }[]) {
    const counts: { [key: string]: number } = {};
    for (let i = 0; i < hand.length; i++) {
      const index = hand[i].rank;
      counts[index] ??= 0;
      counts[index]++;
    }
    return Object.entries(counts)
      .toSorted((a, b) => b[1] - a[1])
      .map((item) => {
        return {
          rank: item[0],
          count: item[1],
        };
      });
  }
</script>

<div class="flex flex-col gap-4">
  <div class="relative flex flex-col items-center self-center">
    <h1 class="text-center text-3xl font-bold uppercase">Video Poker</h1>
    <SuitDecor></SuitDecor>
  </div>
  <div>
    <div class="mx-2 flex flex-col text-center">
      <p class="text-sm font-medium uppercase leading-none text-base-content/50">You Have</p>
      <p class="text-5xl font-bold">${amount.toLocaleString()}</p>
    </div>
  </div>
  <div class="flex items-center justify-center gap-2">
    <Button
      disabled={!allowBet}
      onclick={() => {
        bet = MIN_BET;
      }}>Min</Button
    >
    <Button
      disabled={!allowBet}
      onclick={() => {
        if (bet <= MIN_BET) {
          bet = amount;
        } else {
          bet -= 10;
        }
      }}
      ><TablerChevronLeft />
    </Button>
    <div class="mx-2 flex flex-col text-center">
      <p class="text-sm font-medium uppercase leading-none text-base-content/50">Bet Amount</p>
      <p class="text-4xl font-bold">${bet.toLocaleString()}</p>
    </div>
    <Button
      disabled={!allowBet}
      onclick={() => {
        if (bet >= amount) {
          bet = MIN_BET;
        } else {
          bet += 10;
        }
      }}
      ><TablerChevronRight />
    </Button>
    <Button
      disabled={!allowBet}
      onclick={() => {
        bet = amount;
      }}>Max</Button
    >
  </div>
  <div class="flex h-12 items-center justify-center gap-4">
    {#if allowBet}
      <div in:fly={{ y: -25 }} out:fly={{ y: -25 }}>
        <Button onclick={startRound}>Place Bet</Button>
      </div>
    {/if}
    {#if result}
      <p in:fly={{ y: 25 }} out:fly={{ y: 25 }} class="text-4xl font-bold uppercase">
        {POKER_HANDS[result].name}!
        <span class="text-blue-600 lowercase">{POKER_HANDS[result].mult}x</span>
      </p>
    {/if}
  </div>
  <div class="flex items-center justify-center gap-2 pt-8">
    {#each hand as card}
      <div
        class={{
          "w-48 rounded-[1rem] transition-all focus:outline-none focus-visible:z-10 focus-visible:shadow-[0_0_0_0.5rem] focus-visible:shadow-blue-500": true,
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
  <div class="my-4 flex h-12 items-center justify-center gap-4">
    {#if allowDraw}
      <div in:fly={{ y: -25 }} out:fly={{ y: -25 }}>
        <Button onclick={drawCards}>Draw</Button>
      </div>
    {/if}
  </div>
</div>
