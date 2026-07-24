<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useListStore } from "../stores/listStore";
import { decodeSharedList, parseImportedFile } from "../utils/share";
import StampButton from "../components/StampButton.vue";

const props = defineProps<{ payload?: string }>();
const router = useRouter();
const store = useListStore();

const preview = ref<{
  judul: string;
  items: { nama: string; qty: string; checked?: boolean }[];
} | null>(null);
const error = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (props.payload) {
    const decoded = decodeSharedList(props.payload);
    if (decoded) {
      preview.value = decoded;
    } else {
      error.value = "Link share ini nggak valid atau rusak.";
    }
  }
});

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const parsed = parseImportedFile(String(reader.result));
    if (parsed) {
      preview.value = parsed;
      error.value = "";
    } else {
      error.value = "File JSON nggak sesuai format menu belanja.";
    }
  };
  reader.readAsText(file);
}

async function confirmImport() {
  if (!preview.value) return;
  const list = await store.importList(preview.value.judul, preview.value.items);
  router.replace(`/list/${list.id}`);
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <button
      class="font-mono text-xs text-ink/50 self-start flex items-center gap-1"
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
        Import Menu
      </p>
      <h1 class="font-display text-2xl font-bold text-ink">
        Terima daftar belanja
      </h1>
    </div>

    <div v-if="error" class="text-brick text-sm font-mono">{{ error }}</div>

    <div
      v-if="preview"
      class="nota-card shadow-nota rounded-2xl px-5 pt-4 pb-2"
    >
      <p class="font-display font-semibold text-lg mb-2">{{ preview.judul }}</p>
      <div
        v-for="(item, idx) in preview.items"
        :key="idx"
        class="flex items-center justify-between py-2 border-b border-dashed border-line last:border-none text-sm"
      >
        <span>{{ item.nama }}</span>
        <span class="font-mono text-xs text-ink/50">{{ item.qty }}</span>
      </div>
    </div>

    <StampButton
      v-if="preview"
      variant="turmeric"
      class="w-full"
      @click="confirmImport"
    >
      Simpan ke Menu Saya
    </StampButton>

    <div
      v-if="!props.payload"
      class="nota-card shadow-nota rounded-2xl px-5 py-6 flex flex-col items-center gap-3"
    >
      <p class="text-sm text-ink/50 text-center">
        atau upload file .json hasil export
      </p>
      <StampButton variant="ghost" @click="fileInput?.click()"
        >Pilih File JSON</StampButton
      >
      <input
        ref="fileInput"
        type="file"
        accept="application/json"
        class="hidden"
        @change="onFileChange"
      />
    </div>
  </div>
</template>
