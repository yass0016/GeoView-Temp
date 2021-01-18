import { createStore, applyMiddleware, combineReducers } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import thunk from 'redux-thunk';
import { initialState as commonInitialState, common } from './common';

const persistConfig = {
    key: 'root',
    storage,
};

export const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        common,
    })
);

export const initialState = {
    common: commonInitialState,
};

export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
export const persistor = persistStore(store);

export type AppState = ReturnType<typeof persistedReducer>;
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
