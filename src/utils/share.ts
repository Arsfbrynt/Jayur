import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import type { ShopList } from '../db/db'

/**
 * Encodes a list into a compact, URL-safe string (used as the #hash of a
 * share link). Compressed client-side, no server round-trip needed --
 * whoever opens the link decodes it straight back into a ShopList.
 */
export function encodeListForShare(list: ShopList): string {
  const payload = {
    judul: list.judul,
    items: list.items.map((i) => ({ nama: i.nama, qty: i.qty }))
  }
  return compressToEncodedURIComponent(JSON.stringify(payload))
}

export function decodeSharedList(encoded: string): { judul: string; items: { nama: string; qty: string }[] } | null {
  try {
    const json = decompressFromEncodedURIComponent(encoded)
    if (!json) return null
    const parsed = JSON.parse(json)
    if (!parsed || !Array.isArray(parsed.items)) return null
    return parsed
  } catch {
    return null
  }
}

export function buildShareLink(list: ShopList): string {
  const encoded = encodeListForShare(list)
  return `${window.location.origin}${import.meta.env.BASE_URL}#/import/${encoded}`
}

/** Downloads a list as a versioned .json file, for backup or manual sharing. */
export function exportListAsFile(list: ShopList) {
  const payload = {
    version: 1,
    judul: list.judul,
    exportedAt: new Date().toISOString(),
    items: list.items.map((i) => ({ nama: i.nama, qty: i.qty, checked: i.checked }))
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const safeName = list.judul.trim().replace(/\s+/g, '-').toLowerCase() || 'nota-belanja'
  a.href = url
  a.download = `${safeName}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export interface ImportedFile {
  judul: string
  items: { nama: string; qty: string; checked?: boolean }[]
}

/** Parses a user-selected .json file back into importable list data. */
export function parseImportedFile(text: string): ImportedFile | null {
  try {
    const parsed = JSON.parse(text)
    if (!parsed || !Array.isArray(parsed.items)) return null
    return {
      judul: parsed.judul ?? 'Belanja (import)',
      items: parsed.items
    }
  } catch {
    return null
  }
}
