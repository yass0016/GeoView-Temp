/* eslint-disable @typescript-eslint/no-var-requires */
import React, { Suspense } from 'react';

import { LatLngTuple } from 'leaflet';

import '../assests/i18n/i18n';

import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Map } from '../components/map/map';
import { theme } from '../assests/style/theme';

const HtmlToReact = require('html-to-react');
const HtmlToReactParser = require('html-to-react').Parser;

interface AppStartProps {
    html: string;
}

/**
 * Inialize the app with maps from inline html configs, url params
 */
const AppStart = (props: AppStartProps): JSX.Element => {
    const { html } = props;

    /**
     * Create maps from inline configs with class name llwp-map in index.html
     */
    function getInlineMaps() {
        const isValidNode = () => {
            return true;
        };

        // Order matters. Instructions are processed in the order they're defined
        const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
        const processingInstructions = [
            {
                // Custom <h1> processing
                shouldProcessNode: (node) => {
                    return node.attribs && node.attribs.class && node.attribs.class === 'llwp-map';
                },
                processNode: (node, children) => {
                    const config = JSON.parse((node.attribs['data-leaflet'] || '')?.replace(/'/g, '"'));

                    const i18nInstance = i18n.cloneInstance({
                        lng: config.language,
                        fallbackLng: config.language,
                    });

                    const center: LatLngTuple = [config.center[0], config.center[1]];

                    return (
                        <I18nextProvider i18n={i18nInstance}>
                            <Map
                                id={node.attribs.id}
                                center={center}
                                zoom={config.zoom}
                                projection={config.projection}
                                language={config.language}
                                layers={config.layers}
                            />
                        </I18nextProvider>
                    );
                },
            },
            {
                // Anything else
                shouldProcessNode: (node) => {
                    return true;
                },
                processNode: processNodeDefinitions.processDefaultNode,
            },
        ];

        const htmlToReactParser = new HtmlToReactParser();
        return htmlToReactParser.parseWithInstructions(html, isValidNode, processingInstructions);
    }

    return (
        <ThemeProvider theme={theme}>
            <Suspense fallback="">
                <CssBaseline />
                {getInlineMaps()}
            </Suspense>
        </ThemeProvider>
    );
};

export default AppStart;
