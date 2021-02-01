import L from 'leaflet';

/**
 * Class used to create and manage circles
 *
 * @export
 * @class Circle
 */
export class Circle {
    // group of circle layers
    layers: L.FeatureGroup;

    /**
     * initialize the circle group of layers
     */
    constructor() {
        this.layers = new L.FeatureGroup();
    }

    /**
     * Create a new circle and add it to the layer group
     *
     * @param {number} latitude the latitude position of the circle
     * @param {number} longitude the longitude position of the circle
     * @param {number} radius the radius of the circle
     * @param {Record<string, unknown>} options circle options including styling
     */
    createCircle = (latitude: number, longitude: number, radius: number, options: Record<string, unknown>): void => {
        const circle = L.circle([latitude, longitude], {
            ...options,
            radius,
        });

        this.layers.addLayer(circle);
    };
}
