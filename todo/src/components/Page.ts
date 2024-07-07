import { ensureElement } from "../utils/utils";
import { IPage } from "../types";

export class Page implements IPage {
  _formContainer: HTMLElement;
  _todoContainer: HTMLElement;

  constructor(protected container: HTMLElement) {
    this._formContainer = ensureElement(".todo-form-container", this.container);
    this._todoContainer = ensureElement(
      ".todos__list",
      this.container
    ) as HTMLElement;
  }

  set todoContainer(items: HTMLElement[]) {
    this._todoContainer.replaceChildren(...items);
  }

  set formContainer(formElement: HTMLElement | null) {
    if (formElement) {
      this._formContainer.replaceChildren(formElement);
    } else {
      this._formContainer.innerHTML = "";
    }
  }
}
