import { TextControl } from '@wordpress/components';
const MultiTextControl: React.FC<{
	value: string[];
	onChange(value: string[]): void;
}> = ({ value, onChange }) => {
	const onTextChange = (input: string, index: number) => {
		const newValue = value.map((text, i) => {
			return i === index ? input : text;
		});
		onChange(newValue);
	};
	return (
		<>
			{value.map((str, index) => (
				<label key={index}>
					<TextControl
						value={str}
						onChange={(v) => onTextChange(v, index)}
					/>
				</label>
			))}
		</>
	);
};

export default MultiTextControl;
