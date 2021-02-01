import { Map, LatLngExpression } from 'leaflet';

import { Polyline } from './polyline';

/**
 * constant used to specify available vectors to draw
 */
export const VECTOR_TYPES = {
    POLYLINE: 'polyline',
    POLYGON: 'polygon',
    CIRCLE: 'circle',
    RECTANGLE: 'rectangle',
};

/**
 * Class used to manage vector layers (Polyline, Polygon, Circle, Rectangle...)
 *
 * @export
 * @class Vector
 */
export class Vector {
    // used to check if vector layers drawing is enabled or disabled
    drawingEnabled = false;

    // enabled drawing vector type
    drawingType = '';

    // used to store the last click marker
    lastMarker: LatLngExpression[] = [];

    // used to store the current click marker
    currentMarker: LatLngExpression[] = [];

    // reference to the map object
    map: Map;

    // used to handle creating a polyline
    polyline: Polyline;

    /**
     * Initialize map, vectors and mouse event handlers
     *
     * @param {Map} map leaflet map object
     */
    constructor(map: Map) {
        this.map = map;

        this.polyline = new Polyline();

        // event handler used when a polyline is clicked
        this.polyline.layers.on('mousedown', () => {
            this.finishDrawing();
        });

        // add the polyline layers to the map
        this.map.addLayer(this.polyline.layers);

        // when a mouse is clicked on the map
        this.map.on('mousedown', (e) => {
            // store the current mouse position
            if (e.latlng && e.latlng.lat && e.latlng.lng) this.currentMarker = [e.latlng.lat, e.latlng.lng];

            // check if drawing is allowed
            if (this.drawingEnabled) {
                if (this.drawingType === VECTOR_TYPES.POLYLINE) {
                    // if both positions from last mouse click to current mouse click are available
                    if (this.currentMarker.length > 0 && this.lastMarker.length > 0) {
                        // draw a polyline from last mouse click position to current mouse click position
                        // TODO see issue #47
                        this.addPolyline(this.lastMarker, this.currentMarker, {
                            stroke: true,
                            color: '#000',
                            weight: 4,
                            opacity: 1,
                            fill: true,
                            fillColor: null,
                            fillOpacity: 0.2,
                            clickable: true,
                        });
                    }
                }
            }
        });

        // event after a mouse click has finished on the map
        this.map.on('mouseup', (e) => {
            // store the position of the mouse
            if (e.latlng && e.latlng.lat && e.latlng.lng) this.lastMarker = [e.latlng.lat, e.latlng.lng];
        });
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
     * Disable any furthur vector layers drawing
     */
    finishDrawing = (): void => {
        // disable drawing
        this.drawingEnabled = false;

        // reset mouse pointer
        this.map.getContainer().style.cursor = 'grab';

        // reset markers
        this.currentMarker = [];
        this.lastMarker = [];
    };

    /**
     * Enable drawing for a specified vector type
     *
     * @param {string} vectorType the vector to enable drawing for see @VECTOR_TYPES
     */
    draw = (vectorType: string): void => {
        // stop other drawing
        this.finishDrawing();

        // check if specified type within avaialble types
        if (
            vectorType === VECTOR_TYPES.POLYLINE ||
            vectorType === VECTOR_TYPES.POLYGON ||
            vectorType === VECTOR_TYPES.CIRCLE ||
            vectorType === VECTOR_TYPES.RECTANGLE
        ) {
            // enable drawing
            this.drawingEnabled = true;

            // set cursor
            this.map.getContainer().style.cursor = 'crosshair';

            // set the vector type to draw
            this.drawingType = vectorType;
        }
    };
}
