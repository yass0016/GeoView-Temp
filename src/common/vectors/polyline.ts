import L, { LatLngExpression } from 'leaflet';

/**
 * Class used to create, delete polyline
 *
 * @export
 * @class Polyline
 */
export class Polyline {
    // group of polyline layers
    layers: L.FeatureGroup;

    /**
     * initialize the poyline group of layers
     */
    constructor() {
        this.layers = new L.FeatureGroup();
    }

    /**
     * Create a new polyline and add it to the layer group
     *
     * @param {LatLngExpression} startPoint line start point
     * @param {LatLngExpression} endPoint line end point
     * @param {Record<string, unknown>} options line options
     */
    createPolyline = (startPoint: LatLngExpression[], endPoint: LatLngExpression[], options: Record<string, unknown>): void => {
        const polyline = L.polyline([startPoint, endPoint], options);

        this.layers.addLayer(polyline);
    };
}
