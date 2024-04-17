import React, { useEffect } from 'react'

import { Outlet, useParams } from 'react-router-dom'

export const Device = () => {
	const { idDevice } = useParams()

	useEffect(() => {
		return () => {
			console.log('en este punto debo cerrar las conexiones del socket que tengan que ver con el device')
		}
	}, [])

	return <Outlet />
}
