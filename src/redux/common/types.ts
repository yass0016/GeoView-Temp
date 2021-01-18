import { LatLngTuple } from 'leaflet';
import { Action } from 'redux';

export enum CommonActionTypes {
    SET_POSITION = '@@common/SET_POSITION',
}

export interface CommonState {
    position: LatLngTuple;
}

export interface SetPositionAction extends Action {
    position: LatLngTuple;
    type: typeof CommonActionTypes.SET_POSITION;
}

export type CommonActions = SetPositionAction;
