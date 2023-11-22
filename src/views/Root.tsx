import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { GlobalStyle } from '../assets/styles/GlobalStyle';
import { MainTemplate } from '../components/templates/MainTemplate';
import { CarsProvider } from '../providers/CarsProvider';
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
