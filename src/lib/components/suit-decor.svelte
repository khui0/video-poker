<script lang="ts">
  import GameIconsDiamonds from "~icons/game-icons/diamonds";
  import GameIconsClubs from "~icons/game-icons/clubs";
  import GameIconsHearts from "~icons/game-icons/hearts";
  import GameIconsSpades from "~icons/game-icons/spades";

  const date = new Date();
  const valentines = date.getDate() === 14 && date.getMonth() === 1;
</script>

<span class="inline-flex">
  <span class="text-red-500"><GameIconsDiamonds /></span>
  <GameIconsClubs />
  {#if !valentines}
    <span class="text-red-500"><GameIconsHearts /></span>
  {/if}
  <GameIconsSpades />
</span>
