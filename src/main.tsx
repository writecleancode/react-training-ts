import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/fonts.css';
import { worker } from './mocks/browser';
import { Root } from './views/Root';

worker
	.start({
		onUnhandledRequest: 'bypass',
	})
	.then(() => {
		ReactDOM.createRoot(document.getElementById('root')!).render(
			<React.StrictMode>
				<Root />
			</React.StrictMode>
		);
	});
