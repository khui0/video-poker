<script lang="ts">
  import Button from "$lib/components/button.svelte";
  import TablerPlus from "~icons/tabler/plus";
  import TablerMinus from "~icons/tabler/minus";
  import Label from "$lib/components/label.svelte";

  const MIN_BET = 1;

  let {
    bet = $bindable(),
    amount = $bindable(),
    state: gameState = $bindable(),
    lock = $bindable(false),
  }: {
    bet: number;
    amount: number;
    state: GameState;
    lock?: boolean;
  } = $props();

  let incrementLevels: number = $derived(Math.max(amount.toString().length - 2, 2));
  let increment: number = $state(10);

  let disabled: boolean = $derived(gameState !== "bet" || lock);

  function decrease() {
    if (disabled) return;
    bet -= increment;
    if (bet < MIN_BET) {
      bet = amount;
    }
  }

  function increase() {
    if (disabled) return;
    bet += increment;
    if (bet > amount) {
      bet = MIN_BET;
    }
  }

  function min() {
    if (disabled) return;
    bet = MIN_BET;
  }

  function max() {
    if (disabled) return;
    bet = amount;
  }
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === "-") {
      decrease();
    }
    if (e.key === "=") {
      increase();
    }
    if (e.key === "_") {
      min();
    }
    if (e.key === "+") {
      max();
    }
  }}
/>

<div>
  <div class="mx-auto grid w-fit grid-cols-1 place-items-center gap-2 sm:grid-cols-3">
    <div class="flex w-fit items-center justify-center gap-2">
      <Button {disabled} onclick={min}>Min</Button>
      <div class="hidden sm:block">
        <Button {disabled} onclick={decrease}>
          <TablerMinus />
        </Button>
      </div>
      <div class="sm:hidden">
        <Button {disabled} onclick={max}>Max</Button>
      </div>
    </div>
    <Label text="Bet Amount{lock ? ' (Locked)' : ''}">
      <p class="text-4xl font-bold">${bet.toLocaleString()}</p>
    </Label>
    <div class="flex w-fit items-center justify-center gap-2">
      <div class="sm:hidden">
        <Button {disabled} onclick={decrease}>
          <TablerMinus />
        </Button>
      </div>
      <Button {disabled} onclick={increase}>
        <TablerPlus />
      </Button>
      <div class="hidden sm:block">
        <Button {disabled} onclick={max}>Max</Button>
      </div>
    </div>
  </div>
  <div class="mt-3 flex flex-wrap justify-center gap-2">
    <div class="flex flex-wrap justify-center gap-1">
      {#each Array(incrementLevels) as _, i}
        {@const value = 10 ** (i + 1)}
        <Button
          size="small"
          {disabled}
          held={increment === value}
          onclick={() => {
            increment = value;
          }}>{value}</Button
        >
      {/each}
    </div>
    <div class="flex flex-wrap justify-center gap-1">
      <Button
        size="small"
        {disabled}
        onclick={() => {
          bet = Math.max(MIN_BET, Math.floor(amount * 0.25));
        }}>25%</Button
      >
      <Button
        size="small"
        {disabled}
        onclick={() => {
          bet = Math.max(MIN_BET, Math.floor(amount * 0.5));
        }}>50%</Button
      >
      <Button
        size="small"
        {disabled}
        onclick={() => {
          bet = Math.max(MIN_BET, Math.floor(amount * 0.75));
        }}>75%</Button
      >
    </div>
  </div>
</div>
