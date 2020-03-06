import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { CheckboxControl, PanelBody, TextControl } from '@wordpress/components';

registerBlockType<{ label: string; name: string; required: boolean }>(
	'form-field-blocks/textarea',
	{
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
				height="24"
				viewBox="0 0 24 24"
				width="24"
			>
				<path d="M0 0h24v24H0z" fill="none" />
				<path d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z" />
			</svg>
		),
		title: __('Textarea', 'form-field-blocks'),
		edit: ({
			className,
			setAttributes,
			attributes: { label, name, required },
		}) => {
			return (
				<div className="wp-block-form-field-blocks-form__row">
					<InspectorControls>
						<PanelBody title={'textarea option'}>
							<TextControl
								label="input name"
								value={name}
								onChange={(name) => setAttributes({ name })}
							/>
							<CheckboxControl
								label="Required"
								checked={required}
								onChange={(required) =>
									setAttributes({ required })
								}
							/>
						</PanelBody>
					</InspectorControls>
					<label>
						<RichText
							className="wp-block-form-field-blocks-form__label"
							tagName="span"
							value={label}
							onChange={(label) => setAttributes({ label })}
						/>
						<textarea name={name} disabled={true} />
					</label>
				</div>
			);
		},
		save: ({ attributes: { label, name, required } }) => {
			return (
				<div className="wp-block-form-field-blocks-form__row">
					<label>
						<span className="wp-block-form-field-blocks-form__label">
							{label}
						</span>
						{required ? (
							<textarea name={name} required />
						) : (
							<textarea name={name} />
						)}
					</label>
				</div>
			);
		},
	}
);
