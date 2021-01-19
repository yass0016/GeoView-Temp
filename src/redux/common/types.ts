import { LatLngTuple } from 'leaflet';
import { Action } from 'redux';

export enum CommonActionTypes {
    SET_POSITION = '@@common/SET_POSITION',
    ADD_MAP = '@@common/ADD_MAP',
    UPDATE_MAP_POSITION = '@@common/UPDATE_MAP_POSITION',
}

export interface CommonState {
    maps: Record<string, unknown>;
    position: LatLngTuple;
}

export interface AddMapAction extends Action {
    id: string;
    type: typeof CommonActionTypes.ADD_MAP;
}

export interface UpdateMapPositionAction extends Action {
    id: string;
    position: LatLngTuple;
    type: typeof CommonActionTypes.UPDATE_MAP_POSITION;
}

export interface SetPositionAction extends Action {
    position: LatLngTuple;
    type: typeof CommonActionTypes.SET_POSITION;
}

export type CommonActions = SetPositionAction | AddMapAction | UpdateMapPositionAction;
