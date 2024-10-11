import React from 'react'

import { inventoryStore } from '@/store/inventoryStore'
import { useLocation, useParams } from 'react-router-dom'

import { useInventory } from './Hooks/useInventory'
import { arrayTapInventory, TapBottons } from '@/Components/TapBottons'

export const Test = () => {
	const location = useLocation()
	const { idDevice } = useParams()
	const deviceInfo = inventoryStore((state) => state.deviceInfo)

	const { handleSendComandTest } = useInventory()

	const SendCommand = (to) => {
		handleSendComandTest({ idDevice, did: deviceInfo?.general?.did, to })
	}

	return (
		<div>
			<TapBottons location={location} idDevice={idDevice} path='devices-screen/device' data={arrayTapInventory} />
			<div className='pt-10'>
				<div className=' flex justify-end'>
					<button
						onClick={() => SendCommand('create')}
						className='bg-lime-700 py-2 px-5 text-white rounded-lg'
					>
						Hacer test
					</button>
				</div>
				<h1 className=' text-2xl pb-5'>Tabla de testing</h1>
				{/* <BoardDevice dataBody={arrayTableInventoryTest?.data?.results} /> */}
			</div>
		</div>
	)
}
