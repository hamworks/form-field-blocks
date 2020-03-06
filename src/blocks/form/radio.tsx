import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	CheckboxControl,
} from '@wordpress/components';

type Attributes = {
	label: string;
	options: {
		option: string;
	}[];
	name: string;
	required: boolean;
};

registerBlockType<Attributes>('form-field-blocks/radio', {
	title: __('Radios', 'form-field-blocks'),
	description: __('Enter options with line breaks.', 'form-field-blocks'),
	parent: ['form-field-blocks/form'],
	category: 'layout',
	icon: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="24"
			viewBox="0 0 24 24"
			width="24"
		>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z" />
		</svg>
	),
	attributes: {
		label: {
			type: 'string',
			source: 'html',
			selector: '.wp-block-form-field-blocks-form__label',
			default: 'Radio',
		},
		required: {
			type: 'boolean',
			source: 'attribute',
			selector: 'input',
			attribute: 'required',
			default: false,
		},
		options: {
			type: 'array',
			source: 'query',
			selector: '.wp-block-form-field-blocks-form__radios label span',
			default: [],
			query: {
				option: {
					type: 'string',
					source: 'html',
				},
			},
		},
		name: {
			type: 'string',
			source: 'attribute',
			selector: 'input',
			attribute: 'name',
			default: 'radio',
		},
	},
	edit: ({
		className,
		setAttributes,
		attributes: { label, options, name, required },
	}) => {
		return (
			<div
				className={`${className} wp-block-form-field-blocks-form__row`}
			>
				<InspectorControls>
					<PanelBody title={'Input Option'}>
						<TextControl
							label="input name"
							value={name}
							onChange={(value): void =>
								setAttributes({ name: value })
							}
						/>
					</PanelBody>
					<CheckboxControl
						label="Required"
						checked={required}
						onChange={(value): void =>
							setAttributes({ required: value })
						}
					/>
				</InspectorControls>
				<label>
					<RichText
						className="wp-block-form-field-blocks-form__label"
						tagName="span"
						value={label}
						onChange={(value): void =>
							setAttributes({ label: value })
						}
					/>
					<TextareaControl
						value={options.map(({ option }) => option).join('\n')}
						onChange={(value): void => {
							const newOptions = value
								.split(/\n/)
								.map((option) => ({ option }));
							setAttributes({ options: newOptions });
						}}
					/>
				</label>
			</div>
		);
	},
	save: ({ attributes: { label, name, options, required } }) => {
		return (
			<div className="wp-block-form-field-blocks-form__row">
				<div>
					<>
						<span className="wp-block-form-field-blocks-form__label">
							{label}
						</span>
						<div className="wp-block-form-field-blocks-form__radios">
							{options
								.filter(({ option }) => option)
								.map(({ option }, index) => (
									<label key={index}>
										<input
											type="radio"
											name={name}
											required={required}
											value={option}
										/>
										<span>{option}</span>
									</label>
								))}
						</div>
					</>
				</div>
			</div>
		);
	},
});
