import React from 'react';
import {Provider} from 'react-redux';
import {store} from '@store';
import {App} from './app/App';

interface Props {
}

export const RootComponent: React.FunctionComponent<Props> = props => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
};

export const Root = RootComponent;
