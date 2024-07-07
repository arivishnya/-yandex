import { ensureElement } from "../utils/utils";
import { IItem, IViewItem } from "../types";
import { EventEmitter } from "./base/EventEmitter";

export class Item extends EventEmitter implements IViewItem {
  protected itemElement: HTMLElement;
  protected title: HTMLElement;
  protected _id: string;
  protected copyButton: HTMLButtonElement;
  protected deleteButton: HTMLButtonElement;
  protected editButton: HTMLButtonElement;

  constructor(templateElement: HTMLTemplateElement) {
    super();
    this.itemElement = templateElement.content
      .querySelector(".todo-item")
      .cloneNode(true) as HTMLElement;
    this.title = ensureElement(".todo-item__text", this.itemElement);
    this.copyButton = ensureElement(
      ".todo-item__copy",
      this.itemElement
    ) as HTMLButtonElement;
    this.deleteButton = ensureElement(
      ".todo-item__del",
      this.itemElement
    ) as HTMLButtonElement;
    this.editButton = ensureElement(
      ".todo-item__edit",
      this.itemElement
    ) as HTMLButtonElement;

    this.copyButton.addEventListener("click", () =>
      this.emit("copy", { id: this._id })
    );
    this.deleteButton.addEventListener("click", () =>
      this.emit("delete", { id: this._id })
    );
    this.editButton.addEventListener("click", () =>
      this.emit("edit", { id: this._id })
    );
  }

  set id(value: string) {
    this._id = value;
  }

  get id(): string {
    return this._id || "";
  }

  set name(value: string) {
    this.title.textContent = value;
  }

  get name(): string {
    return this.title.textContent;
  }

  render(item: IItem) {
    this.name = item.name;
    this.id = item.id;
    return this.itemElement;
  }
}
