import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


export class MapComponent extends Component {
    componentDidMount = () => {
        this.setState({
            lat:this.props.lat,
            lng:this.props.lng
        })
    }

    renderMap= () => {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                center={{
                    lat: this.props.lat,
                    lng: this.props.lng
                }}
                >
                <Marker key="marker_1"
                    position={{
                        lat: this.props.lat,
                        lng: this.props.lng
                    }}
                    />
            </Map>
        )
    }

    render() {
        return (
        <div style={{position:'absolute', width:'60em', height:'40em', left: '22.5%'}}>
            {this.renderMap()}
        </div>);
    }
}


export default GoogleApiWrapper({

    apiKey: 'AIzaSyCGApSEJ6po7W2mJhNcBV02MWVkJ3izSy0'

})(MapComponent);