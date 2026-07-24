import Dexie, { type Table } from "dexie";

export interface ShopItem {
  id: string;
  nama: string;
  qty: string;
  checked: boolean;
}

export interface ShopList {
  id: string;
  judul: string;
  createdAt: number;
  items: ShopItem[];
}

class NotaDB extends Dexie {
  lists!: Table<ShopList, string>;

  constructor() {
    super("nota-belanja-db");
    this.version(1).stores({
      lists: "id, createdAt",
    });
  }
}

export const db = new NotaDB();
