<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { Deck, type Rank, type Suit } from "$lib/cards";
  import { checkHand, POKER_HANDS } from "$lib/poker";

  import Button from "$lib/components/button.svelte";
  import Logo from "$lib/components/logo.svelte";
  import Value from "$lib/components/value.svelte";
  import BetSelector from "./bet-selector.svelte";
  import Hand from "./hand.svelte";
  import StateSwap from "$lib/components/state-swap.svelte";

  const deck = new Deck();

  let hand: {
    rank: Rank;
    suit: Suit;
    hidden?: boolean;
    focus?: boolean;
    selected?: boolean;
  }[] = $state([]);

  let amount: number = $state(1000);
  let bet: number = $state(10);

  let resultString: string = $state("");

  let gameState: "bet" | "hold" | "result" = $state("bet");

  onMount(() => {
    newHand();
  });

  function newHand() {
    gameState = "bet";

    deck.reset();
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
    gameState = "hold";

    clearInterval(revealInterval);
    revealIndex = 0;
    revealInterval = setInterval(() => {
      if (revealIndex < hand.length) {
        hand[revealIndex].hidden = false;
      }
      revealIndex++;
    }, 25);
  }

  function drawCards() {
    for (let i = 0; i < hand.length; i++) {
      if (!hand[i].selected) {
        const result = deck.draw();
        if (!result) throw new Error("Out of cards");
        hand[i] = { ...result, hidden: true };
        setTimeout(() => {
          hand[i].hidden = false;
        }, 300);
      }
      hand[i].selected = false;
    }
    setTimeout(() => {
      resultString = checkHand(hand);
      gameState = "result";
    }, 300);
  }

  function resetRound() {
    deck.reset();
    newHand();
  }
</script>

<div class="flex flex-col gap-4">
  <Logo />
  <Value text="You Have">
    <p class="text-5xl font-bold">${amount.toLocaleString()}</p>
  </Value>
  <BetSelector bind:bet bind:amount bind:state={gameState} />
  <StateSwap bind:state={gameState}>
    {#snippet bet()}
      <Button onclick={startRound}>Place Bet</Button>
    {/snippet}
    {#snippet result()}
      <p class="text-4xl font-bold uppercase">
        {POKER_HANDS[resultString].name}!
        <span class="lowercase text-blue-600">{POKER_HANDS[resultString].mult}x</span>
      </p>
    {/snippet}
  </StateSwap>
  <Hand bind:hand bind:state={gameState} />
  <StateSwap bind:state={gameState}>
    {#snippet hold()}
      <Button onclick={drawCards}>Draw</Button>
    {/snippet}
    {#snippet result()}
      <Button onclick={resetRound}>New Round</Button>
    {/snippet}
  </StateSwap>
</div>
