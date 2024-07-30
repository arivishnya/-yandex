import { eventsName } from '../../utils/constants';

import { IProductList, IProductItem } from '../../types';
import { IEvents } from '../base/events';

export class ProductList implements IProductList {
	protected _items: IProductItem[];
	protected _selectedIdItem: string | null;

	constructor(protected events: IEvents) {}

	set items(data: IProductItem[]) {
		this._items = data;
		this.events.emit(eventsName.productListChange, this._items);
	}

	get items() {
		return this._items;
	}

	set selectedIdItem(itemId: string | null) {
		if (!itemId) {
			this._selectedIdItem = null;
			this.events.emit(eventsName.productItemSelectedChange);
			return;
		}

		const selectedItem = this.getItem(itemId);
		if (selectedItem) {
			this._selectedIdItem = itemId;
			this.events.emit(eventsName.productItemSelectedChange, selectedItem);
		}
	}

	get selectedIdItem() {
		return this._selectedIdItem;
	}

	getItem(itemId: string) {
		return this._items.find((item) => item.id === itemId);
	}
}
