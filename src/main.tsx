import React from 'react';
import ReactDOM from 'react-dom/client';
import 'src/assets/styles/fonts.css';
import { worker } from 'src/mocks/browser';
import { Root } from 'src/views/Root';

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
