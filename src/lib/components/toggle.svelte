<script lang="ts">
  let {
    value = $bindable("false"),
    color = "blue",
  }: {
    value?: string;
    color?: "blue" | "red" | "green" | "neutral";
  } = $props();

  let enabled = $state(value === "true");

  $effect(() => {
    value = enabled ? "true" : "false";
  });
</script>

<label class="group relative inline-block h-8 w-12">
  <input type="checkbox" bind:checked={enabled} class="hidden" />
  <div class="absolute top-1/2 h-4 w-full -translate-y-1/2">
    <div class="absolute bottom-0 left-0 top-1 h-3.5 w-full rounded-md bg-gray-400"></div>
    <div
      class="absolute left-0 top-0 flex h-3.5 w-full items-center justify-center rounded-md bg-gray-300"
    ></div>
  </div>
  <div
    class={{
      "absolute left-0 top-0 w-7 transition-[left]": true,
      "left-[calc(3rem-1.75rem)]": enabled,
    }}
  >
    <div
      class={{
        "absolute bottom-0 left-0 top-2 h-6 w-full rounded-lg": true,
        "bg-blue-600": color === "blue",
        "bg-green-600": color === "green",
        "bg-red-600": color === "red",
        "bg-gray-500": color === "neutral",
      }}
    ></div>
    <div
      class={{
        "absolute left-0 top-0 flex h-6 w-full items-center justify-center rounded-lg transition-[top] group-hover:top-0.5 group-active:top-1": true,
        "bg-blue-500": color === "blue",
        "bg-green-500": color === "green",
        "bg-red-500": color === "red",
        "bg-gray-400": color === "neutral",
      }}
    ></div>
  </div>
</label>
