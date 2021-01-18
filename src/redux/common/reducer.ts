import { Reducer } from 'redux';
import { CommonActions, CommonActionTypes, CommonState } from './types';

export const initialState: CommonState = {
    position: [0, 0],
};

export const common: Reducer<CommonState, CommonActions> = (state = initialState, { type, ...payload }) => {
    switch (type) {
        case CommonActionTypes.SET_POSITION:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
};
