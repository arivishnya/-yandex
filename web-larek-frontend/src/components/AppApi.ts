import { IProductItem, TOrder, TContacts, IOrderResult } from '../types';

import { Api, ApiListResponse } from './base/api';

export interface IWebLarekAPI {
	getProductList: () => Promise<IProductItem[]>;
	getProductItem: (id: string) => Promise<IProductItem>;
	orderProducts: (order: TOrder, contacts: TContacts) => Promise<IOrderResult>;
}

export class AppApi extends Api implements IWebLarekAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductList(): Promise<IProductItem[]> {
		return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
				categoryClass:
					item.category === 'софт-скил'
						? 'card__category_soft'
						: item.category === 'другое'
						? 'card__category_other'
						: item.category === 'дополнительное'
						? 'card__category_additional'
						: item.category === 'кнопка'
						? 'card__category_button'
						: item.category === 'хард-скил'
						? 'card__category_hard'
						: '',
			}))
		);
	}

	getProductItem(id: string): Promise<IProductItem> {
		return this.get(`/product/${id}`).then((data: IProductItem) => ({
			...data,
			image: this.cdn + data.image,
		}));
	}

	orderProducts(order: TOrder, contacts: TContacts): Promise<IOrderResult> {
		return this.post('/order', {
			...order,
			...contacts,
			phone: contacts.phone.replace(/\s+/g, ''),
			items: order.items.filter((item) => item.id).map((item) => item.id),
		}).then((data: IOrderResult) => data);
	}
}
