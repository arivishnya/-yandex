import { IPopup } from "../types";

export class Popup implements IPopup {
  protected closeButton: HTMLButtonElement;
  protected _content: HTMLElement | null;

  constructor(protected container: HTMLElement) {
    this.closeButton = container.querySelector(
      ".popup__close"
    ) as HTMLButtonElement;
    this._content = container.querySelector(".popup__content") as HTMLElement;

    this.closeButton.addEventListener("click", this.close.bind(this));
    this.container.addEventListener("click", this.close.bind(this));
    this._content.addEventListener("click", (event) => event.stopPropagation());
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  open() {
    this.container.classList.add("popup_is-opened");
  }

  close() {
    this.container.classList.remove("popup_is-opened");
    this._content = null;
  }
}
