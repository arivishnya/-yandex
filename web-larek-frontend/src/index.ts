import './scss/styles.scss';

import {
	API_URL,
	CDN_URL,
	eventsName,
	elementSelectors,
} from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import {
	IProductItem,
	TUserContactsPaymentInfo,
	TPaymentMethod,
	TUserContactsPhoneInfo,
} from './types';

import { AppApi } from './components/AppApi';
import { EventEmitter } from './components/base/events';

import { Order } from './components/model/Order';
import { ProductList } from './components/model/ProductList';
import { UserContacts } from './components/model/UserContacts';

import { Page } from './components/view/Page';
import { Modal } from './components/view/common/Modal';
import { Basket } from './components/view/Basket';
import { Payments } from './components/view/Payments';
import { Contacts } from './components/view/Contacts';
import { ProductItem } from './components/view/ProductItem';
import { Success } from './components/view/common/Success';

const api = new AppApi(CDN_URL, API_URL);

const productCatalogTemplate = ensureElement<HTMLTemplateElement>(
	elementSelectors.cardCatalog
);
const productPreviewTemplate = ensureElement<HTMLTemplateElement>(
	elementSelectors.cardPreview
);
const productBasketTemplate = ensureElement<HTMLTemplateElement>(
	elementSelectors.cardBasket
);
const successTemplate = ensureElement<HTMLTemplateElement>(
	elementSelectors.success
);

const events = new EventEmitter();
const orderModel = new Order(events);
const productListModel = new ProductList(events);
const userContactsModel = new UserContacts(events);

const page = new Page(events, document.body);
const modal = new Modal(
	events,
	ensureElement<HTMLElement>(elementSelectors.modalContainer)
);
const basket = new Basket(events);
const paymentsForm = new Payments(
	events,
	cloneTemplate(ensureElement<HTMLTemplateElement>(elementSelectors.order))
);
const contactsForm = new Contacts(
	events,
	cloneTemplate(ensureElement<HTMLTemplateElement>(elementSelectors.contacts))
);

const success = new Success(cloneTemplate(successTemplate), {
	onClick: () => {
		modal.close();
	},
});

events.on(eventsName.productListChange, (items: IProductItem[]) => {
	page.catalog = items.map((item) => {
		const card = new ProductItem(cloneTemplate(productCatalogTemplate), {
			onClick: () => events.emit(eventsName.productItemSelected, item),
		});

		card.setCategoryClass(item.categoryClass)

		return card.render(item);
	});
});

events.on(eventsName.productItemSelected, (item: IProductItem) => {
	productListModel.selectedIdItem = item.id;
});

events.on(eventsName.productItemSelectedChange, (item: IProductItem | null) => {
	if (item) {
		const card = new ProductItem(cloneTemplate(productPreviewTemplate), {
			onClick: () => {
				const inOrder = orderModel.inOrder(item);
				const textButton = inOrder ? 'В корзине' : 'Удалить из корзины';

				if (inOrder) {
					orderModel.deleteItem(item.id);
				} else {
					orderModel.addItem(item);
				}

				card.button = textButton;
			},
		});

		console.log(item.categoryClass)
		card.setCategoryClass(item.categoryClass)

		modal.render({
			content: card.render(item),
		});
	} else {
		modal.close();
	}
});

events.on(eventsName.basketOpen, () => {
	modal.render({
		content: basket.render(),
	});
});

events.on(eventsName.basketChange, () => {
	page.counter = orderModel.items.length;

	basket.items = orderModel.items.map((item, index) => {
		const card = new ProductItem(cloneTemplate(productBasketTemplate), {
			onClick: () => orderModel.deleteItem(item.id),
		});

		card.toggle('compact');
		card.index = ++index;

		return card.render(item);
	});

	basket.total = orderModel.total;
	basket.setDisabled(basket.button, !orderModel.total ? true : false);
});

events.on(eventsName.basketSubmit, () => {
	modal.render({
		content: paymentsForm.render({
			payment: null,
			address: '',
			valid: false,
		}),
	});
});

events.on(eventsName.modalOpen, () => {
	page.locked = true;
});

events.on(eventsName.modalClose, () => {
	page.locked = false;
});

events.on(eventsName.orderSubmit, () => {
	modal.render({
		content: contactsForm.render({
			email: '',
			phone: '',
			valid: false,
		}),
	});
});

events.on(eventsName.contactsSubmit, () => {
	api
		.orderProducts(
			{
				total: orderModel.total,
				items: orderModel.items,
			},
			{
				payment: userContactsModel.payment,
				address: userContactsModel.address,
				email: userContactsModel.email,
				phone: userContactsModel.phone,
			}
		)
		.then((result) => {
			success.total = result.total;

			orderModel.clearOrder();
			events.emit(eventsName.basketChange);

			modal.render({
				content: success.render({}),
			});
		})
		.catch((error) => {
			console.error(error);
		});
});

events.on(
	/^order\..*:change/,
	(data: { field: keyof TUserContactsPaymentInfo; value: string }) => {
		if (data.field === 'payment') {
			if (data.value === 'cash' || data.value === 'card') {
				userContactsModel[data.field] = data.value as TPaymentMethod;
			} else {
				console.error(`Invalid payment method: ${data.value}`);
			}
		} else {
			userContactsModel[data.field] = data.value;
		}

		paymentsForm.valid = userContactsModel.checkPaymentInfoValidation();
	}
);

events.on(
	/^contacts\..*:change/,
	(data: { field: keyof TUserContactsPhoneInfo; value: string }) => {
		userContactsModel[data.field] = data.value;

		contactsForm.valid = userContactsModel.checkPhoneInfoValidation();
	}
);

api
	.getProductList()
	.then((data) => {
		productListModel.items = data;
	})
	.catch((error) => console.log(error));
