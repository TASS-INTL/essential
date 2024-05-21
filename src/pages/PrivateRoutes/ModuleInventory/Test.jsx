import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { inventoryStore } from '../../../store/inventoryStore'
import { TapBottons } from '../components'
import { BoardDevice } from '../ModuleDevices/BoardDevice'
import { useInventory } from './Hooks/useInventory'

export const Test = () => {
	const location = useLocation()
	const { idDevice } = useParams()
	const arrayTableInventoryTest = inventoryStore((state) => state.arrayTableInventoryTest)
	const deviceInfo = inventoryStore((state) => state.deviceInfo)

	const { handleSendComandTest } = useInventory()

	const SendCommand = (to) => {
		handleSendComandTest({ idDevice, did: deviceInfo?.general?.did, to })
	}

	return (
		<div>
			<TapBottons location={location} idDevice={idDevice} path='devices-screen/device' />

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
				<BoardDevice dataBody={arrayTableInventoryTest?.data?.results} />
			</div>
		</div>
	)
}
