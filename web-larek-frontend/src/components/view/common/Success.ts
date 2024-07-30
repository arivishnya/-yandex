import { ensureElement } from '../../../utils/utils';
import { elementSelectors } from '../../../utils/constants';

import { Component } from '../../base/Component';

interface ISuccess {
	total: number;
}

interface ISuccessActions {
	onClick: () => void;
}

export class Success extends Component<ISuccess> {
	protected _total: HTMLElement;
	protected _close: HTMLElement;

	constructor(protected container: HTMLElement, actions: ISuccessActions) {
		super(container);

		this._total = ensureElement<HTMLElement>(
			elementSelectors.orderSuccessDescription,
			this.container
		);
		this._close = ensureElement<HTMLElement>(
			elementSelectors.orderSuccessClose,
			this.container
		);

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	set total(value: number) {
		this.setText(this._total, `Списано  ${value} синапсов`);
	}
}
