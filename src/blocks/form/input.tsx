import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl,SelectControl, CheckboxControl } from '@wordpress/components';

registerBlockType<{ label: string, type: string, required: boolean, name: string }>( 'form-field-blocks/input', {
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
		}
	},
	parent: [ 'form-field-blocks/form' ],
	category: 'layout',
	icon: () => <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
		<path d="M0 0h24v24H0z" fill="none" />
		<path
			d="M21 3.01H3c-1.1 0-2 .9-2 2V9h2V4.99h18v14.03H3V15H1v4.01c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98v-14c0-1.11-.9-2-2-2zM11 16l4-4-4-4v3H1v2h10v3z" />
	</svg>,
	title: __( 'Input', 'form-field-blocks' ),
	edit: ( { className, setAttributes, attributes: { label, type, name, required } } ) => {
		return (
			<div className="wp-block-form-field-blocks-form__row">
				<InspectorControls>
					<PanelBody title={ 'Input Option' }>
						<SelectControl
							label="input type"
							value={ type }
							options={ [
								{ label: 'text', value: 'text' },
								{ label: 'email', value: 'email' },
								{ label: 'date', value: 'date' },
								{ label: 'datetime-local', value: 'datetime-local' },
							] }
							onChange={ ( type ) => setAttributes( { type } ) } />
						<TextControl
							label="input name"
							value={ name }
							onChange={ ( name ) => setAttributes( { name } ) } />
						<CheckboxControl
							label="Required"
							checked={ required }
							onChange={ ( required ) => setAttributes( { required } ) } />
					</PanelBody>
				</InspectorControls>
				<label>
					<RichText
						className="wp-block-form-field-blocks-form__label"
						tagName="span"
						value={ label }
						onChange={ ( label ) => setAttributes( { label } ) } />
					<input type={ type } name={ name } disabled={ true } />
				</label>
			</div>

		);
	},
	save: ( { attributes: { label, type, name, required } } ) => {
		return (
			<div className="wp-block-form-field-blocks-form__row">
				<label>
					{
						required ?
							<>
								<span className="wp-block-form-field-blocks-form__label">{ label }</span>
								<input type={ type } name={ name } required />
							</> :
							<>
								<span className="wp-block-form-field-blocks-form__label">{ label }</span>
								<input type={ type } name={ name } />
							</>
					}
				</label>


			</div>
		);
	}

} );
