/* eslint-disable react/require-default-props */
import React, { Suspense, StrictMode } from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { i18n } from 'i18next';

import { I18nextProvider } from 'react-i18next';

import { LatLngTuple } from 'leaflet';

import { LayerConfig } from '../../common/layer';

import { store, persistor } from '../../redux';

import Map from './map';

type MapProps = {
    id?: string;
    center: LatLngTuple;
    zoom: number;
    projection: number;
    language: string;
    layers?: LayerConfig[];
};

export function createMap(element: Element, config: MapProps, i18nInstance: i18n): void {
    const center: LatLngTuple = [config.center[0], config.center[1]];

    // * strict mode rendering twice explanation: https://mariosfakiolas.com/blog/my-react-components-render-twice-and-drive-me-crazy/
    render(
        <StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Suspense fallback="">
                        <I18nextProvider i18n={i18nInstance}>
                            <Map
                                id={element.id}
                                center={center}
                                zoom={config.zoom}
                                projection={config.projection}
                                language={config.language}
                                layers={config.layers}
                            />
                        </I18nextProvider>
                    </Suspense>
                </PersistGate>
            </Provider>
        </StrictMode>,
        element
    );
}
