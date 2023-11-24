import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { Header } from 'src/components/atoms/Header/Header';
import { SideSection } from 'src/components/organisms/SideSection/SideSection';
import { FilterBox } from 'src/components/molecules/FilterBox/FilterBox';
import { NavBox } from 'src/components/molecules/NavBox/NavBox';
import { Wrapper } from './MainTemplate.styles';

type MainTemplateProps = {
	children: ReactNode;
};

export const MainTemplate = ({ children }: MainTemplateProps) => {
	const [filterYears, setFilterYears] = useState<never[] | number[]>([]);
	const [filterBrands, setFilterBrands] = useState<never[] | string[]>([]);

	useEffect(() => {
		axios
			.get('/filters')
			.then(({ data }) => {
				setFilterYears(data.filters.productionYears);
				setFilterBrands(data.filters.brands);
			})
			.catch(err => console.log(err));
	}, []);

	return (
		<Wrapper>
			<Header />
			<SideSection $isLeft>
				<FilterBox title='Choose production year(s):' options={filterYears} $isYears />
				<FilterBox title='Choose brand:' options={filterBrands} />
			</SideSection>
			{children}
			<SideSection>
				<NavBox />
			</SideSection>
		</Wrapper>
	);
};
