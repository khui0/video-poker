<script lang="ts">
  import { POKER_HANDS } from "$lib/poker";
</script>

<div class="flex flex-col gap-2">
  {#each Object.values(POKER_HANDS) as hand}
    <div class="flex w-64 justify-between gap-2 px-4 text-lg">
      <p>{hand.name}</p>
      <p class="font-bold text-blue-600">{hand.mult}x</p>
    </div>
  {/each}
</div>
