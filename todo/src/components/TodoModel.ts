import { IItem, ITodoModel } from "../types";
import { EventEmitter } from "./base/EventEmitter";

export class TodoModel extends EventEmitter implements ITodoModel {
  protected _items: IItem[];

  constructor() {
    super();
    this._items = [];
  }

  set items(data: IItem[]) {
    this._items = data;
    this.emit("changed");
  }

  get items() {
    return this._items;
  }

  getItem(id: string) {
    return this.items.find((item) => item.id === id);
  }

  addItem(name: string) {
    const uniqueId: number =
      Math.max(...this._items.map((_item) => Number(_item.id))) + 1;
    const newItem = { id: String(uniqueId), name };
    this._items.push(newItem);
    this.emit("changed");
    return newItem;
  }

  removeItem(id: string) {
    this._items = this._items.filter((_item) => _item.id !== id);
    this.emit("changed");
  }

  editItem(id: string, name: string) {
    const editedItem = this.getItem(id);
    editedItem.name = name;
    this.emit("changed");
  }
}
