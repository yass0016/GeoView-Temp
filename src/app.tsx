import React from 'react';
import ReactDOM from 'react-dom';

// Leaflet icons import to solve issues 4968
import { Icon, Marker } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import '../node_modules/leaflet/dist/leaflet.css';
import '../public/css/style.css';

import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import { store, persistor } from './redux';

import TopBar from './components/topbar/top-bar';
import InlineMaps from './components/inlinemaps/inline-maps';

// hack for default leaflet icon: https://github.com/Leaflet/Leaflet/issues/4968
// TODO: put somewhere else
const DefaultIcon = new Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});
Marker.prototype.options.icon = DefaultIcon;

const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <TopBar />
                <InlineMaps />
            </PersistGate>
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
