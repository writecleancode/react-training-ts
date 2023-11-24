import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { CarsContext } from 'src/providers/CarsProvider';
import { StyledSelect, Wrapper } from './SortSelect.styles';

type SortSelectProps = {
	options: {
		value: string;
		text: string;
	}[];
};

export const SortSelect = ({ options }: SortSelectProps) => {
	const [selectedValue, setSelectedValue] = useState(options[0].value);
	const { handleSortCars } = useContext(CarsContext);

	useEffect(() => {
		handleSortCars(selectedValue);
	}, [selectedValue]);

	return (
		<Wrapper>
			<StyledSelect
				value={selectedValue}
				onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedValue(e.target.value)}>
				{options.map(({ value, text }) => (
					<option key={value} value={value}>
						{text}
					</option>
				))}
			</StyledSelect>
		</Wrapper>
	);
};
