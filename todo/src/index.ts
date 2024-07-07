import "./styles/styles.css";
import { todos } from "./utils/constants";
import { ensureElement } from "./utils/utils";
import { TodoModel } from "./components/TodoModel";
import { Page } from "./components/Page";
import { Form } from "./components/Form";
import { Popup } from "./components/Popup";
import { Item } from "./components/Item";
import { TodoPresenter } from "./components/TodoPresenter";

const contentElement = ensureElement(".content");
const page = new Page(contentElement);

const todoArray = new TodoModel();
todoArray.items = todos;

const popupElement = ensureElement(".popup");
const popup = new Popup(popupElement);

const todoPresenter = new TodoPresenter(todoArray, page, Form, Item, popup);
todoPresenter.init();
todoPresenter.renderView();
