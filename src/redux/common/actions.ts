import { LatLngTuple } from 'leaflet';
import { SetPositionAction, CommonActionTypes, AddMapAction, UpdateMapPositionAction } from './types';

export const addMap = (id: string): AddMapAction => {
    return {
        id,
        type: CommonActionTypes.ADD_MAP,
    };
};

export const updateMapPosition = (id: string, position: LatLngTuple): UpdateMapPositionAction => {
    return {
        id,
        position,
        type: CommonActionTypes.UPDATE_MAP_POSITION,
    };
};

export const setPosition = (position: LatLngTuple): SetPositionAction => ({
    position,
    type: CommonActionTypes.SET_POSITION,
});
