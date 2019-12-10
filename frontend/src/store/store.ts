import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {reducer} from '@store/reducer';

const loggerMiddleware = createLogger();

const middleware = applyMiddleware(thunk, loggerMiddleware);

export const store = createStore(reducer, {}, middleware);
