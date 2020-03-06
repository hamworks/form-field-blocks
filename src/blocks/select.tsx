import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody, TextareaControl } from '@wordpress/components';
import AttributeControls from '../components/attribute-controls';
import LabelControl from '../components/label-control';

type Attributes = {
	label: string;
	options: {
		option: string;
	}[];
	name: string;
	required: boolean;
};

registerBlockType<Attributes>('form-field-blocks/select', {
	title: __('Select', 'form-field-blocks'),
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
			<path d="M3 17h18v2H3zm16-5v1H5v-1h14m2-2H3v5h18v-5zM3 6h18v2H3z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</svg>
	),
	attributes: {
		label: {
			type: 'string',
			source: 'html',
			selector: '.wp-block-form-field-blocks-form__label',
			default: 'Select',
		},
		required: {
			type: 'boolean',
			source: 'attribute',
			selector: 'select',
			attribute: 'required',
			default: false,
		},
		options: {
			type: 'array',
			source: 'query',
			selector: 'option',
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
			default: 'text',
		},
	},
	edit: ({
		className,
		setAttributes,
		attributes: { label, options, name, required },
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
			<LabelControl
				text={label}
				onChange={(newLabel): void =>
					setAttributes({ label: newLabel })
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
		</div>
	),
	save: ({ attributes: { label, name, options, required } }) => (
		<div className="wp-block-form-field-blocks-form__row">
			<label>
				<span className="wp-block-form-field-blocks-form__label">
					{label}
				</span>
				<select name={name} required={required}>
					{options
						.filter(({ option }) => option)
						.map(({ option }, index) => (
							<option key={index}>{option}</option>
						))}
				</select>
			</label>
		</div>
	),
});
