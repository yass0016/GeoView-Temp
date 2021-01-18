import { LatLngTuple } from 'leaflet';
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux';

interface StateProps {
    position: LatLngTuple;
}

const TopBar = (props: StateProps): JSX.Element => {
    const { position } = props;

    return (
        <div
            style={{
                width: '100%',
                top: 0,
                position: 'fixed',
                zIndex: 1000,
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
            }}
        >
            Lat: {position[0]} Long: {position[1]}
        </div>
    );
};

const mapStateToProps = (state: AppState) => {
    return {
        position: state.common.position,
    };
};

export default connect(mapStateToProps, {})(TopBar);
