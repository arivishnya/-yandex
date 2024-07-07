import { IEvents } from "../components/base/EventEmitter";

export interface IItem {
  id: string;
  name: string;
}

export interface ITodoModel extends IEvents {
  items: IItem[];
  addItem: (name: string) => IItem;
  removeItem: (id: string) => void;
  getItem: (id: string) => IItem;
  editItem: (id: string, name: string) => void;
}

export interface IPage {
  formContainer: HTMLElement | null;
  todoContainer: HTMLElement[];
}

export interface IForm extends IEvents {
  buttonText: string;
  placeholder: string;
  render(): HTMLFormElement;
  setValue(data: string): void;
  getValue(): string;
  clearValue(): void;
}

export interface IFormConstructor {
  new (formTemplate: HTMLTemplateElement): IForm;
}

export interface IViewItem extends IEvents {
  id: string;
  name: string;
  render(item: IItem): HTMLElement;
}

export interface IViewItemConstructor {
  new (template: HTMLTemplateElement): IViewItem;
}

export interface IPopup {
  content: HTMLElement;
  open(): void;
  close(): void;
}
