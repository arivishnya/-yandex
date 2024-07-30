// API_URL - используется для запросов данных о товарах и отправки заказа
export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;

// CDN_URL - используется для формирования адреса картинки в товаре.
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const eventsName = {
	productListChange: 'productList:change',
	productItemSelected: 'productItem:selected',
	productItemSelectedChange: 'productItem-selected:change',
	basketOpen: 'basket:open',
	basketChange: 'basket:change',
	basketSubmit: 'basket:submit',
	modalOpen: 'modal:open',
	modalClose: 'modal:close',
	orderSubmit: 'order:submit',
	contactsSubmit: 'contacts:submit',
};

export const elementSelectors = {
	cardCatalog: '#card-catalog',
	cardPreview: '#card-preview',
	cardBasket: '#card-basket',
	success: '#success',
	modalContainer: '#modal-container',
	order: '#order',
	contacts: '#contacts',
	modalClose: '.modal__close',
	modalContent: '.modal__content',
	orderSuccessDescription: '.order-success__description',
	orderSuccessClose: '.order-success__close',
	basket: '#basket',
	basketList: '.basket__list',
	basketPrice: '.basket__price',
	basketButton: '.basket__button',
	buttonCard: '.button_alt[name=card]',
	buttonCash: '.button_alt[name=cash]',
	headerBasketCounter: '.header__basket-counter',
	gallery: '.gallery',
	pageWrapper: '.page__wrapper',
	headerBasket: '.header__basket',
	cardPrice: '.card__price',
	cardTitle: '.card__title',
	cardCategory: '.card__category',
	cardImage: '.card__image',
	cardDescription: '.card__description',
	cardButton: '.card__button',
};
