import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { TapBottons } from '../components'

export const Travels = () => {
	const location = useLocation()
	const { idDevice } = useParams()

	return (
		<div>
			<TapBottons location={location} idDevice={idDevice} />

			<h1>Travels</h1>
		</div>
	)
}
