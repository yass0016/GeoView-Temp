import { LatLngTuple } from 'leaflet';
import { SetPositionAction, CommonActionTypes } from './types';

export const setPosition = (position: LatLngTuple): SetPositionAction => ({
    position,
    type: CommonActionTypes.SET_POSITION,
});
