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
			<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
			<path d="M0 0h24v24H0z" fill="none" />
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
