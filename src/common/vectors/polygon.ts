import L, { LatLngExpression } from 'leaflet';

/**
 * Class used to create and manage polygons
 *
 * @export
 * @class Polygon
 */
export class Polygon {
    // group of Polygon layers
    layers: L.FeatureGroup;

    /**
     * initialize the polygon group of layers
     */
    constructor() {
        this.layers = new L.FeatureGroup();
    }

    /**
     * Create a new polygon and add it to the layer group
     *
     * @param {LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]} points an array of points to create the polygon
     * @param {Record<string, unknown>} options polygon options including styling
     */
    createPolygon = (
        points: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][],
        options: Record<string, unknown>
    ): void => {
        const polygon = L.polygon(points, options);

        this.layers.addLayer(polygon);
    };
}
