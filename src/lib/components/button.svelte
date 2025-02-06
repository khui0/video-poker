<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    onclick,
    disabled,
    held,
    size = "normal",
    color = "blue",
    label,
  }: {
    children: Snippet;
    onclick?: Function;
    disabled?: boolean;
    held?: boolean;
    size?: "normal" | "small";
    color?: "blue" | "red" | "green" | "neutral";
    label?: string;
  } = $props();
</script>

<button
  class={{
    "group relative flex-shrink-0 touch-manipulation rounded-lg font-semibold text-white": true,
    "pointer-events-none opacity-50": disabled,
    "h-12 px-4 text-xl": size === "normal",
    "h-8 px-3 text-base": size === "small",
  }}
  onclick={() => {
    onclick?.();
  }}
  {disabled}
  aria-label={label}
>
  <span role="presentation" class="opacity-0">{@render children?.()}</span>
  <div
    class={{
      "absolute bottom-0 left-0 w-full rounded-lg ": true,
      "h-10": size === "normal",
      "h-6": size === "small",
      "bg-blue-600": color === "blue",
      "bg-green-600": color === "green",
      "bg-red-600": color === "red",
      "bg-gray-500": color === "neutral",
    }}
  ></div>
  <div
    class={{
      "absolute left-0 top-0 flex w-full items-center justify-center rounded-lg transition-[top] group-hover:top-0.5 group-active:top-1": true,
      "top-0.5": held,
      "h-10": size === "normal",
      "h-6": size === "small",
      "bg-blue-500": color === "blue",
      "bg-green-500": color === "green",
      "bg-red-500": color === "red",
      "bg-gray-400": color === "neutral",
    }}
  >
    {@render children?.()}
  </div>
</button>
