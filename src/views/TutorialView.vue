<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const steps = [
  {
    title: "1. Bikin List",
    body: 'Dari Home, tap "Bikin List Belanja". Isi nama barang + qty, tambah baris kalau kurang, terus Simpan Menu.',
  },
  {
    title: "2. Centang Pas Belanja",
    body: 'Buka Detail Menu, tap nama barangnya buat nyoret pas udah dibeli. Progress "sudah dibeli" keupdate otomatis.',
  },
  {
    title: "3. Share ke Orang Lain",
    body: "Di halaman List atau Detail, tap Share — link kesalin otomatis. Siapa pun yang buka link itu bisa lihat & simpen list-nya sendiri.",
  },
  {
    title: "4. Export / Import File",
    body: 'Mau backup atau kirim manual (WA, email)? Export JSON dari halaman Detail. Buat import balik, tap "+ import dari file JSON" di halaman List.',
  },
  {
    title: "5. Install ke Home Screen",
    body: 'pake Chrome/Safari pilih "Install app" / "Add to Home Screen" biar bisa dipakai kayak app biasa, termasuk pas offline.',
  },
];
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
        /></svg
      >Kembali
    </button>

    <div>
      <p
        class="font-mono text-xs tracking-[0.25em] text-pine/60 uppercase mb-1"
      >
        Tutorial
      </p>
      <h1 class="font-display text-2xl font-bold text-ink">Cara Pakai Jayur</h1>
    </div>

    <div
      v-for="step in steps"
      :key="step.title"
      class="nota-card shadow-nota rounded-2xl px-5 py-4"
    >
      <p class="font-display font-semibold text-ink mb-1">{{ step.title }}</p>
      <p class="text-sm text-ink/70 leading-relaxed">{{ step.body }}</p>
    </div>
  </div>
</template>
