<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useListStore } from "../stores/listStore";
import StampButton from "../components/StampButton.vue";

const props = defineProps<{ id: string }>();
const router = useRouter();
const store = useListStore();

const judul = ref("");
const rows = ref<{ id?: string; nama: string; qty: string }[]>([]);
const loading = ref(true);

onMounted(async () => {
  if (!store.loaded) await store.loadAll();
  hydrate();
});

watch(
  () => store.byId(props.id),
  (list) => {
    if (list && loading.value) hydrate();
  },
);

function hydrate() {
  const list = store.byId(props.id);
  if (!list) {
    loading.value = false;
    return;
  }
  judul.value = list.judul;
  rows.value = list.items.map((i) => ({ id: i.id, nama: i.nama, qty: i.qty }));
  loading.value = false;
}

function addRow() {
  rows.value.push({ nama: "", qty: "" });
}

function removeRow(idx: number) {
  if (rows.value.length === 1) return;
  rows.value.splice(idx, 1);
}

const saving = ref(false);

async function save() {
  const filled = rows.value.filter((r) => r.nama.trim());
  if (!filled.length) return;
  saving.value = true;
  await store.updateList(props.id, judul.value, filled);
  saving.value = false;
  router.push(`/list/${props.id}`);
}
</script>

<template>
  <div v-if="!loading && rows.length" class="flex flex-col gap-5">
    <button
      class="font-mono text-xs text-ink/50 self-start flex items-center gap-1"
      @click="router.push(`/list/${props.id}`)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        width="16px"
      >
        <path
          d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320zM188.7 308.7L292.7 204.7C297.3 200.1 304.2 198.8 310.1 201.2C316 203.6 320 209.5 320 216L320 272L416 272C433.7 272 448 286.3 448 304L448 336C448 353.7 433.7 368 416 368L320 368L320 424C320 430.5 316.1 436.3 310.1 438.8C304.1 441.3 297.2 439.9 292.7 435.3L188.7 331.3C182.5 325.1 182.5 314.9 188.7 308.7z"
        /></svg
      >Batal
    </button>

    <div>
      <p
        class="font-mono text-xs tracking-[0.25em] text-pine/60 uppercase mb-1"
      >
        Edit List
      </p>
      <h1 class="font-display text-2xl font-bold text-ink">Ubah nota</h1>
    </div>

    <input
      v-model="judul"
      type="text"
      placeholder="Nama list"
      class="font-display font-semibold text-lg bg-transparent border-b-2 border-line focus:border-pine outline-none pb-2 placeholder:text-ink/30"
    />

    <div class="nota-card shadow-nota rounded-2xl px-4 pt-4 flex flex-col">
      <div
        class="flex text-xs font-mono text-ink/40 uppercase tracking-wide px-1 pb-2"
      >
        <span class="flex-1">Nama Barang</span>
        <span class="w-20 text-right">Qty</span>
        <span class="w-6"></span>
      </div>

      <div class="flex flex-col">
        <div
          v-for="(row, idx) in rows"
          :key="row.id ?? `new-${idx}`"
          class="flex items-center gap-2 py-1.5"
        >
          <input
            v-model="row.nama"
            type="text"
            placeholder="cth. bayam"
            class="flex-1 bg-transparent border-b border-line focus:border-pine outline-none py-1.5 text-sm placeholder:text-ink/25"
            @keydown.enter="addRow"
          />
          <input
            v-model="row.qty"
            type="text"
            placeholder="2 ikat"
            class="w-20 bg-transparent border-b border-line focus:border-pine outline-none py-1.5 text-sm text-right font-mono placeholder:text-ink/25"
          />
          <button
            class="w-6 text-ink/30 hover:text-brick text-lg leading-none"
            @click="removeRow(idx)"
          >
            &times;
          </button>
        </div>
      </div>

      <button
        class="font-mono text-xs text-pine/70 hover:text-pine text-left py-3 border-t border-dashed border-line mt-1"
        @click="addRow"
      >
        + tambah barang
      </button>
    </div>

    <StampButton
      variant="turmeric"
      class="w-full"
      :disabled="saving"
      @click="save"
    >
      {{ saving ? "Menyimpan..." : "Simpan Perubahan" }}
    </StampButton>
  </div>

  <div v-else-if="!loading" class="text-center py-20 text-ink/40">
    <p class="font-display font-semibold mb-1">Nota tidak ditemukan</p>
    <button
      class="font-mono text-xs text-pine underline mt-2"
      @click="router.push('/list')"
    >
      balik ke daftar
    </button>
  </div>
</template>
