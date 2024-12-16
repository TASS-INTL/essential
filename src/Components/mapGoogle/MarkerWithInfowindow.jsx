import { useEffect, useState } from 'react'

import { Marker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'

import { Circle } from './Circle'
import { InfoWindowComponent } from './InfoWindowComponent'

export const MarkerWithInfowindow = ({
	location,
	position,
	permissionsData,
	handleChangePermissions,
	handleChangeRadiusCircle,
	handleChangeMarkerDraggable
}) => {
	const [infowindowOpen, setInfowindowOpen] = useState(true)
	const [markerRef, marker] = useAdvancedMarkerRef()
	const [center, setCenter] = useState(null)
	const [radius, setRadius] = useState(400)

	const changeCenter = (newCenter) => {
		if (!newCenter) return
		setCenter({ lng: newCenter.lng(), lat: newCenter.lat() })
	}

	useEffect(() => {
		if (center === null) return
		handleChangeMarkerDraggable({ location, data: center })
	}, [center])

	useEffect(() => {
		handleChangeRadiusCircle({
			location,
			lat: center === null ? position.lat : center?.lat,
			lng: center === null ? position.lng : center?.lng,
			radius
		})
	}, [radius, center])

	return (
		<>
			<Marker
				draggable={true}
				ref={markerRef}
				onClick={() => setInfowindowOpen(true)}
				position={center === null ? { lat: position.lat, lng: position.lng } : center}
				title={'AdvancedMarker that opens an Infowindow when clicked.'}
				onDrag={(e) =>
					setCenter({
						location,
						lat: e.latLng?.lat() ?? 0,
						lng: e.latLng?.lng() ?? 0
					})
				}
			/>
			{infowindowOpen && (
				<InfoWindowComponent
					maxWidth={400}
					marker={marker}
					location={location}
					permission={permissionsData}
					onCloseClick={() => setInfowindowOpen(false)}
					handleChangePermissions={handleChangePermissions}
				/>
			)}
			<Circle
				editable
				draggable
				radius={radius}
				fillOpacity={0.3}
				strokeWeight={3}
				strokeOpacity={1}
				onRadiusChanged={setRadius}
				onCenterChanged={changeCenter}
				fillColor={location === 'location_start' ? '#3b82f6' : '#e3f63b'}
				strokeColor={location === 'location_start' ? '#0c4cb3' : '#0c3116'}
				center={center === null ? { lat: position.lat, lng: position.lng } : center}
			/>
		</>
	)
}
