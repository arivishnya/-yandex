import { bem, ensureElement } from '../../utils/utils';
import { elementSelectors } from '../../utils/constants';

import { TCardModifier, IProductItem } from '../../types';
import { Component } from '../base/Component';

interface IProductItemActions {
	onClick: (event: MouseEvent) => void;
}

export class ProductItem extends Component<IProductItem> {
	protected container: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _description?: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _category?: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _index?: HTMLElement;

	constructor(container: HTMLElement, actions?: IProductItemActions) {
		super(container);

		this.container = container;
		this._title = ensureElement<HTMLElement>(
			elementSelectors.cardTitle,
			container
		);
		this._price = ensureElement<HTMLElement>(
			elementSelectors.cardPrice,
			container
		);

		this._category = container.querySelector(elementSelectors.cardCategory);
		this._image = container.querySelector(elementSelectors.cardImage);
		this._description = container.querySelector(
			elementSelectors.cardDescription
		);
		this._button = container.querySelector(elementSelectors.cardButton);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	toggle(modifier: TCardModifier) {
		this.toggleClass(this.container, bem('card', undefined, modifier).name);
	}

	set index(value: number) {
		this._index = ensureElement<HTMLElement>(
			`.basket__item-index`,
			this.container
		);
		this.setText(this._index, value);
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set price(value: number) {
		this.setText(this._price, value ? `${value} синапсов` : 'Бесценно');
		if (this._button) {
			this._button.disabled = !value;
		}
	}

	set category(value: string) {
		this.setText(this._category, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set button(value: string) {
		this.setText(this._button, value);
	}

	setCategoryClass(categoryClass: string) {
		this.toggleClass(this._category, categoryClass);
	}
}
