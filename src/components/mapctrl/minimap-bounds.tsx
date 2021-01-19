import { useCallback, useMemo, useState, useEffect } from 'react';

import { useMap, useMapEvent } from 'react-leaflet';
import { useEventHandlers } from '@react-leaflet/core';

import { LatLngTuple, Map } from 'leaflet';

import { connect } from 'react-redux';

import { setPosition, updateMapPosition } from '../../redux/common';
import { AppState } from '../../redux';

type MiniboundProps = {
    id: string;
    parentMap: Map;
    zoomFactor: number;
    setPosition: (position: LatLngTuple) => void;
    updateMapPosition: (id: string, position: LatLngTuple) => void;
    maps: Record<string, unknown>;
};

const MinimapBounds = (props: MiniboundProps): JSX.Element => {
    const { id, parentMap, zoomFactor } = props;
    const minimap = useMap();

    // Clicking a point on the minimap sets the parent's map center
    const onClick = useCallback(
        (e) => {
            parentMap.setView(e.latlng, parentMap.getZoom());
        },
        [parentMap]
    );
    useMapEvent('click', onClick);

    // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState({ height: 0, width: 0, top: 0, left: 0 });

    /**
     * Update the map bounds zoom
     */
    function updateMap(): void {
        const parentCenter = parentMap.getCenter();

        // Update the minimap's view to match the parent map's center and zoom
        const newZoom = parentMap.getZoom() - zoomFactor > 0 ? parentMap.getZoom() - zoomFactor : 0;
        minimap.flyTo(parentCenter, newZoom);

        props.setPosition([parentCenter.lat, parentCenter.lng]);

        props.updateMapPosition(id, [parentCenter.lat, parentCenter.lng]);

        console.log(props.maps);

        // Set in timeout the calculation to create the bound so parentMap getBounds has the updated bounds
        setTimeout(() => {
            minimap.invalidateSize();
            const pMin = minimap.latLngToContainerPoint(parentMap.getBounds().getSouthWest());
            const pMax = minimap.latLngToContainerPoint(parentMap.getBounds().getNorthEast());
            setBounds({ height: pMin.y - pMax.y, width: pMax.x - pMin.x, top: pMax.y, left: pMin.x });
        }, 500);
    }

    useEffect(() => {
        updateMap();
    }, []);

    const onChange = useCallback(() => {
        updateMap();
    }, [minimap, parentMap, zoomFactor]);

    // Listen to events on the parent map
    const handlers = useMemo(() => ({ moveend: onChange, zoomend: onChange }), [onChange]);
    useEventHandlers({ instance: parentMap }, handlers);

    return (
        <div
            style={{
                left: `${bounds.left}px`,
                top: `${bounds.top}px`,
                width: `${bounds.width}px`,
                height: `${bounds.height}px`,
                display: 'block',
                opacity: 0.5,
                position: 'absolute',
                border: '1px solid rgb(0, 0, 0)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
            }}
        />
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        position: state.common.position,
        maps: state.common.maps,
    };
};

export default connect(mapStateToProps, { setPosition, updateMapPosition })(MinimapBounds);
