import { TUserContactsPhoneInfo } from '../../types';
import { Form } from './common/Form';

export class Contacts extends Form<TUserContactsPhoneInfo> {
	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}
}
