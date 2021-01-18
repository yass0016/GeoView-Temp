import { useMemo } from 'react';

import { CRS, DomEvent } from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

import { BasemapOptions } from '../../common/basemap';

import { LEAFLET_POSITION_CLASSES } from '../../common/constant';

import MinimapBounds from './minimap-bounds';

interface OverviewProps {
    crs: CRS;
    basemaps: BasemapOptions[];
    zoomFactor: number;
}

export function OverviewMap(props: OverviewProps): JSX.Element {
    const { crs, basemaps, zoomFactor } = props;

    const parentMap = useMap();
    const mapZoom = parentMap.getZoom() - zoomFactor > 0 ? parentMap.getZoom() - zoomFactor : 0;

    // Memorize the minimap so it's not affected by position changes
    const minimap = useMemo(
        () => (
            <MapContainer
                style={{ height: 150, width: 150 }}
                center={parentMap.getCenter()}
                zoom={mapZoom}
                crs={crs}
                dragging={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                attributionControl={false}
                zoomControl={false}
                whenCreated={(cgpMap) => {
                    DomEvent.disableClickPropagation(cgpMap.getContainer());
                    DomEvent.disableScrollPropagation(cgpMap.getContainer());
                }}
            >
                {basemaps.map((base: { id: string | number | null | undefined; url: string }) => (
                    <TileLayer key={base.id} url={base.url} />
                ))}
                <MinimapBounds parentMap={parentMap} zoomFactor={zoomFactor} />
            </MapContainer>
        ),
        [parentMap, crs, mapZoom, basemaps, zoomFactor]
    );

    return (
        <div className={LEAFLET_POSITION_CLASSES.topright}>
            <div className="leaflet-control leaflet-bar">{minimap}</div>
        </div>
    );
}
