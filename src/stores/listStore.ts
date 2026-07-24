import { defineStore } from "pinia";
import { db, type ShopList, type ShopItem } from "../db/db";

function uid() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  // Fallback for non-secure contexts (e.g. http://192.168.x.x) where
  // crypto.randomUUID isn't exposed by the browser.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export const useListStore = defineStore("lists", {
  state: () => ({
    lists: [] as ShopList[],
    loaded: false,
  }),
  getters: {
    byId: (state) => (id: string) => state.lists.find((l) => l.id === id),
  },
  actions: {
    async loadAll() {
      const all = await db.lists.orderBy("createdAt").reverse().toArray();
      this.lists = all;
      this.loaded = true;
    },

    /** Creates a new list from raw {nama, qty} rows drafted on the Input Menu page. */
    async createList(judul: string, rows: { nama: string; qty: string }[]) {
      const list: ShopList = {
        id: uid(),
        judul: judul.trim() || "Belanja Sayur",
        createdAt: Date.now(),
        items: rows
          .filter((r) => r.nama.trim())
          .map((r) => ({
            id: uid(),
            nama: r.nama.trim(),
            qty: r.qty.trim(),
            checked: false,
          })),
      };
      await db.lists.put(list);
      this.lists.unshift(list);
      return list;
    },

    /** Imports a list coming from a share-link or an uploaded JSON file. */
    async importList(
      judul: string,
      rows: { nama: string; qty: string; checked?: boolean }[],
    ) {
      const list: ShopList = {
        id: uid(),
        judul: judul.trim() || "Belanja (import)",
        createdAt: Date.now(),
        items: rows.map((r) => ({
          id: uid(),
          nama: r.nama,
          qty: r.qty,
          checked: !!r.checked,
        })),
      };
      await db.lists.put(list);
      this.lists.unshift(list);
      return list;
    },

    async toggleItem(listId: string, itemId: string) {
      const list = this.byId(listId);
      if (!list) return;
      const item = list.items.find((i: ShopItem) => i.id === itemId);
      if (!item) return;
      item.checked = !item.checked;
      await db.lists.put(list);
    },

    async deleteList(listId: string) {
      await db.lists.delete(listId);
      this.lists = this.lists.filter((l) => l.id !== listId);
    },
  },
});
