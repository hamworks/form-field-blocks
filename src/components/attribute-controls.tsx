import { CheckboxControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const AttributeControls: React.FC<{
	name: string;
	required: boolean;
	onNameChange(value: string): void;
	onRequiredChange(value: boolean): void;
}> = ({ onNameChange, onRequiredChange, name, required }) => {
	return (
		<>
			<TextControl
				label={__('Name attribute', 'form-field-blocks')}
				value={name}
				onChange={onNameChange}
			/>
			<CheckboxControl
				label={__('required attribute', 'form-field-blocks')}
				checked={required}
				onChange={onRequiredChange}
			/>
		</>
	);
};

export default AttributeControls;
