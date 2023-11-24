import { render } from '@testing-library/react';
import { CarsProvider } from 'src/providers/CarsProvider';
import { ReactNode } from 'react';

type AllTheProvidersProps = {
	children: ReactNode;
};

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
	return <CarsProvider>{children}</CarsProvider>;
};

const customRender = (ui: any, options?: object) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
