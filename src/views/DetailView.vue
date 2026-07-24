<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useListStore } from "../stores/listStore";
import { buildShareLink, exportListAsFile } from "../utils/share";
import StampButton from "../components/StampButton.vue";

const props = defineProps<{ id: string }>();
const router = useRouter();
const store = useListStore();

onMounted(async () => {
  if (!store.loaded) await store.loadAll();
});

const list = computed(() => store.byId(props.id));
const doneCount = computed(
  () => list.value?.items.filter((i) => i.checked).length ?? 0,
);

function toggle(itemId: string) {
  store.toggleItem(props.id, itemId);
}

async function share() {
  if (!list.value) return;
  const link = buildShareLink(list.value);
  try {
    await navigator.clipboard.writeText(link);
    alert("Link share disalin ke clipboard");
  } catch {
    prompt("Copy link share ini:", link);
  }
}

function exportFile() {
  if (list.value) exportListAsFile(list.value);
}
</script>

<template>
  <div v-if="list" class="flex flex-col gap-5">
    <button
      class="font-mono text-xs text-ink/50 self-start flex items-center gap-1"
      @click="router.push('/list')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        width="16px"
      >
        <path
          d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320zM188.7 308.7L292.7 204.7C297.3 200.1 304.2 198.8 310.1 201.2C316 203.6 320 209.5 320 216L320 272L416 272C433.7 272 448 286.3 448 304L448 336C448 353.7 433.7 368 416 368L320 368L320 424C320 430.5 316.1 436.3 310.1 438.8C304.1 441.3 297.2 439.9 292.7 435.3L188.7 331.3C182.5 325.1 182.5 314.9 188.7 308.7z"
        /></svg
      >semua menu list
    </button>

    <div>
      <p
        class="font-mono text-xs tracking-[0.25em] text-pine/60 uppercase mb-1"
      >
        {{ doneCount }}/{{ list.items.length }} dibeli
      </p>
      <h1 class="font-display text-2xl font-bold text-ink">{{ list.judul }}</h1>
    </div>

    <div class="nota-card shadow-nota rounded-2xl px-5 pt-4 pb-2">
      <button
        v-for="item in list.items"
        :key="item.id"
        class="w-full flex items-center gap-3 py-3 border-b border-dashed border-line last:border-none text-left"
        @click="toggle(item.id)"
      >
        <span
          class="w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors"
          :class="item.checked ? 'bg-pine border-pine' : 'border-line'"
        >
          <svg
            v-if="item.checked"
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
          >
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="#EFEDE4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span
          class="strike-item flex-1 text-sm font-medium"
          :class="[item.checked ? 'is-checked text-ink/40' : 'text-ink']"
        >
          {{ item.nama }}
        </span>
        <span
          class="font-mono text-xs shrink-0"
          :class="item.checked ? 'text-ink/30' : 'text-ink/60'"
        >
          {{ item.qty }}
        </span>
      </button>
    </div>

    <div class="flex gap-3">
      <StampButton variant="turmeric" class="flex-1" @click="share"
        >Share Link</StampButton
      >
      <StampButton variant="ghost" class="flex-1" @click="exportFile"
        >Export JSON</StampButton
      >
    </div>
  </div>

  <div v-else class="text-center py-20 text-ink/40">
    <p class="font-display font-semibold mb-1">List Menu tidak ditemukan</p>
    <button
      class="font-mono text-xs text-pine underline mt-2"
      @click="router.push('/list')"
    >
      balik ke daftar
    </button>
  </div>
</template>
