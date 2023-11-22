import { useContext } from 'react';
import { CarsContext } from '../../../providers/CarsProvider';
import { CarName } from '../../atoms/CarName/CarName';
import { CarImg } from '../../atoms/CarImg/CarImg';
import { CarInfoBox } from '../../atoms/CarInfoBox/CarInfoBox';
import { TrashIcon } from '../../../assets/icons/TrashIcon';
import { CarInfoWrapper, DeleteButton, Wrapper } from './CarCards.styles';

type Car = {
	id?: string;
	brand: string;
	model: string;
	generation: string;
	productionStartYear: number;
	productionEndYear: number;
	facelift: string;
	imgUrl: string;
};

type CarCarsProps = {
	$isPreviewCard?: boolean;
	car: Car;
};

export const CarCard = ({
	$isPreviewCard,
	car: { id = '', brand, model, imgUrl, generation, productionStartYear, productionEndYear, facelift },
}: CarCarsProps) => {
	const { handleRemoveCar } = useContext(CarsContext);

	return (
		<Wrapper>
			<CarName>{`${brand} ${model}`}</CarName>
			<CarImg src={imgUrl} alt={`${brand} ${model} ${generation}`} />
			<CarInfoWrapper>
				<CarInfoBox title={'Generation'} info={generation} />
				<CarInfoBox title={'Production years'} info={`${productionStartYear} - ${productionEndYear}`} />
				<CarInfoBox title={'Facelift'} info={facelift} />
			</CarInfoWrapper>
			{$isPreviewCard ? null : (
				<DeleteButton onClick={() => handleRemoveCar(id)} aria-label='delete car'>
					<TrashIcon />
				</DeleteButton>
			)}
		</Wrapper>
	);
};
