import { Reducer } from 'redux';
import { CommonActions, CommonActionTypes, CommonState } from './types';

export const initialState: CommonState = {
    position: [0, 0],
    maps: {},
};

export const common: Reducer<CommonState, CommonActions> = (state = initialState, action: CommonActions) => {
    switch (action.type) {
        case CommonActionTypes.ADD_MAP: {
            const { maps } = state;

            const newMap = maps;

            newMap[action.id] = {
                position: [0, 0],
            };

            return {
                ...state,
                maps: newMap,
            };
        }
        case CommonActionTypes.UPDATE_MAP_POSITION: {
            const { maps } = state;
            const updatedMaps = maps;

            updatedMaps[action.id] = {
                position: [action.position[0], action.position[1]],
            };

            return {
                ...state,
                maps: updatedMaps,
            };
        }
        case CommonActionTypes.SET_POSITION:
            return {
                ...state,
                position: action.position,
            };
        default:
            return state;
    }
};
