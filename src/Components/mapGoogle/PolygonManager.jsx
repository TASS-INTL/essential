import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import { GoogleMapsContext, useMapsLibrary, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

const usePolygon = (props) => {
  const { paths, onEdit, ...options } = props;
  const map = useContext(GoogleMapsContext)?.map;
  const [polygonRef, polygon] = useAdvancedMarkerRef();
  const geometry = useMapsLibrary('geometry');
  const prevPathsRef = useRef([]);

  // Configuración inicial del polígono
  useEffect(() => {
    if (!map || !geometry) return;

    const newPolygon = new google.maps.Polygon({
      map,
      paths: paths.map(p => new google.maps.LatLng(p.lat, p.lng)),
      ...options
    });

    polygonRef.current = newPolygon;
    prevPathsRef.current = paths;

    return () => {
      newPolygon.setMap(null);
    };
  }, [map, geometry]);

  // Actualización de paths
  useEffect(() => {
    if (!polygon || !paths) return;
    
    if (!pathsEqual(prevPathsRef.current, paths)) {
      polygon.setPaths(paths.map(p => new google.maps.LatLng(p.lat, p.lng)));
      prevPathsRef.current = paths;
    }
  }, [paths]);

  // Manejo de eventos de edición
  useEffect(() => {
    if (!polygon || !onEdit) return;

    const editListener = polygon.addListener('mouseup', () => {
      const newPaths = polygon.getPaths().getArray().flatMap(path => 
        path.getArray().map(p => ({ lat: p.lat(), lng: p.lng() }))
      );
      onEdit(newPaths);
    });

    return () => google.maps.event.removeListener(editListener);
  }, [polygon, onEdit]);

  return polygon;
};

// Función para comparar arrays de coordenadas
const pathsEqual = (prevPaths, newPaths) => {
  if (prevPaths.length !== newPaths.length) return false;
  return prevPaths.every((p, i) => 
    p.lat === newPaths[i].lat && 
    p.lng === newPaths[i].lng
  );
};

export const Polygon = forwardRef((props, ref) => {
  const polygon = usePolygon(props);
  useImperativeHandle(ref, () => polygon);
  return null;
});