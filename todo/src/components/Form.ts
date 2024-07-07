import { ensureElement } from "../utils/utils";
import { IForm } from "../types";
import { EventEmitter } from "./base/EventEmitter";

export class Form extends EventEmitter implements IForm {
  protected formElement: HTMLFormElement;
  protected inputField: HTMLInputElement;
  protected submitButton: HTMLButtonElement;

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

    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.emit("form:submit", { value: this.inputField.value });
    });
  }

  set buttonText(data: string) {
		this.submitButton.textContent = data;
	}

	set placeholder(data: string) {
		this.inputField.placeholder = data;
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
