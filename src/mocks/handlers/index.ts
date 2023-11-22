import { HttpResponse, http } from 'msw';
import { cars as carsData } from '../data/cars';
import { v4 as uuid } from 'uuid';
import { filterBrands, filterYears } from '../data/filters';
import { selectOptions } from '../data/select';

let cars = carsData;

export const handlers = [
	http.get('/cars', () => {
		return HttpResponse.json({
			cars: cars,
		});
	}),

	http.get('/filters', () => {
		return HttpResponse.json({
			filters: {
				productionYears: filterYears,
				brands: filterBrands,
			},
		});
	}),

	http.get('/select-options', () => {
		return HttpResponse.json({
			options: selectOptions,
		});
	}),

	http.post('/cars/add-car', async ({ request }) => {
		const { addedCar }: any = await request.json();
		const newCar = {
			id: uuid(),
			...addedCar,
		};
		cars = [newCar, ...cars];
		return HttpResponse.json({
			cars: cars,
		});
	}),
];
