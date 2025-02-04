import {useEffect, useState} from 'react'

import { Circle } from "@/Components/mapGoogle/Circle"
import { Polygon } from "@/Components/mapGoogle/Polygon"
import { InfoWindowComponent } from "@/Components/mapGoogle/InfoWindowComponent"
import { Marker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'

export const GeofenceMapComponent = ({geofence, handleUpdateGeoPolygon, handleUpdateGeoCircle, handleClickGeo, handleClickSavePermissions, handleClickClosePermissions, use, permissions={data: []}}) => {
    const [markerRef, marker] = useAdvancedMarkerRef()
    // console.log("Geofence:", "permissions: ", permissions);
    console.log("Geofence:", geofence);
    const handleMarkerDragEnd = (e) => {
        const newPosition = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        if(!use){
            return;
        }
        handleUpdateGeoCircle(geofence.id)({
            center: newPosition,
            type: 'marker'
        });
    };

    const handleCircleChange = () => {
        if (geofence.type === 'Circle') {
            if(!use){
                return;
            }
            handleUpdateGeoCircle(geofence.id)({
                center: {
                    lat: geofence.info.coordinates_center[1],
                    lng: geofence.info.coordinates_center[0]
                },
                type: 'circle'
            });
        }
    };

    const handleSavePermissions = (permissions) => {
        if(!use){
            return;
        }
        handleClickSavePermissions({
            geofenceId: geofence.id,
            permissions: permissions
        })
        console.log("permissions sendir: ", permissions);
    }

    const handleClosePermissions = () => {
        if(!use){
            return;
        }
        handleClickClosePermissions({geofenceId: geofence.id})
    }

    const handlePolygonChange = (polygon) => {
        console.log("Polygon event:", polygon);
        // Obtener las coordenadas directamente del evento
        const paths = polygon.getPath();
        const coordinates = [];
        
        for (let i = 0; i < paths.getLength(); i++) {
            const point = paths.getAt(i);
            coordinates.push({
                lat: point.lat(),
                lng: point.lng()
            });
        }
        
        console.log("New coordinates:", coordinates);
        if(!use){
            return;
        }
        handleUpdateGeoPolygon(geofence.id)({
            coordinates,
            type: 'polygon'
        });
    };

    return (
        <>
            {geofence.type === 'Circle' && 
                <Circle
                    editable={geofence.info.editable}
                    draggable={geofence.info.editable}
                    onClick={handleClickGeo}
                    radius={geofence.info.radius}
                    fillOpacity={0.3}
                    strokeWeight={3}
                    strokeOpacity={1}
                    onRadiusChanged={handleCircleChange}
                    onCenterChanged={handleCircleChange}
                    fillColor={geofence.select ? '#0c4cb3' : '#0c3116'}
                    strokeColor={geofence.select? '#0c4cb3' : '#0c3116'}
                    center={geofence.info.coordinates_center ? 
                        { lat: geofence.info.coordinates_center[1], lng: geofence.info.coordinates_center[0] } : 
                        { lat: 0, lng: 0 }}
                />
            }
            {geofence.type === 'Polygon' &&
                <Polygon
                    editable={geofence.info.editable}
                    draggable={geofence.info.editable}
                    strokeWeight={1.5}
                    fillColor={geofence.select ? '#0c4cb3' : '#0c3116'}
                    pathsArray={geofence.location.coordinates[0]}
                    onClick={handleClickGeo}
                    onDragEnd={handlePolygonChange}
                    onPathChanged={handlePolygonChange}
                />
            }
            {geofence.market.status &&
                <Marker
                    visible={geofence.market.status !== 'none'}
                    ref={markerRef}
                    draggable={geofence.info.editable}
                    position={geofence.market.location.coordinates ? 
                        { lat: geofence.market.location.coordinates[1], lng: geofence.market.location.coordinates[0] } : 
                        { lat: 0, lng: 0 }}
                    title={`Marker para la geocerca ${geofence.name}`}
                    onDragEnd={handleMarkerDragEnd}
                />
            }
            {geofence.info.editable &&
                <InfoWindowComponent
                    maxWidth={400}
                    marker={marker}
                    location={location}
                    permissionCurrent={geofence.permissions}
                    permission={permissions.data ? permissions.data : permissions}
                    onSaveClick={handleSavePermissions}
                    onCloseClick={handleClosePermissions}
            />
            }
        </>
    )
}