import { ensureElement } from "../utils/utils";
import {
  ITodoModel,
  IPage,
  IForm,
  IFormConstructor,
  IViewItemConstructor,
  IPopup,
} from "../types";

export class TodoPresenter {
  protected itemTemplate: HTMLTemplateElement;
  protected formTemplate: HTMLTemplateElement;
  protected todoForm: IForm;
  protected todoEditForm: IForm;
  protected handleFormSubmitEditForm: (data: { value: string }) => void;

  constructor(
    protected model: ITodoModel,
    protected viewPageConstructor: IPage,
    protected formConstructor: IFormConstructor,
    protected viewItemConstructor: IViewItemConstructor,
    protected popup: IPopup
  ) {
    this.formTemplate = ensureElement(
      "#todo-form-template"
    ) as HTMLTemplateElement;
    this.itemTemplate = ensureElement(
      "#todo-item-template"
    ) as HTMLTemplateElement;
  }

  init() {
    this.todoForm = new this.formConstructor(this.formTemplate);
    this.todoForm.buttonText = "Добавить";
    this.todoForm.placeholder = "Следующее дело";
    this.viewPageConstructor.formContainer = this.todoForm.render();

    this.todoEditForm = new this.formConstructor(this.formTemplate);
    this.todoEditForm.buttonText = "Изменить";
    this.todoEditForm.placeholder = "Новое название";

    this.model.on("changed", () => {
      this.renderView();
    });

    this.todoForm.on("submit", this.handleFormSubmitForm.bind(this));

    this.todoEditForm.on("submit", (data: { value: string }) =>
      this.handleFormSubmitEditForm.bind(data)
    );
  }

  handleFormSubmitForm(data: { value: string }) {
    this.model.addItem(data.value);
    this.todoForm.clearValue();
  }

  handleCopyItem(item: { id: string }) {
    const copyItem = this.model.getItem(item.id);
    this.model.addItem(copyItem.name);
  }

  handleDeleteItem(item: { id: string }) {
    this.model.removeItem(item.id);
  }

  handleEditItem(item: { id: string }) {
    const editedItem = this.model.getItem(item.id);
    this.todoEditForm.setValue(editedItem.name);
    this.popup.content = this.todoEditForm.render();
    this.handleFormSubmitEditForm = (data: { value: string }) => {
      this.model.editItem(item.id, data.value);
      this.todoEditForm.clearValue();
      this.popup.close();
    };
    this.popup.open();
  }

  renderView() {
    const itemList = this.model.items
      .map((item) => {
        const todoItem = new this.viewItemConstructor(this.itemTemplate);
        todoItem.on("copy", this.handleCopyItem.bind(this));
        todoItem.on("delete", this.handleDeleteItem.bind(this));
        todoItem.on("edit", this.handleEditItem.bind(this));
        const itemElement = todoItem.render(item);
        return itemElement;
      })
      .reverse();

    this.viewPageConstructor.todoContainer = itemList;
  }
}
