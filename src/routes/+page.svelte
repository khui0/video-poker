<script lang="ts">
  import { onMount } from "svelte";
  import { Deck, type Rank, type Suit } from "$lib/cards";
  import { checkHand, POKER_HANDS } from "$lib/poker";

  import Button from "$lib/components/button.svelte";
  import Logo from "$lib/components/logo.svelte";
  import Value from "$lib/components/value.svelte";
  import BetSelector from "./bet-selector.svelte";
  import Hand from "./hand.svelte";
  import StateSwap from "$lib/components/state-swap.svelte";
  import FullScreen from "$lib/components/full-screen.svelte";

  const deck = new Deck();

  let hand: {
    rank: Rank;
    suit: Suit;
    hidden?: boolean;
    focus?: boolean;
    selected?: boolean;
  }[] = $state([]);

  let amount: number = $state(1000);
  let maxAmount: number = $state(1000);
  let bet: number = $state(10);

  let resultString: string = $state("");

  let gameState: GameState = $state("bet");

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

  function startRound() {
    gameState = "hold";
    amount -= bet;

    clearInterval(revealInterval);
    let revealIndex: number = 0;
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
      // ROUND END
      resultString = checkHand(hand);
      gameState = "result";
      amount += bet * POKER_HANDS[resultString].mult;
      bet = Math.min(bet, amount);
      if (amount >= maxAmount) {
        maxAmount = amount;
      }
      if (amount <= 0) {
        gameState = "penniless";
      }
    }, 300);
  }

  function resetRound() {
    deck.reset();
    newHand();
  }

  function resetGame() {
    amount = 1000;
    maxAmount = 1000;
    bet = 10;
    resetRound();
  }
</script>

<div class="flex flex-1 flex-col gap-4">
  <Logo />
  <Value text="You Have">
    <p class="text-5xl font-bold">${amount.toLocaleString()}</p>
  </Value>
  <BetSelector bind:bet bind:amount bind:state={gameState} />
  <StateSwap bind:state={gameState}>
    {#snippet betState()}
      <Button onclick={startRound}>Place Bet</Button>
    {/snippet}
    {#snippet holdState()}
      <p class="text-xl uppercase text-base-content/50">Select cards to hold</p>
    {/snippet}
    {#snippet resultState()}
      <div class="flex flex-col items-center text-center">
        <p class="text-4xl font-bold uppercase">
          {POKER_HANDS[resultString].name}!
          <span class="lowercase text-blue-600">{POKER_HANDS[resultString].mult}x</span>
        </p>
        <p class="text-base-content/50">
          +${(bet * POKER_HANDS[resultString].mult).toLocaleString()}
        </p>
      </div>
    {/snippet}
  </StateSwap>
  <Hand bind:hand bind:state={gameState} />
  <StateSwap bind:state={gameState}>
    {#snippet holdState()}
      <Button onclick={drawCards}>Draw</Button>
    {/snippet}
    {#snippet resultState()}
      <Button onclick={resetRound}>New Round</Button>
    {/snippet}
  </StateSwap>
</div>
<footer
  class="mt-4 flex flex-wrap justify-between gap-x-4 gap-y-2 leading-none text-base-content/25"
>
  <div class="flex flex-wrap gap-4">
    <p>&copy; 2025 Kenny Hui</p>
    <a href="https://game-icons.net/" target="_blank" rel="noopener noreferrer">
      Suit icons by Skoll
    </a>
  </div>
  <div class="flex flex-wrap gap-4">
    <a href="https://github.com/khui0/video-poker" target="_blank" rel="noopener noreferrer">
      GitHub
    </a>
    <p>{import.meta.env.PACKAGE_VERSION}</p>
  </div>
</footer>
{#if gameState === "penniless"}
  <FullScreen>
    <h1 class="text-4xl font-bold">You lost all your money!</h1>
    <p class="text-2xl font-medium">
      At some point you had <span class="font-bold text-blue-600">
        ${maxAmount.toLocaleString()}
      </span>
    </p>
    <Button onclick={resetGame}>Play Again</Button>
  </FullScreen>
{/if}
