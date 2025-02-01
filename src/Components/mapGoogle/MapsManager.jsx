import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useCallback } from 'react';
import { Circle } from './Circle';

export const MapCanvas = ({ geofences, onGeofenceUpdate }) => {
  const map = useMap();
  const drawing = useMapsLibrary('drawing');

  // Manejar creación de polígonos manuales
  useEffect(() => {
    if (!map || !drawing) return;

    const drawingManager = new drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon']
      }
    });

    const handlePolygonComplete = (polygon) => {
      const newGeofence = {
        type: 'polygon',
        name: `geofence_${Date.now()}`,
        coordinates: polygon.getPath().getArray().map(p => ({ lat: p.lat(), lng: p.lng() })),
        permissions: [],
        status: 'active'
      };

      onGeofenceUpdate(newGeofence.name, newGeofence);
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
      {Object.entries(geofences).map(([name, geofence]) => {
        if (geofence.type === 'circle') {
          return (
            <Circle
              key={name}
              center={geofence.coordinates}
              radius={geofence.radius}
              editable={true}
              draggable={true}
              strokeColor="#FF0000"
              fillColor="#FF000030"
              onRadiusChanged={(radius) => onGeofenceUpdate(name, { radius })}
              onCenterChanged={(center) => 
                onGeofenceUpdate(name, { coordinates: center.toJSON() })
              }
            />
          );
        }
        // Aquí podrías añadir renderizado para polígonos si es necesario
        return null;
      })}
    </div>
  );
};