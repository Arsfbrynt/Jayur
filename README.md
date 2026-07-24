# Nota Belanja

PWA offline-first buat catat belanja (sayur, dkk). Nggak pakai backend —
semua data tersimpan di IndexedDB (via Dexie) di HP/browser kamu sendiri.
Share antar device pakai link ter-encode atau export/import file `.json`.

## Jalankan

```bash
npm install
npm run dev       # dev server
npm run build     # production build ke /dist (siap di-deploy statis)
npm run preview   # preview hasil build
```

Deploy `dist/` ke mana aja yang serve static files (Vercel, Netlify, Cloudflare
Pages, atau bahkan cukup taruh di server internal kantor). Karena router pakai
hash history (`/#/list/xxx`), nggak perlu config rewrite apa pun di hosting.

## Fitur

- **Home** → 2 tombol: Input Menu & Show List
- **Input Menu** (`/input`) — form CMS, append baris nama barang + qty
- **List Menu** (`/list`) — semua nota tersimpan, tiap card: Detail / Share / Hapus
- **Detail** (`/list/:id`) — tap item buat coret (checked), plus Share Link & Export JSON
- **Import** (`/import` atau `/import/:payload` dari link share) — preview dulu
  sebelum disimpan sebagai list baru

## Share: dua cara

1. **Link** — tombol Share nge-compress isi list (nama+qty doang, bukan status
   checked) jadi string di hash URL (`#/import/<encoded>`), lalu disalin ke
   clipboard. Siapa pun yang buka link itu (di device manapun) langsung lihat
   preview dan bisa simpan sebagai nota barunya sendiri. Nggak ada server —
   semua encode/decode di sisi browser.
2. **File JSON** — tombol Export di halaman Detail bikin file `.json`
   (ada field `version` biar aman kalau strukturnya berubah nanti). File ini
   bisa dikirim manual (WA, email, dst) dan di-import lewat halaman
   `/import` → "Pilih File JSON".

Catatan: ini bukan live-sync. Kalau A share ke B, terus A nyoret item lagi,
B nggak otomatis dapet update — harus share ulang. Sesuai keputusan awal:
IndexedDB only, internal use, nggak butuh backend.

## Struktur

```
src/
  db/db.ts            Dexie schema (IndexedDB)
  stores/listStore.ts Pinia store, CRUD di atas Dexie
  utils/share.ts      encode/decode link share + export/import JSON
  views/              Home, InputMenu, ListMenu, Detail, Import
  components/         StampButton.vue
```

## Desain

Tema "nota/struk warung": kartu list punya tepi sobekan perforasi
(`.nota-card` di `src/style.css`, pakai `clip-path`), dan item yang dicentang
dapet coretan tangan yang sedikit miring (`.strike-item`) — biar berasa kayak
nyoret di kertas beneran, bukan sekadar `text-decoration: line-through`.

Font: **Space Grotesk** (display/heading), **Inter** (body), **JetBrains
Mono** (qty, angka, label kecil — kesan struk/kalkulator). Palet: hijau tua
"peti sayur" (`pine`), kuning kunyit (`turmeric`) buat aksen/CTA, merah bata
(`brick`) buat hapus/warning, di atas kertas abu-hangat (`paper`).

## Icon PWA

`public/icon-192.png` dan `icon-512.png` masih placeholder simpel (biar
manifest valid & installable). Ganti dengan icon final kamu sebelum di-deploy
beneran — ukuran dan nama file tinggal disamain di `vite.config.ts`.

## TODO opsional ke depan

- Reorder item drag-and-drop di Input Menu
- Kategori/grouping barang (misal: sayur, bumbu, protein)
- Dark mode
