import {
	IUserContacts,
	TPaymentMethod,
	TUserContactsPaymentInfo,
	TUserContactsPhoneInfo,
} from '../../types';
import { IEvents } from '../base/events';

export class UserContacts implements IUserContacts {
	protected _payment: TPaymentMethod | null;
	protected _address: string;
	protected _email: string;
	protected _phone: string;

	constructor(protected events: IEvents) {
		this._payment = null;
		this._email = '';
		this._phone = '';
		this._address = '';
	}

	set payment(data: TPaymentMethod) {
		this._payment = data;
	}

	get payment() {
		return this._payment;
	}

	set address(data: string) {
		this._address = data;
	}

	get address() {
		return this._address;
	}

	set email(data: string) {
		this._email = data;
	}

	get email() {
		return this._email;
	}

	set phone(data: string) {
		this._phone = data;
	}

	get phone() {
		return this._phone;
	}

	geUserContactsPaymentInfo(): TUserContactsPaymentInfo {
		return { payment: this.payment, address: this.address };
	}

	geUserContactsPhoneInfo(): TUserContactsPhoneInfo {
		return { email: this.email, phone: this.phone };
	}

	checkPaymentInfoValidation() {
		return Object.values(this.geUserContactsPaymentInfo()).filter(
			(item) => item
		).length == 2
			? true
			: false;
	}

	checkPhoneInfoValidation() {
		return Object.values(this.geUserContactsPhoneInfo()).filter((item) => item)
			.length == 2
			? true
			: false;
	}
}
