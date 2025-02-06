<script lang="ts">
  import { Howler } from "howler";

  import Button from "./button.svelte";

  import TablerVolume from "~icons/tabler/volume";
  import TablerVolumeOff from "~icons/tabler/volume-off";
  import { onMount } from "svelte";

  let muted: boolean = $state(false);

  onMount(() => {
    muted = localStorage.getItem("muted") === "true";
  });

  $effect(() => {
    if (muted) {
      Howler.volume(0);
    } else {
      Howler.volume(1);
    }
    localStorage.setItem("muted", muted ? "true" : "false");
  });
</script>

<Button
  color="neutral"
  size="small"
  onclick={() => {
    muted = !muted;
  }}
>
  {#if muted}
    <TablerVolumeOff />
  {:else}
    <TablerVolume />
  {/if}
</Button>
