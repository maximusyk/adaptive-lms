import '@assets/css/index.css';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { App } from './components/app';
import { store } from './store/index.store';
import { ChakraProvider } from '@chakra-ui/react';
import { render } from 'react-dom';

// enable listener behaviour for the store
setupListeners(store.dispatch);

render(
    <BrowserRouter>
        <Provider store={ store }>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
);