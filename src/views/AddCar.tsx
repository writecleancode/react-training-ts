import { useContext } from 'react';
import { CarsContext } from 'src/providers/CarsProvider';
import { Form } from 'src/components/organisms/Form/Form';
import { CarCard } from 'src/components/molecules/CarCard/CarCard';
import { PreviewTitle, PreviewWrapper, Wrapper } from './AddCar.styles';

export const AddCar = () => {
	const { formValues } = useContext(CarsContext);

	return (
		<Wrapper>
			<Form />
			<PreviewWrapper>
				<PreviewTitle>Live preview</PreviewTitle>
				<CarCard car={formValues} $isPreviewCard />
			</PreviewWrapper>
		</Wrapper>
	);
};
