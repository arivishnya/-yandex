import { eventsName } from '../../utils/constants';

import { TProductItemOrder, IProductItem, IOrder } from '../../types';
import { IEvents } from '../base/events';

export class Order implements IOrder {
	protected _items: TProductItemOrder[];
	protected _total: number | null;

	constructor(protected events: IEvents) {
		this._items = [];
		this._total = null;
	}

	set items(data: TProductItemOrder[]) {
		this._items = data;
	}

	get items() {
		return this._items;
	}

	get total() {
		return this._total;
	}

	addItem(newItem: TProductItemOrder) {
		this._items.push(newItem);
		this._total += newItem.price;
		this.events.emit(eventsName.basketChange);
	}

	deleteItem(itemId: string, payload?: Function | null) {
		this._items = this._items.filter((item) => item.id !== itemId);
		this.calculateTotal();

		if (payload) {
			payload();
		} else {
			this.events.emit(eventsName.basketChange);
		}
	}

	inOrder(item: IProductItem) {
		return this._items.some((orderItem) => orderItem.id === item.id);
	}

	calculateTotal() {
		this._total = this._items.reduce(
			(accumulator, currentValue) => accumulator + currentValue.price,
			0
		);
	}

	clearOrder() {
		this._items = [];
		this._total = null;
		this.events.emit(eventsName.basketChange);
	}
}
