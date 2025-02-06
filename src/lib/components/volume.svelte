<script lang="ts">
  import { Howler } from "howler";
  import { onMount } from "svelte";

  import Button from "./button.svelte";

  import TablerVolume from "~icons/tabler/volume";
  import TablerVolumeOff from "~icons/tabler/volume-off";
  import TablerMusic from "~icons/tabler/music";
  import TablerMusicOff from "~icons/tabler/music-off";
  import TablerPlayerSkipForward from "~icons/tabler/player-skip-forward";
  import { pauseTheme, playTheme, resumeTheme, skipTheme } from "$lib/sound";

  let muted: boolean = $state(false);
  let noMusic: boolean = $state(false);

  onMount(() => {
    muted = localStorage.getItem("muted") === "true";
    noMusic = localStorage.getItem("no-music") === "true";
  });

  $effect(() => {
    if (muted) {
      Howler.volume(0);
    } else {
      Howler.volume(1);
    }
    if (noMusic) {
      pauseTheme();
    } else {
      resumeTheme();
    }
    localStorage.setItem("muted", muted ? "true" : "false");
    localStorage.setItem("no-music", noMusic ? "true" : "false");
  });
</script>

<Button
  color="neutral"
  size="small"
  onclick={() => {
    skipTheme();
  }}
  label="Skip theme track"
>
  <TablerPlayerSkipForward />
</Button>
<Button
  color="neutral"
  size="small"
  onclick={() => {
    noMusic = !noMusic;
  }}
  label="Toggle theme music"
>
  {#if noMusic}
    <TablerMusicOff />
  {:else}
    <TablerMusic />
  {/if}
</Button>
<Button
  color="neutral"
  size="small"
  onclick={() => {
    muted = !muted;
  }}
  label="Toggle all sounds"
>
  {#if muted}
    <TablerVolumeOff />
  {:else}
    <TablerVolume />
  {/if}
</Button>
