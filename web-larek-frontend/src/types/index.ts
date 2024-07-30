export type TCardModifier = 'compact' | 'full';

export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	categoryClass?: string;

	setCategoryClass: (categoryClass: string) => void;
}

export interface IProductList {
	items: IProductItem[];
	selectedIdItem: string | null; // хранит айдишник товара, который показываем

	getItem: (itemId: string) => IProductItem;
}

export type TPaymentMethod = 'cash' | 'card';

export type TUserContactsPaymentInfo = Pick<
	IUserContacts,
	'address' | 'payment'
>;
export type TUserContactsPhoneInfo = Pick<IUserContacts, 'email' | 'phone'>;

export type TContacts = TUserContactsPaymentInfo & TUserContactsPhoneInfo;

export interface IUserContacts {
	payment: TPaymentMethod;
	address: string;
	email: string;
	phone: string;

	geUserContactsPaymentInfo: (itemId: string) => TUserContactsPaymentInfo;
	geUserContactsPhoneInfo: (itemId: string) => TUserContactsPhoneInfo;
	checkPaymentInfoValidation: () => boolean;
	checkPhoneInfoValidation: () => boolean;
}

export type TProductItemOrder = Pick<IProductItem, 'id' | 'title' | 'price'>;

export type TOrder = Pick<IOrder, 'total' | 'items'>;

export interface IOrder {
	total: number | null;
	items: TProductItemOrder[];

	addItem: (newItem: TProductItemOrder) => void;
	deleteItem: (itemId: string, payload: Function | null) => void;
	inOrder: (item: IProductItem) => boolean;
	clearOrder: () => void;
	calculateTotal: () => void;
}

export interface IOrderResult {
	id: string;
	total: number;
}
