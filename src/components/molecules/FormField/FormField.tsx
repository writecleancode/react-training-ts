import { ChangeEvent } from 'react';
import { StyledLabel } from '../../atoms/StyledLabel/StyledLabel';
import { StyledInput } from '../../atoms/StyledInput/StyledInput';
import { Wrapper } from './FormField.styles';

type FormFieldProps = {
	value: string | number;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	label: string;
	name: string;
	id: string;
	type?: string;
};

export const FormField = ({ value, onChange, label, name, id, type = 'text' }: FormFieldProps) => {
	return (
		<Wrapper>
			<StyledLabel htmlFor={name}>{label}</StyledLabel>
			<StyledInput value={value} onChange={onChange} name={name} id={id} type={type} data-testid={label} />
		</Wrapper>
	);
};
