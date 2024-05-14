import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { BoardComponent } from '../../../Components'
import { inventoryStore } from '../../../store/inventoryStore'
import { TapBottons } from '../components'
import { tableTitleInventory } from '../constants/constants'
import { useInventorySocketsEvents } from './Hooks/useInventorySocketsEvents'

export const Events = () => {
	const { idDevice } = useParams()
	const location = useLocation()
	const { paginationEmit } = useInventorySocketsEvents({ idDevice })

	const arrayTableInventoryEvents = inventoryStore((state) => state.arrayTableInventoryEvents)

	console.log(arrayTableInventoryEvents)

	return (
		<div>
			<TapBottons location={location} idDevice={idDevice} />
			<div className='pt-10'>
				<h1 className=' text-2xl pb-5'>Tabla de eventos</h1>
				<BoardComponent dataHeader={tableTitleInventory} dataBody={arrayTableInventoryEvents} />
			</div>
		</div>
	)
}
