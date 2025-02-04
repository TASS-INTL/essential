import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useCallback } from 'react';
import { Circle } from './CircleManager';
import { Polygon } from './PolygonManager';

export const MapsManager = ({ geofences, selectedGeofenceId, onGeofenceUpdate, onUpdateGeofence }) => {
    const map = useMap();
    const drawing = useMapsLibrary('drawing');

    // Manejar creación de polígonos manuales
    useEffect(() => {
        if (!map || !drawing) return;

        const drawingManager = new drawing.DrawingManager({
            drawingMode: [google.maps.drawing.OverlayType.POLYGON, google.maps.drawing.OverlayType.CIRCLE],
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['polygon']
            }
        });

        const handlePolygonComplete = (polygon) => {
            const locationCoordinates = []
            polygon.getPath().getArray().forEach((path) => {
                locationCoordinates.push([path.lng(), path.lat()]);
            });
            
            const newGeofence = {
                id: crypto.randomUUID(),
                type: 'Polygon',
                name: `location_${type}`,
                location: {
                    type: "Polygon",
                    coordinates: locationCoordinates
                },
                market: {
                    location: {
                        type: "Point",
                        coordinates: []
                    },
                    status: 'create'
                },
                permissions: [],
                info: {
                    status: 'created',
                    order: 1,
                    radius: 400
                }
            };
            console.log("NEW GEO", newGeofence)

            // onGeofenceUpdate(newGeofence.name, newGeofence);
        };

        const listener = google.maps.event.addListener(
            drawingManager,
            'polygoncomplete',
            handlePolygonComplete
        );

        drawingManager.setMap(map);

        return () => {
            google.maps.event.removeListener(listener);
            drawingManager.setMap(null);
        };
    }, [drawing, map]);

    return (
        <div className="flex-1 relative">
            {/* Renderizar geocercas circulares */}
            {/* {Object.entries(geofences).map(([id, geofence]) => {
                if (geofence.type === 'circle') {
                    return (
                        <Circle
                            key={id}
                            center={geofence.location.coordinates[0]}
                            radius={geofence.info.radius}
                            editable={selectedGeofenceId === id}
                            draggable={true}
                            strokeColor={selectedGeofenceId === id ? '#FF0000' : '#0000FF'}
                            onRadiusChanged={(radius) => onUpdateGeofence(id, { radius })}
                            onCenterChanged={(center) => onUpdateGeofence(id, { coordinates: center })}
                        />
                    );
                } else {
                    <Polygon
                        key={id}
                        paths={geofence.location.coordinates}
                        editable={selectedGeofenceId === id}
                        strokeColor={selectedGeofenceId === id ? '#FF0000' : '#0000FF'}
                        strokeOpacity={0.8}
                        fillColor={geofence.id === selectedGeofenceId ? '#FFA50080' : '#0000FF30'}
                        onClick={() => handlePolygonEdit(geofence.id)} // Seleccionar al hacer click
                        onEdit={(paths) => handlePolygonEdit(geofence.id, paths)}
                    />

                }
                // Aquí podrías añadir renderizado para polígonos si es necesario
                return null;
            })} */}
        </div>
    );
};