import { RichText } from '@wordpress/block-editor';

const LabelControl: React.FC<{
	text: string;
	onChange(value: string): void;
}> = ({ onChange, text }) => {
	return (
		<RichText
			className="wp-block-form-field-blocks-form__label"
			tagName="label"
			value={text}
			onChange={onChange}
		/>
	);
};

export default LabelControl;
