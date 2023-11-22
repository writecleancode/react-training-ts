import { ChangeEvent, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CarsContext } from '../providers/CarsProvider';
import { SearchInput } from '../components/atoms/SearchInput/SearchInput';
import { SortSelect } from '../components/atoms/SortSelect/SortSelect';
import { CarCard } from '../components/molecules/CarCard/CarCard';
import { CarsWrapper, SearchWrapper, Wrapper } from './Dashboard.styles';

export const Dashboard = () => {
	const { cars, handleSearchCars } = useContext(CarsContext);
	const [selectOptions, setSelectOptions] = useState([{ value: '', text: '' }]);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		axios
			.get('/select-options')
			.then(({ data }) => setSelectOptions(data.options))
			.catch(err => console.log(err));
	}, []);

	useEffect(() => {
		handleSearchCars(searchPhrase);
	}, [searchPhrase]);

	return (
		<Wrapper>
			<SearchWrapper>
				<SearchInput value={searchPhrase} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchPhrase(e.target.value)} />
				<SortSelect options={selectOptions} />
			</SearchWrapper>
			<CarsWrapper>
				{cars.map(car => (
					<CarCard key={car.id} car={car} />
				))}
			</CarsWrapper>
		</Wrapper>
	);
};
