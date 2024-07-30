import { ensureElement } from '../../utils/utils';
import { elementSelectors } from '../../utils/constants';

import { TUserContactsPaymentInfo, TPaymentMethod } from '../../types';
import { EventEmitter } from '../base/events';
import { Form } from './common/Form';

export class Payments extends Form<TUserContactsPaymentInfo> {
	protected _paymentCard: HTMLButtonElement;
	protected _paymentCash: HTMLButtonElement;

	constructor(events: EventEmitter, container: HTMLFormElement) {
		super(events, container);

		this._paymentCard = ensureElement<HTMLButtonElement>(
			elementSelectors.buttonCard,
			this.container
		);
		this._paymentCash = ensureElement<HTMLButtonElement>(
			elementSelectors.buttonCash,
			this.container
		);

		this._paymentCard.addEventListener('click', () => {
			this.payment = 'card';
			this.onInputChange('payment', 'card');
		});

		this._paymentCash.addEventListener('click', () => {
			this.payment = 'cash';
			this.onInputChange('payment', 'cash');
		});
	}

	set payment(value: TPaymentMethod) {
		this._paymentCard.classList.toggle('button_alt-active', value === 'card');
		this._paymentCash.classList.toggle('button_alt-active', value === 'cash');
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}
