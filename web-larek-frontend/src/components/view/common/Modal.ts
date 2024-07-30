import { ensureElement } from '../../../utils/utils';
import { eventsName, elementSelectors } from '../../../utils/constants';

import { View } from '../../base/Component';
import { IEvents } from '../../base/events';

interface IModalData {
	content: HTMLElement;
}

export class Modal extends View<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(protected events: IEvents, container: HTMLElement) {
		super(events, container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			elementSelectors.modalClose,
			container
		);
		this._content = ensureElement<HTMLElement>(
			elementSelectors.modalContent,
			container
		);

		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());

		this.handleEscUp = this.handleEscUp.bind(this);
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.container.classList.add('modal_active');
		document.addEventListener('keyup', this.handleEscUp);
		this.events.emit(eventsName.modalOpen);
	}

	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		document.removeEventListener('keyup', this.handleEscUp);
		this.events.emit(eventsName.modalClose);
	}

	handleEscUp(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			this.close();
		}
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
