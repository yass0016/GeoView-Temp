import { Map, LatLngExpression } from 'leaflet';

import { Polygon } from './polygon';

import { Polyline } from './polyline';

import { Circle } from './circle';

/**
 * constant used to specify available vectors to draw
 */
export const VECTOR_TYPES = {
    POLYLINE: 'polyline',
    POLYGON: 'polygon',
    CIRCLE: 'circle',
};

/**
 * Class used to manage vector layers (Polyline, Polygon, Circle...)
 *
 * @export
 * @class Vector
 */
export class Vector {
    // reference to the map object
    map: Map;

    // used to handle creating a polyline
    polyline: Polyline;

    // used to handle creating a polygon
    polygon: Polygon;

    // used to handle crearting a circle
    circle: Circle;

    /**
     * Initialize map, vectors
     *
     * @param {Map} map leaflet map object
     */
    constructor(map: Map) {
        this.map = map;

        // initialize vector types
        this.polyline = new Polyline();
        this.polygon = new Polygon();
        this.circle = new Circle();

        // event handler used when a vector is clicked
        // TODO handle deleting a vector
        this.polyline.layers.on('mousedown', () => {});
        this.polygon.layers.on('mousedown', () => {});
        this.circle.layers.on('mousedown', () => {});

        // add vector layers to the map
        this.map.addLayer(this.polyline.layers);
        this.map.addLayer(this.polygon.layers);
        this.map.addLayer(this.circle.layers);
    }

    /**
     * Create a new polyline
     *
     * @param {LatLngExpression} startPoint start point of the line
     * @param {LatLngExpression} endPoint end point of the line
     * @param {Record<string, unknown>} options line options
     */
    addPolyline = (startPoint: LatLngExpression[], endPoint: LatLngExpression[], options: Record<string, unknown>): void => {
        this.polyline.createPolyline(startPoint, endPoint, options);
    };

    /**
     * Create a polyline using an array of lat/lng points
     *
     * @param {LatLngExpression[] | LatLngExpression[][]} points points of lat/lng to draw a polyline
     * @param options polyline options including styling
     */
    addPolylineCustom = (points: LatLngExpression[] | LatLngExpression[][], options: Record<string, unknown>): void => {
        this.polyline.createCustomPolyline(points, options);
    };

    /**
     * Create a new polygon
     *
     * @param {LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]} points array of points to create the polygon
     * @param {Record<string, unknown>} options polygon options including styling
     */
    addPolygon = (points: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][], options: Record<string, unknown>): void => {
        this.polygon.createPolygon(points, options);
    };

    /**
     * Create a new circle
     *
     * @param {number} latitude the latitude position of the circle
     * @param {number} longitude the longitude position of the circle
     * @param {number} radius the radius of the circle
     * @param {Record<string, unknown>} options circle options including styling
     */
    addCircle = (latitude: number, longitude: number, radius: number, options: Record<string, unknown>): void => {
        this.circle.createCircle(latitude, longitude, radius, options);
    };
}
