<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "pine" | "turmeric" | "brick" | "ghost";
    type?: "button" | "submit";
  }>(),
  { variant: "pine", type: "button" },
);
</script>

<template>
  <button
    :type="type"
    class="font-display font-semibold tracking-wide rounded-lg px-5 py-3 transition-transform active:scale-[0.97] active:rotate-[-0.4deg] disabled:opacity-40 disabled:pointer-events-none"
    :class="{
      'bg-pine text-paper shadow-nota hover:bg-pine-dark': variant === 'pine',
      'bg-[#ffe3cb] text-turmeric shadow-nota hover:bg-[#a46e3f] hover:text-[#ffe3cb]':
        variant === 'turmeric',
      'bg-brick text-paper shadow-nota hover:bg-brick-light':
        variant === 'brick',
      'bg-transparent text-pine border border-line hover:bg-black/5':
        variant === 'ghost',
    }"
  >
    <slot />
  </button>
</template>
