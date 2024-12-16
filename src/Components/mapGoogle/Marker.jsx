import React from 'react'

import { Marker } from '@vis.gl/react-google-maps'

export const MarkerComponent = ({ lat, lng }) => {
	return <Marker position={{ lat, lng }} />
}
