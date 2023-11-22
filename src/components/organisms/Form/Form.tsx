import { FormEvent, useContext } from 'react';
import { CarsContext } from '../../../providers/CarsProvider';
import { FormField } from '../../molecules/FormField/FormField';
import { StyledButton } from '../../atoms/StyledButton/StyledButton';
import { Wrapper } from './Form.styles';

export const Form = () => {
	const { formValues, handleInputChange, handleAddCar } = useContext(CarsContext);

	const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleAddCar();
	};

	return (
		<Wrapper onSubmit={handleSubmitForm}>
			<FormField label='Brand' name='brand' id='brand' value={formValues.brand} onChange={handleInputChange} />
			<FormField label='Model' name='model' id='model' value={formValues.model} onChange={handleInputChange} />
			<FormField label='Generation' name='generation' id='generation' value={formValues.generation} onChange={handleInputChange} />
			<FormField label='Start of production (year)' name='productionStartYear' id='productionStartYear' value={formValues.productionStartYear} onChange={handleInputChange} type='number'
			/>
			<FormField label='End of production (year)' name='productionEndYear' id='productionEndYear' value={formValues.productionEndYear} onChange={handleInputChange} type='number'
			/>
			<FormField label='Year of facelift' name='facelift' id='facelift' value={formValues.facelift} onChange={handleInputChange} />
			<FormField label='Photo url' name='imgUrl' id='imgUrl' value={formValues.imgUrl} onChange={handleInputChange} />
			<StyledButton type='submit'>Add car</StyledButton>
		</Wrapper>
	);
};
