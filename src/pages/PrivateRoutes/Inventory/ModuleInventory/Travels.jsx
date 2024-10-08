import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { TapBottons } from '../../../../Components/TapBottons'

export const Travels = () => {
	const location = useLocation()
	const { idDevice } = useParams()

	return (
		<div>
			<TapBottons location={location} idDevice={idDevice} path='devices-screen/device' />
		</div>
	)
}
