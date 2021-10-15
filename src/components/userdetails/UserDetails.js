import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactRoundedImage from "react-rounded-image";
import MapComponent from '../MapComponent';
import Stack from '@mui/material/Stack';
import './UserDetails.css'

const UserDetails = () => {
    const location = useLocation();

    const renderUserDetails = () => {
        return (
            <div>
                <span className="userdetails-details">Full Name: {location.state.data.name.first} {location.state.data.name.last}</span>
                <br />
                <span className="userdetails-details">Email: {location.state.data.email}</span>
                <br />
                <span className="userdetails-details">Gender: {location.state.data.gender}</span>
                <br />
                <span className="userdetails-details">Age: {location.state.data.dob.age}</span>
            </div>
        )
    }
    
    return (
        <div>
            <h1 className="userdetails-title">User Details</h1>
            <Stack className="userdetails-stack" direction="row" spacing={2}>
                <ReactRoundedImage image={location.state.data.picture.thumbnail} imageWidth="80" imageHeight="80" roundedSize="0"></ReactRoundedImage>
                {renderUserDetails()}
            </Stack>
            <MapComponent lat={location.state.data.location.coordinates.latitude} lng={location.state.data.location.coordinates.longitude}></MapComponent>
        </div>
        
    )
}

export default UserDetails;