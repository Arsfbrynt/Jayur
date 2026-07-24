<script setup lang="ts">
import { useRouter } from "vue-router";
import StampButton from "../components/StampButton.vue";

const router = useRouter();
</script>

<template>
  <div class="flex-1 flex flex-col justify-center gap-10 relative">
    <button
      class="absolute -top-2 right-0 w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink/60 hover:text-pine hover:border-pine transition-colors"
      aria-label="Tutorial"
      @click="router.push('/tutorial')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          stroke-width="1.6"
        />
        <path
          d="M9.5 9.2c0-1.4 1.1-2.4 2.5-2.4s2.4 1 2.4 2.2c0 1.6-2.4 1.8-2.4 3.6"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
        />
        <circle cx="12" cy="16.3" r="1" fill="currentColor" />
      </svg>
    </button>

    <div class="text-center">
      <img src="../../public/icon_jayur.png" alt="logo jayur" class="mx-auto" />

      <p class="font-mono text-xs tracking-[0.3em] text-pine/60 uppercase mb-2">
        Jayur <br />
        (Belanja Sayur)
      </p>
      <h1 class="font-display text-3xl font-bold text-ink leading-tight">
        Catat, centang,<br />
        <span class="text-pine">selesai belanja.</span>
      </h1>
      <p class="mt-3 text-sm text-ink/60 max-w-[26ch] mx-auto">
        Buat daftar belanja, centang pas udah dibeli, share kalau perlu.
      </p>
    </div>

    <div
      class="nota-card shadow-nota rounded-2xl px-6 pt-8 flex flex-col gap-3"
    >
      <StampButton
        variant="pine"
        class="w-full flex items-center gap-1 justify-center"
        @click="router.push('/input')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          width="1.5em"
          fill="#fff"
        >
          <path
            d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L308 576C285.3 544.5 272 505.8 272 464C272 363.4 349.4 280.8 448 272.7L448 234.6C448 217.6 441.3 201.3 429.3 189.3L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM464 608C543.5 608 608 543.5 608 464C608 384.5 543.5 320 464 320C384.5 320 320 384.5 320 464C320 543.5 384.5 608 464 608zM480 400L480 448L528 448C536.8 448 544 455.2 544 464C544 472.8 536.8 480 528 480L480 480L480 528C480 536.8 472.8 544 464 544C455.2 544 448 536.8 448 528L448 480L400 480C391.2 480 384 472.8 384 464C384 455.2 391.2 448 400 448L448 448L448 400C448 391.2 455.2 384 464 384C472.8 384 480 391.2 480 400z"
          />
        </svg>
        Bikin List Belanja
      </StampButton>
      <StampButton
        variant="ghost"
        class="w-full flex items-center gap-1 justify-center"
        @click="router.push('/list')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          width="1.5em"
          fill="#000"
        >
          <path
            d="M192 112L304 112L304 200C304 239.8 336.2 272 376 272L464 272L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 128C176 119.2 183.2 112 192 112zM352 131.9L444.1 224L376 224C362.7 224 352 213.3 352 200L352 131.9zM192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 250.5C512 233.5 505.3 217.2 493.3 205.2L370.7 82.7C358.7 70.7 342.5 64 325.5 64L192 64zM248 320C234.7 320 224 330.7 224 344C224 357.3 234.7 368 248 368L392 368C405.3 368 416 357.3 416 344C416 330.7 405.3 320 392 320L248 320zM248 416C234.7 416 224 426.7 224 440C224 453.3 234.7 464 248 464L392 464C405.3 464 416 453.3 416 440C416 426.7 405.3 416 392 416L248 416z"
          />
        </svg>
        Lihat List Belanja
      </StampButton>
    </div>

    <p class="text-center text-xs text-ink/40 font-mono">
      © ArsDev {{ new Date().getFullYear() }} | All Right
      <span class="line-through">Reserved</span> Okeyy...
    </p>
  </div>
</template>
