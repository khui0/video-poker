<script lang="ts">
  let { children, text }: { children: Function; text: string } = $props();
</script>

<div>
  <div class="mx-2 flex flex-col text-center">
    <p class="text-sm font-medium uppercase leading-none text-base-content/50">{text}</p>
    {@render children()}
  </div>
</div>
