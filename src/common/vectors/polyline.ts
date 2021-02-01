import L, { LatLngExpression } from 'leaflet';

/**
 * Class used to create and manage polylines
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
     * Create a new polyline using start and end lat/lng points and add it to the layer group
     *
     * @param {LatLngExpression} startPoint line start point
     * @param {LatLngExpression} endPoint line end point
     * @param {Record<string, unknown>} options polyline options including styling
     */
    createPolyline = (startPoint: LatLngExpression[], endPoint: LatLngExpression[], options: Record<string, unknown>): void => {
        const polyline = L.polyline([startPoint, endPoint], options);

        this.layers.addLayer(polyline);
    };

    /**
     * Create a polyline using an array of lat/lng points and add it to the layer group
     *
     * @param {LatLngExpression[] | LatLngExpression[][]} points points of lat/lng to draw a polyline
     * @param options polyline options including styling
     */
    createCustomPolyline = (points: LatLngExpression[] | LatLngExpression[][], options: Record<string, unknown>): void => {
        const polyline = L.polyline(points, options);

        this.layers.addLayer(polyline);
    };
}
