<script lang="ts">
  import Button from "$lib/components/button.svelte";
  import TablerPlus from "~icons/tabler/plus";
  import TablerMinus from "~icons/tabler/minus";
  import Value from "$lib/components/value.svelte";

  const MIN_BET = 10;

  let {
    bet = $bindable(),
    amount = $bindable(),
    state = $bindable(),
  }: {
    bet: number;
    amount: number;
    state: GameState;
  } = $props();

  function decrease() {
    if (state !== "bet") return;
    if (bet <= MIN_BET) {
      bet = amount;
    } else {
      bet -= 10;
    }
  }

  function increase() {
    if (state !== "bet") return;
    if (bet >= amount) {
      bet = MIN_BET;
    } else {
      bet += 10;
    }
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
  }}
/>

<div class="mx-auto grid w-fit grid-cols-1 place-items-center gap-2 sm:grid-cols-3">
  <div class="flex w-fit items-center justify-center gap-2">
    <Button
      disabled={state !== "bet"}
      onclick={() => {
        if (state !== "bet") return;
        bet = MIN_BET;
      }}
      >Min
    </Button>
    <Button disabled={state !== "bet"} onclick={decrease}>
      <TablerMinus />
    </Button>
  </div>
  <Value text="Bet Amount">
    <p class="text-4xl font-bold">${bet.toLocaleString()}</p>
  </Value>
  <div class="flex w-fit items-center justify-center gap-2">
    <Button disabled={state !== "bet"} onclick={increase}>
      <TablerPlus />
    </Button>
    <Button
      disabled={state !== "bet"}
      onclick={() => {
        if (state !== "bet") return;
        bet = amount;
      }}
      >Max
    </Button>
  </div>
</div>
