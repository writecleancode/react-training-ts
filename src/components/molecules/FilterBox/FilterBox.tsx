import { useContext } from 'react';
import { CarsContext } from 'src/providers/CarsProvider';
import { StyledTitle } from 'src/components/atoms/StyledTitle/StyledTitle';
import { FilterItem, FilterItems, Wrapper } from './FilterBox.styles';

type FilterBoxProps = {
	title: string;
	options: (string | number)[];
	$isYears?: boolean;
};

export const FilterBox = ({ title, options, $isYears }: FilterBoxProps) => {
	const { handleFilterParameters } = useContext(CarsContext);

	const handleActiveClass = (option: string | number) => {
		const filterItem: HTMLLIElement = document.querySelector(`[data-content='${option}']`)!;
		filterItem.classList.toggle('active');
		handleFilterParameters(option);
	};

	return (
		<Wrapper>
			<StyledTitle $isFilterTitle>{title}</StyledTitle>
			<FilterItems>
				{options.map(option => (
					<FilterItem
						key={option}
						$isYears={$isYears}
						onClick={() => handleActiveClass(option)}
						data-content={option}
						data-testid={option}>
						{option}
					</FilterItem>
				))}
			</FilterItems>
		</Wrapper>
	);
};
