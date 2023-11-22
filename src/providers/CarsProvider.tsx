import { ChangeEvent, ReactNode, createContext, useEffect, useState } from 'react';
import axios from 'axios';

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

type CarsData = Car[];

type CarsProviderProps = {
	children: ReactNode;
};

let carsData: CarsData = [];
let foundCars: CarsData = [];
let filteredCars: CarsData = [];
let valueA: string | number;
let valueB: string | number;
let filterYearsOptions: number[] = [];
let filterBrandsOptions: string[] = [];

const initialFormValues = {
	brand: 'Daewoo',
	model: 'Nubira',
	generation: 'I (J100)',
	productionStartYear: 1997,
	productionEndYear: 2003,
	facelift: '1999',
	imgUrl: 'https://www.datocms-assets.com/112049/1699699918-daewoo_nubira_i.jpg',
};

type CarsContextType = {
	cars: [] | CarsData;
	formValues: Car;
	handleInputChange: (() => void) | ((e: ChangeEvent<HTMLInputElement>) => void);
	handleAddCar: () => void;
	handleRemoveCar: (() => void) | ((carId: string) => void);
	handleSearchCars: (() => void) | ((searchPhrase: string) => void);
	handleSortCars: (() => void) | ((selectedValue: string) => void);
	handleFilterParameters: (() => void) | ((filterOption: number | string) => void);
};

export const CarsContext = createContext({
	cars: [],
	formValues: {},
	handleInputChange: () => {},
	handleAddCar: () => {},
	handleRemoveCar: () => {},
	handleSearchCars: () => {},
	handleSortCars: () => {},
	handleFilterParameters: () => {},
} as CarsContextType);

export const CarsProvider = ({ children }: CarsProviderProps) => {
	const [cars, setCars] = useState<CarsData>([]);
	const [formValues, setFormValues] = useState<Car>(initialFormValues);

	useEffect(() => {
		axios
			.get('/cars')
			.then(({ data }) => {
				setCars(data.cars);
				carsData = data.cars;
				foundCars = data.cars;
				filteredCars = data.cars;
			})
			.catch(err => console.log(err));
	}, []);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'productionStartYear' || e.target.name === 'productionEndYear') {
			setFormValues({
				...formValues,
				[e.target.name]: Number(e.target.value),
			});
		} else {
			setFormValues({
				...formValues,
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleAddCar = () => {
		const addedCar = formValues;
		axios
			.post('/cars/add-car', { addedCar: addedCar })
			.then(({ data }) => {
				setCars(data.cars);
				carsData = data.cars;
				foundCars = data.cars;
				filteredCars = data.cars;
			})
			.catch(err => console.log(err));
	};

	const removeCar = (carId: string, carsToSearchThrough: CarsData) => {
		const filteredCars = carsToSearchThrough.filter(car => {
			return car.id !== carId;
		});
		return filteredCars;
	};

	const handleRemoveCar = (carId: string) => {
		carsData = removeCar(carId, carsData);
		filteredCars = removeCar(carId, filteredCars);
		handleFilterCars();
	};

	const handleDisplayCars = () => {
		const matchingCars = foundCars.filter(foundCar => {
			for (let i = 0; i < filteredCars.length; i++) {
				const filteredCar = filteredCars[i];
				if (foundCar.id === filteredCar.id) {
					return true;
				}
			}
		});
		setCars(matchingCars);
	};

	const handleSearchCars = (searchPhrase: string) => {
		if (!searchPhrase) {
			foundCars = carsData;
		} else {
			const matchingCars = carsData.filter(car => {
				const carName = `${car.brand} ${car.model}`;
				return carName.toLowerCase().includes(searchPhrase.toLowerCase());
			});
			foundCars = matchingCars;
		}
		handleDisplayCars();
	};

	const setSortVariables = (selectedValue: string, a: Car, b: Car) => {
		switch (selectedValue) {
			case 'byAlphabet':
				valueA = `${a.brand.toLowerCase()} ${a.model.toLowerCase()}`;
				valueB = `${b.brand.toLowerCase()} ${b.model.toLowerCase()}`;
				break;
			case 'byAlphabetReverse':
				valueA = `${b.brand.toLowerCase()} ${b.model.toLowerCase()}`;
				valueB = `${a.brand.toLowerCase()} ${a.model.toLowerCase()}`;
				break;
			case 'byYear':
				valueA = a.productionStartYear;
				valueB = b.productionStartYear;
				break;
			case 'byYearReverse':
				valueA = b.productionStartYear;
				valueB = a.productionStartYear;
				break;
			default:
				break;
		}
	};

	const sortCars = (selectedValue: string, carsToSort: CarsData) => {
		carsToSort.sort((a, b) => {
			setSortVariables(selectedValue, a, b);

			if (valueA < valueB) return -1;
			if (valueA > valueB) return 1;

			return 0;
		});
	};

	const handleSortCars = (selectedValue: string) => {
		sortCars(selectedValue, carsData);
		if (carsData.length === foundCars.length && carsData.length === filteredCars.length) {
			handleDisplayCars();
			return;
		}
		sortCars(selectedValue, foundCars);
		handleDisplayCars();
	};

	const handleFilterCars = () => {
		if (!filterYearsOptions.length && !filterBrandsOptions.length) {
			filteredCars = carsData;
		} else {
			const matchingCars = carsData.filter(carToCheck => {
				let conditionResults = [];
				let statement;

				if (filterBrandsOptions.length) {
					if (filterBrandsOptions.includes(carToCheck.brand)) {
						conditionResults.push(true);
					} else {
						conditionResults.push(false);
					}
				}

				for (let i = 0; i < filterYearsOptions.length; i++) {
					const year = filterYearsOptions[i];
					if (carToCheck.productionStartYear <= year && carToCheck.productionEndYear >= year) {
						conditionResults.push(true);
					} else {
						conditionResults.push(false);
					}
				}

				statement = conditionResults.every(item => item === true);
				return statement;
			});
			filteredCars = matchingCars;
		}
		handleDisplayCars();
	};

	const handleFilterParameters = (filterOption: number | string) => {
		if (typeof filterOption === 'number') {
			if (filterYearsOptions.includes(filterOption)) {
				filterYearsOptions = filterYearsOptions.filter(option => option !== filterOption);
			} else {
				filterYearsOptions.push(filterOption);
			}
		} else if (typeof filterOption === 'string') {
			if (filterBrandsOptions.includes(filterOption)) {
				filterBrandsOptions = filterBrandsOptions.filter(option => option !== filterOption);
			} else {
				filterBrandsOptions.push(filterOption);
			}
		}
		handleFilterCars();
	};

	return (
		<CarsContext.Provider
			value={{
				cars: cars,
				formValues: formValues,
				handleInputChange: handleInputChange,
				handleAddCar: handleAddCar,
				handleRemoveCar: handleRemoveCar,
				handleSearchCars: handleSearchCars,
				handleSortCars: handleSortCars,
				handleFilterParameters: handleFilterParameters,
			}}>
			{children}
		</CarsContext.Provider>
	);
};
