import React from 'react'

import { travelsStore } from '../../../store/travelsStore'

export const GeneralTravel = () => {
	const travelInfo = travelsStore((state) => state.travelInfo)

	console.log(travelInfo, 'travelInfo')

	return <div>GeneralTravel</div>
}
