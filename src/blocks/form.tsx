import { registerBlockType } from '@wordpress/blocks';
import {
	InnerBlocks,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

type Attributes = {
	action: string;
	submit: string;
};

registerBlockType<Attributes>('form-field-blocks/form', {
	attributes: {
		action: {
			type: 'string',
			source: 'attribute',
			selector: 'form',
			attribute: 'action',
		},
		submit: {
			type: 'string',
			source: 'text',
			selector: '[type="submit"]',
			default: 'Send',
		},
	},
	category: 'layout',
	icon: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24"
			viewBox="0 0 24 24"
			width="24"
		>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
		</svg>
	),
	title: __('Form', 'form-field-blocks'),
	edit: ({ className, setAttributes, attributes: { action, submit } }) => (
		<>
			<InspectorControls>
				<PanelBody title={__('Form Option', 'form-field-blocks')}>
					<TextControl
						label={__('Form Action URL', 'form-field-blocks')}
						value={action}
						onChange={(newAction): void => {
							setAttributes({ action: newAction });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div className={`${className}`}>
				<div>
					<InnerBlocks />
					<div className="wp-block-button">
						<RichText
							disabled={true}
							className="wp-block-button__link"
							tagName={'button'}
							value={submit}
							onChange={(newSubmit): void => {
								setAttributes({ submit: newSubmit });
							}}
						/>
					</div>
				</div>
			</div>
		</>
	),
	save: ({ attributes: { action, submit } }) => (
		<form action={action} method="POST">
			<InnerBlocks.Content />
			<div className="wp-block-button">
				<button className="wp-block-button__link" type="submit">
					{submit}
				</button>
			</div>
		</form>
	),
});
