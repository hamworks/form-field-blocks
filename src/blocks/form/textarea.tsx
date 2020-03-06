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
				enableBackground="new 0 0 24 24"
				height="24"
				viewBox="0 0 24 24"
				width="24"
			>
				<g>
					<rect fill="none" height="24" width="24" />
				</g>
				<g>
					<g>
						<g>
							<path d="M2.5,4v3h5v12h3V7h5V4H2.5z M21.5,9h-9v3h3v7h3v-7h3V9z" />
						</g>
					</g>
				</g>
			</svg>
		),
		title: __('Textarea', 'form-field-blocks'),
		edit: ({
			className,
			setAttributes,
			attributes: { label, name, required },
		}) => {
			return (
				<div
					className={`${className} wp-block-form-field-blocks-form__row`}
				>
					<InspectorControls>
						<PanelBody title={'textarea option'}>
							<TextControl
								label="input name"
								value={name}
								onChange={(newName): void => {
									setAttributes({ name: newName });
								}}
							/>
							<CheckboxControl
								label="Required"
								checked={required}
								onChange={(newRequired): void => {
									setAttributes({ required: newRequired });
								}}
							/>
						</PanelBody>
					</InspectorControls>
					<label>
						<RichText
							className="wp-block-form-field-blocks-form__label"
							tagName="span"
							value={label}
							onChange={(newLabel): void =>
								setAttributes({ label: newLabel })
							}
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
