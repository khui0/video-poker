<script lang="ts">
  import { onMount } from "svelte";
  import { Deck, type Rank, type Suit } from "$lib/cards";
  import { checkHand, POKER_HANDS } from "$lib/poker";

  import Button from "$lib/components/button.svelte";
  import Logo from "$lib/components/logo.svelte";
  import Label from "$lib/components/label.svelte";
  import BetSelector from "./bet-selector.svelte";
  import Hand from "./hand.svelte";
  import StateSwap from "$lib/components/state-swap.svelte";
  import FullScreen from "$lib/components/full-screen.svelte";
  import Scoring from "$lib/components/scoring.svelte";

  import { stats } from "$lib/stats";

  import SimpleIconsGithub from "~icons/simple-icons/github";
  import Volume from "$lib/components/volume.svelte";
  import { playCard, playCoin, playTheme } from "$lib/sound";

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

  let showHelp: boolean = $state(false);
  let showCredits: boolean = $state(false);
  let showStats: boolean = $state(false);

  onMount(() => {
    amount = parseInt(localStorage.getItem("balance") || "1000");
    bet = Math.min(10, amount);
    const savedHand = localStorage.getItem("hand");
    if (savedHand) {
      hand = JSON.parse(savedHand);
    } else {
      newHand();
    }
  });

  function newHand() {
    playCard();
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

    localStorage.setItem("hand", JSON.stringify(hand));
  }

  let revealInterval: number = 0;

  function startRound() {
    playTheme();
    playCard();
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
    playCard();
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
      playCoin();
      resultString = checkHand(hand);
      gameState = "result";

      const score = bet * POKER_HANDS[resultString].mult;
      amount += score;
      localStorage.setItem("balance", amount.toString());
      bet = Math.min(bet, amount);
      if (amount >= maxAmount) {
        maxAmount = amount;
      }
      // Save stats
      if (amount >= $stats.bestAmount) {
        $stats.bestAmount = amount;
      }
      if (score >= $stats.bestHand.score) {
        $stats.bestHand.score = score;
        $stats.bestHand.type = resultString;
      }
      if (amount <= 0) {
        // GAME LOSE
        localStorage.removeItem("balance");
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

<svelte:window
  onkeydown={(e) => {
    if (e.key === "Escape") {
      showHelp = false;
      showCredits = false;
      showStats = false;
    }
  }}
/>

<div class="flex flex-1 flex-col gap-4">
  <Logo />
  <Label text="You Have">
    <p class="text-5xl font-bold">${amount.toLocaleString()}</p>
  </Label>
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
<footer class="mt-4 flex flex-wrap justify-between gap-2 leading-none text-base-content/25">
  <div class="flex flex-wrap items-center gap-1">
    <Button
      size="small"
      onclick={() => {
        showCredits = true;
      }}
    >
      Credits
    </Button>
    <Button
      size="small"
      onclick={() => {
        showStats = true;
      }}
    >
      Stats
    </Button>
  </div>
  <div class="flex flex-wrap items-center gap-1">
    <p class="px-2">{import.meta.env.PACKAGE_VERSION}</p>
    <Button
      size="small"
      onclick={() => {
        showHelp = true;
      }}
    >
      Help
    </Button>
    <Volume />
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
{#if showHelp}
  <FullScreen>
    <h1 class="text-4xl font-bold">How to play</h1>
    <div class="flex flex-col items-center justify-center gap-x-8 gap-y-4 sm:flex-row-reverse">
      <ol class="list-decimal text-start text-lg">
        <li>Place a bet</li>
        <li>Select cards to hold</li>
        <li>Play better poker hands</li>
        <li>?</li>
        <li>Profit</li>
      </ol>
      <Scoring />
    </div>
    <Button
      onclick={() => {
        showHelp = false;
      }}
      >Got It
    </Button>
  </FullScreen>
{/if}
{#if showCredits}
  <FullScreen>
    <h1 class="text-4xl font-bold">Credits</h1>
    <div class="flex flex-col items-center gap-4 text-center text-lg">
      <p>Made by Kenny Hui</p>
      <a href="https://game-icons.net/" target="_blank" rel="noopener noreferrer">
        Suit icons by Skoll
      </a>
      <a href="https://www.zapsplat.com/" target="_blank" rel="noopener noreferrer">
        Sound effects from ZapSplat
      </a>
      <a
        href="https://www.youtube.com/watch?v=42Yw2Llnwzw"
        target="_blank"
        rel="noopener noreferrer"
      >
        AnimeLive - Best Friend
      </a>
      <a
        href="https://www.youtube.com/watch?v=VUHcyGeFP-A"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pix - Alien wolves
      </a>
      <a
        href="https://www.youtube.com/watch?v=G2nmOULeOBQ"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pix - Space travel
      </a>
      <a
        href="https://www.youtube.com/watch?v=AnW1JtENMS4"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pix - Poisonous Bite
      </a>
      <a
        href="https://github.com/khui0/video-poker"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <SimpleIconsGithub />
      </a>
    </div>
    <Button
      onclick={() => {
        showCredits = false;
      }}
      >Close
    </Button>
  </FullScreen>
{/if}
{#if showStats}
  <FullScreen>
    <h1 class="text-4xl font-bold">Statistics</h1>
    <p class="text-xl">
      All time highest balance <span class="font-bold text-blue-600">
        ${$stats.bestAmount.toLocaleString()}
      </span>
    </p>
    <p class="text-xl">
      All time best hand
      <span class="font-bold text-blue-600">
        ${$stats.bestHand.score.toLocaleString()}
      </span>
      ({POKER_HANDS[$stats.bestHand.type || "high-card"].name})
    </p>
    <p class="text-xl">Feeling lucky?</p>
    <Button
      onclick={() => {
        showStats = false;
      }}
      >Continue Playing
    </Button>
  </FullScreen>
{/if}
