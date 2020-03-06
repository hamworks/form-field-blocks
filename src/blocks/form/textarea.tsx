import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { CheckboxControl, PanelBody, TextControl } from '@wordpress/components';
import AttributeControls from './components/attribute-controls';

type Attributes = {
	label: string;
	name: string;
	required: boolean;
};

registerBlockType<Attributes>('form-field-blocks/textarea', {
	attributes: {
		label: {
			type: 'string',
			source: 'html',
			selector: 'label span',
			default: 'Message',
		},
		required: {
			type: 'boolean',
			source: 'attribute',
			selector: 'textarea',
			attribute: 'required',
			default: false,
		},
		name: {
			type: 'string',
			source: 'attribute',
			selector: 'textarea',
			attribute: 'name',
			default: 'message',
		},
	},
	parent: ['form-field-blocks/form'],
	category: 'layout',
	icon: () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			enableBackground="new 0 0 24 24"
			height="24"
			viewBox="0 0 24 24"
			width="24"
		>
			<rect fill="none" height="24" width="24" />
			<path d="M2.5,4v3h5v12h3V7h5V4H2.5z M21.5,9h-9v3h3v7h3v-7h3V9z" />
		</svg>
	),
	title: __('Textarea', 'form-field-blocks'),
	edit: ({
		className,
		setAttributes,
		attributes: { label, name, required },
	}) => (
		<div className={`${className} wp-block-form-field-blocks-form__row`}>
			<InspectorControls>
				<PanelBody title={__('Input option', 'form-field-blocks')}>
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
				onChange={(newLabel): void =>
					setAttributes({ label: newLabel })
				}
			/>
			<textarea name={name} disabled={true} />
		</div>
	),
	save: ({ attributes: { label, name, required } }) => (
		<div className="wp-block-form-field-blocks-form__row">
			<label>
				<span className="wp-block-form-field-blocks-form__label">
					{label}
				</span>
				<textarea name={name} required={required} />
			</label>
		</div>
	),
});
