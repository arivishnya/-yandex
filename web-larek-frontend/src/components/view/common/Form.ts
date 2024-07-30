import { View } from '../../base/Component';
import { IEvents } from '../../base/events';
import { ensureElement } from '../../../utils/utils';

interface IFormState {
	valid: boolean;
}

export class Form<T> extends View<IFormState> {
	protected _submit: HTMLButtonElement;

	constructor(protected events: IEvents, protected container: HTMLFormElement) {
		super(events, container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);

		this.container.addEventListener('input', (event: Event) => {
			const target = event.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (event: Event) => {
			event.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	render(state: Partial<T> & IFormState) {
		const { valid, ...inputs } = state;
		super.render({ valid });
		Object.assign(this, inputs);
		return this.container;
	}
}
