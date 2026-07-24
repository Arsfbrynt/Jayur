<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useListStore } from "../stores/listStore";
import { buildShareLink } from "../utils/share";
import type { ShopList } from "../db/db";

const router = useRouter();
const store = useListStore();
const copiedId = ref<string | null>(null);
const confirmDeleteId = ref<string | null>(null);

onMounted(() => {
  if (!store.loaded) store.loadAll();
});

function progress(list: ShopList) {
  const total = list.items.length;
  const done = list.items.filter((i) => i.checked).length;
  return { total, done };
}

async function share(list: ShopList) {
  const link = buildShareLink(list);
  try {
    await navigator.clipboard.writeText(link);
    copiedId.value = list.id;
    setTimeout(() => (copiedId.value = null), 1800);
  } catch {
    prompt("Copy link share ini:", link);
  }
}

function askDelete(id: string) {
  confirmDeleteId.value = id;
}

async function confirmDelete(id: string) {
  await store.deleteList(id);
  confirmDeleteId.value = null;
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <button
      class="font-mono text-xs text-ink/50 self-start flex item-center gap-1"
      @click="router.push('/')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        width="16px"
      >
        <path
          d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320zM188.7 308.7L292.7 204.7C297.3 200.1 304.2 198.8 310.1 201.2C316 203.6 320 209.5 320 216L320 272L416 272C433.7 272 448 286.3 448 304L448 336C448 353.7 433.7 368 416 368L320 368L320 424C320 430.5 316.1 436.3 310.1 438.8C304.1 441.3 297.2 439.9 292.7 435.3L188.7 331.3C182.5 325.1 182.5 314.9 188.7 308.7z"
        />
      </svg>
      kembali
    </button>

    <div>
      <p
        class="font-mono text-xs tracking-[0.25em] text-pine/60 uppercase mb-1"
      >
        Daftar Menu Belanja
      </p>
      <h1 class="font-display text-2xl font-bold text-ink">Menu tersimpan</h1>
    </div>

    <div v-if="!store.lists.length" class="text-center py-16 text-ink/40">
      <p class="font-display font-semibold mb-1">Belum ada list belanja</p>
      <p class="text-sm">Bikin menu dulu di page satunya.</p>
    </div>

    <button
      class="self-start font-mono text-xs text-pine/70 hover:text-pine border-b border-dashed border-pine/30"
      @click="router.push('/import')"
    >
      + import dari file JSON
    </button>

    <div
      v-for="list in store.lists"
      :key="list.id"
      class="nota-card shadow-nota rounded-2xl px-5 pt-5 pb-1"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="cursor-pointer" @click="router.push(`/list/${list.id}`)">
          <p class="font-display font-semibold text-ink text-lg leading-snug">
            {{ list.judul }}
          </p>
          <p class="font-mono text-xs text-ink/40 mt-1">
            {{ progress(list).done }}/{{ progress(list).total }} dibeli &middot;
            {{
              new Date(list.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })
            }}
          </p>
        </div>
      </div>

      <div class="dot-divider my-3"></div>

      <div class="flex items-center gap-4 pb-3 font-mono text-xs">
        <button
          class="text-pine/80 hover:text-pine"
          @click="router.push(`/list/${list.id}`)"
        >
          Detail
        </button>
        <button
          class="text-turmeric hover:text-turmeric-light"
          @click="share(list)"
        >
          {{ copiedId === list.id ? "Link disalin!" : "Share" }}
        </button>
        <button
          v-if="confirmDeleteId !== list.id"
          class="text-brick/70 hover:text-brick ml-auto"
          @click="askDelete(list.id)"
        >
          Hapus
        </button>
        <span v-else class="ml-auto flex items-center gap-2">
          <button
            class="text-brick font-semibold"
            @click="confirmDelete(list.id)"
          >
            Hapus aja
          </button>
          <button class="text-ink/40" @click="confirmDeleteId = null">
            Ga jadi
          </button>
        </span>
      </div>
    </div>
  </div>
</template>
