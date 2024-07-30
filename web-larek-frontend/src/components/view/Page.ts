import { ensureElement } from '../../utils/utils';
import { eventsName, elementSelectors } from '../../utils/constants';
import { View } from '../base/Component';
import { IEvents } from '../base/events';

interface IPage {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

export class Page extends View<IPage> {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(events: IEvents, container: HTMLElement) {
		super(events, container);

		this._counter = ensureElement<HTMLElement>(
			elementSelectors.headerBasketCounter
		);
		this._catalog = ensureElement<HTMLElement>(elementSelectors.gallery);
		this._wrapper = ensureElement<HTMLElement>(elementSelectors.pageWrapper);
		this._basket = ensureElement<HTMLElement>(elementSelectors.headerBasket);

		this._basket.addEventListener('click', () => {
			this.events.emit(eventsName.basketOpen);
		});
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
