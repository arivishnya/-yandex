import { ensureElement } from "../utils/utils";
import { IForm } from "../types";
import { EventEmitter } from "./base/EventEmitter";

export class Form extends EventEmitter implements IForm {
  protected formElement: HTMLFormElement;
  protected inputField: HTMLInputElement;
  protected submitButton: HTMLButtonElement;
  buttonText: string;
  placeholder: string;

  constructor(formTemplate: HTMLTemplateElement) {
    super();
    this.formElement = formTemplate.content
      .querySelector(".todos__form")
      .cloneNode(true) as HTMLFormElement;
    this.inputField = ensureElement(
      ".todo-form__input",
      this.formElement
    ) as HTMLInputElement;
    this.submitButton = ensureElement(
      ".todo-form__submit-btn",
      this.formElement
    ) as HTMLButtonElement;
    this.buttonText = "";
    this.placeholder = "";
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.emit("submit", { value: this.inputField.value });
    });
  }

  render() {
    return this.formElement;
  }

  setValue(data: string) {
    this.inputField.value = data;
  }

  getValue() {
    return this.inputField.value;
  }

  clearValue() {
    this.formElement.reset();
  }
}
