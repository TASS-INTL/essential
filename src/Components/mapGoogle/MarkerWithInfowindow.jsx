import { useEffect, useState } from 'react'

import { Marker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'

import { Circle } from './Circle'
import { InfoWindowComponent } from './InfoWindowComponent'

export const MarkerWithInfowindow = ({
	location,
	position,
	permissionsData,
	handleChangePermissions,
	handleChangeMarkerDraggable
}) => {
	const [infowindowOpen, setInfowindowOpen] = useState(true)
	const [markerRef, marker] = useAdvancedMarkerRef()
	const [center, setCenter] = useState(null)
	const [radius, setRadius] = useState(400)
	const copyArrayPermission = JSON.parse(JSON.stringify(permissionsData?.data))

	const changeCenter = (newCenter) => {
		if (!newCenter) return
		setCenter({ lng: newCenter.lng(), lat: newCenter.lat() })
	}

	useEffect(() => {
		center?.location && handleChangeMarkerDraggable({ location: center?.location, data: center })
	}, [center])

	const handleCheckboxChange = (event, _id) => {
		const isChecked = event.target.checked
		copyArrayPermission?.forEach((permission) => {
			if (permission._id === _id) {
				permission.values.value = isChecked
			}
		})
	}

	const sendPermissionState = () => {
		handleChangePermissions({ location, permissions: copyArrayPermission })
	}

	return (
		<>
			<Marker
				draggable={true}
				ref={markerRef}
				onClick={() => setInfowindowOpen(true)}
				position={center === null ? { lat: position.lat, lng: position.lng } : center}
				title={'AdvancedMarker that opens an Infowindow when clicked.'}
				onDrag={(e) => setCenter({ location, lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0 })}
			/>
			{infowindowOpen && (
				<InfoWindowComponent
					marker={marker}
					maxWidth={400}
					onCloseClick={() => setInfowindowOpen(false)}
					permission={permissionsData?.data}
					handleCheckboxChange={handleCheckboxChange}
					sendPermissionState={sendPermissionState}
				/>
			)}
			<Circle
				radius={radius}
				center={center === null ? { lat: position.lat, lng: position.lng } : center}
				onRadiusChanged={setRadius}
				onCenterChanged={changeCenter}
				strokeColor={location === 'location_start' ? '#0c4cb3' : '#0c3116'}
				strokeOpacity={1}
				strokeWeight={3}
				fillColor={location === 'location_start' ? '#3b82f6' : '#e3f63b'}
				fillOpacity={0.3}
				editable
				draggable
			/>
		</>
	)
}
