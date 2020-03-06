import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	TextControl,
	SelectControl,
	CheckboxControl,
} from '@wordpress/components';
import AttributeControls from './components/attribute-controls';

type Attributes = {
	label: string;
	type: string;
	required: boolean;
	name: string;
};

registerBlockType<Attributes>('form-field-blocks/input', {
	attributes: {
		label: {
			type: 'string',
			source: 'html',
			selector: '.wp-block-form-field-blocks-form__label',
			default: 'label',
		},
		required: {
			type: 'boolean',
			source: 'attribute',
			selector: 'input',
			attribute: 'required',
			default: false,
		},
		type: {
			type: 'string',
			source: 'attribute',
			selector: 'input',
			attribute: 'type',
			default: 'text',
		},
		name: {
			type: 'string',
			source: 'attribute',
			selector: 'input',
			attribute: 'name',
			default: 'text',
		},
	},
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
	title: __('Input', 'form-field-blocks'),
	edit: ({
		className,
		setAttributes,
		attributes: { label, type, name, required },
	}) => (
		<div className={`${className} wp-block-form-field-blocks-form__row`}>
			<InspectorControls>
				<PanelBody title={__('Input option', 'form-field-blocks')}>
					<SelectControl
						label="input type"
						value={type}
						options={[
							{ label: 'text', value: 'text' },
							{ label: 'email', value: 'email' },
							{ label: 'date', value: 'date' },
							{
								label: 'datetime-local',
								value: 'datetime-local',
							},
						]}
						onChange={(newType): void =>
							setAttributes({ type: newType })
						}
					/>
					<AttributeControls
						name={name}
						required={required}
						onNameChange={(newName): void =>
							setAttributes({ name: newName })
						}
						onRequiredChange={(newRequired): void =>
							setAttributes({ required: newRequired })
						}
					/>
				</PanelBody>
			</InspectorControls>
			<RichText
				className="wp-block-form-field-blocks-form__label"
				tagName="span"
				value={label}
				onChange={(value): void => setAttributes({ label: value })}
			/>
			<input type={type} name={name} disabled={true} />
		</div>
	),
	save: ({ attributes: { label, type, name, required } }) => (
		<div className="wp-block-form-field-blocks-form__row">
			<label>
				<span className="wp-block-form-field-blocks-form__label">
					{label}
				</span>
				<input type={type} name={name} required={required} />
			</label>
		</div>
	),
});
