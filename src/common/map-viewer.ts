import { Map } from 'leaflet';

import { Vector } from './vectors/vector';

/**
 * interface used to store created maps
 */
export interface MapInterface {
    id: string;
    map: Map;
}

/**
 * Class used to manage created maps
 *
 * @export
 * @class MapViewer
 */
export class MapViewer {
    mapInstance: MapInterface;

    vector: Vector;

    constructor(mapInstance: MapInterface) {
        this.mapInstance = mapInstance;
        this.vector = new Vector(mapInstance.map);
    }
}
