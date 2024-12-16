import { TapBottons } from '@/Components/TapBottons'
import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

export const Travels = () => {
	const location = useLocation()
	const { idDevice } = useParams()

	return (
		<div>
			<TapBottons location={location} idDevice={idDevice} path='devices-screen/device' />
		</div>
	)
}
