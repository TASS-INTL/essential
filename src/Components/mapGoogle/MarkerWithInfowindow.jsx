import { useEffect, useState } from 'react'

import { AdvancedMarker, Marker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'

import { permission } from '../../pages/PrivateRoutes/constants/constants'
import { Circle } from './Circle'
import { InfoWindowComponent } from './InfoWindowComponent'

export const MarkerWithInfowindow = ({ location, position, addPlaces }) => {
	const [infowindowOpen, setInfowindowOpen] = useState(true)
	const [markerRef, marker] = useAdvancedMarkerRef()
	const [center, setCenter] = useState(null)
	const [radius, setRadius] = useState(400)

	const changeCenter = (newCenter) => {
		if (!newCenter) return
		setCenter({ lng: newCenter.lng(), lat: newCenter.lat() })
	}

	useEffect(() => {
		center?.location && addPlaces({ location: center?.location, data: null, fromDraggable: center })
	}, [center])

	return (
		<>
			<Marker
				draggable={true}
				ref={markerRef}
				onClick={() => setInfowindowOpen(true)}
				position={{ lat: position.lat, lng: position.lng }}
				title={'AdvancedMarker that opens an Infowindow when clicked.'}
				onDrag={(e) => setCenter({ location, lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0 })}
			/>
			{infowindowOpen && (
				<InfoWindowComponent
					marker={marker}
					maxWidth={400}
					onCloseClick={() => setInfowindowOpen(false)}
					permission={permission}
				/>
			)}
			<Circle
				radius={radius}
				center={center === null ? { lat: position.lat, lng: position.lng } : center}
				onRadiusChanged={setRadius}
				onCenterChanged={changeCenter}
				strokeColor={'#0c4cb3'}
				strokeOpacity={1}
				strokeWeight={3}
				fillColor={'#3b82f6'}
				fillOpacity={0.3}
				editable
				draggable
			/>
		</>
	)
}
