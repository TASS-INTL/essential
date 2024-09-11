import { useState } from 'react'

import { AdvancedMarker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'

import { permission } from '../../pages/PrivateRoutes/Routing/ModuleRouting/CreateRouting'
import { InfoWindowComponent } from './InfoWindowComponent'

export const MarkerWithInfowindow = ({ position }) => {
	const [infowindowOpen, setInfowindowOpen] = useState(true)
	const [markerRef, marker] = useAdvancedMarkerRef()

	return (
		<>
			<AdvancedMarker
				draggable
				ref={markerRef}
				onClick={() => setInfowindowOpen(true)}
				position={{ lat: position.lat, lng: position.lng }}
				title={'AdvancedMarker that opens an Infowindow when clicked.'}
			/>
			{infowindowOpen && (
				<InfoWindowComponent
					marker={marker}
					maxWidth={400}
					onCloseClick={() => setInfowindowOpen(false)}
					permission={permission}
				/>
			)}
		</>
	)
}
