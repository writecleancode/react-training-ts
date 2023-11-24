import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { GlobalStyle } from 'src/assets/styles/GlobalStyle';
import { MainTemplate } from 'src/components/templates/MainTemplate';
import { CarsProvider } from 'src/providers/CarsProvider';
import { Dashboard } from './Dashboard';
import { AddCar } from './AddCar';

export const Root = () => {
	return (
		<Router>
			<GlobalStyle />
			<CarsProvider>
				<MainTemplate>
					<Routes>
						<Route path='/' element={<Dashboard />} />
						<Route path='/add-car' element={<AddCar />} />
					</Routes>
				</MainTemplate>
			</CarsProvider>
		</Router>
	);
};
