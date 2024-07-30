import {
	cloneTemplate,
	createElement,
	ensureElement,
	formatNumber,
} from '../../utils/utils';
import { eventsName, elementSelectors } from '../../utils/constants';

import { EventEmitter } from '../base/events';
import { View } from '../base/Component';

interface IBasketView {
	items: HTMLElement[];
	total: number;
}

export class Basket extends View<IBasketView> {
	static template = ensureElement<HTMLTemplateElement>(elementSelectors.basket);

	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;

	constructor(events: EventEmitter) {
		super(events, cloneTemplate(Basket.template));

		this._list = ensureElement<HTMLElement>(
			elementSelectors.basketList,
			this.container
		);
		this._total = ensureElement<HTMLElement>(
			elementSelectors.basketPrice,
			this.container
		);
		this._button = ensureElement<HTMLElement>(
			elementSelectors.basketButton,
			this.container
		);

		if (this._button) {
			this._button.addEventListener('click', () => {
				this.events.emit(eventsName.basketSubmit);
			});
		}

		this.items = [];
	}

	get button() {
		return this._button;
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this._button.removeAttribute('disabled');
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this._button.setAttribute('disabled', 'disabled');
		}
	}

	set total(total: number) {
		if (!total) total = 0;
		this.setText(this._total, `${formatNumber(total)} синапсов`);
	}
}
