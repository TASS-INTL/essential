import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import { GoogleMapsContext, useMapsLibrary } from '@vis.gl/react-google-maps';

export const Circle = forwardRef((props, ref) => {
  const { 
    center, 
    radius,
    editable,
    draggable,
    onRadiusChanged,
    onCenterChanged,
    ...options
  } = props;
  
  const map = useContext(GoogleMapsContext)?.map;
  const [circleRef, circle] = useAdvancedMarkerRef();
  const prevCenterRef = useRef(center);
  const prevRadiusRef = useRef(radius);

  useEffect(() => {
    if (!map) return;

    const newCircle = new google.maps.Circle({
      map,
      center: new google.maps.LatLng(center.lat, center.lng),
      radius,
      editable,
      draggable,
      ...options
    });

    circleRef.current = newCircle;

    return () => newCircle.setMap(null);
  }, [map]);

  // Actualizar radio
  useEffect(() => {
    if (!circle || radius === prevRadiusRef.current) return;
    circle.setRadius(radius);
    prevRadiusRef.current = radius;
  }, [radius]);

  // Actualizar centro
  useEffect(() => {
    if (!circle || 
      center.lat === prevCenterRef.current.lat &&
      center.lng === prevCenterRef.current.lng
    ) return;
    
    circle.setCenter(new google.maps.LatLng(center.lat, center.lng));
    prevCenterRef.current = center;
  }, [center]);

  // Manejar eventos
  useEffect(() => {
    if (!circle) return;

    const listeners = [
      circle.addListener('radius_changed', () => {
        onRadiusChanged?.(circle.getRadius());
      }),
      circle.addListener('center_changed', () => {
        const center = circle.getCenter();
        onCenterChanged?.(center);
      })
    ];

    return () => listeners.forEach(l => l.remove());
  }, [circle]);

  useImperativeHandle(ref, () => circle);

  return null;
});