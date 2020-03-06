import { RichText } from '@wordpress/block-editor';

const LabelControl: React.FC<{
	text: string;
	onChange(value: string): void;
}> = ({ onChange, text }) => {
	return (
		<label>
			<RichText
				className="wp-block-form-field-blocks-form__label"
				value={text}
				onChange={onChange}
			/>
		</label>

	);
};

export default LabelControl;
