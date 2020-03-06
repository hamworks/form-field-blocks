// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { registerBlockCollection } from '@wordpress/blocks';

if (registerBlockCollection) {
	registerBlockCollection('form-field-blocks', {
		title: 'form-field-blocks',
		icon: () => (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24"
				viewBox="0 0 24 24"
				width="24"
			>
				<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
				<path d="M0 0h24v24H0z" fill="none" />
			</svg>
		),
	});
}

import './form';
import './input';
import './textarea';
import './select';
import './radio';
