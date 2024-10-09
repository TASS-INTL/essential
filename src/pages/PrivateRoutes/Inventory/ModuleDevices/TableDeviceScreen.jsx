import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { BoardDevice } from '../../../../Components/BoardDevice.jsx'
import { ErrorComponent } from '../../../../Components/ErrorComponent.jsx'
import { InputSearch } from '../../../../Components/InputSearch.jsx'
import { LoaderComponent } from '../../../../Components/LoaderComponent.jsx'
import { TitleWithLive } from '../../../../Components/TitleWithLive.jsx'
import { deviceStore } from '../../../../store/deviceStore.js'
import { userStore } from '../../../../store/userStore.js'

export const TableDeviceScreen = () => {
	const { register, handleSubmit } = useForm()
	const [dataSearch, setDataSearch] = useState('')
	// const { paginationEmit } = useInventorySocket()
	const [pageSelected, setPageSelected] = useState(1)
	const [array, setArray] = useState([1, 2, 3, 4, 5])
	const arrayTabledevice = deviceStore((state) => state.arrayTabledevice)

	const userData = userStore((state) => state.userData)

	const handlePagination = () => {
		setPageSelected(1)
		setArray([1, 2, 3, 4, 5])
		setDataSearch(data.search)
	}

	if (arrayTabledevice === null) return <LoaderComponent />

	if (arrayTabledevice.error) return <ErrorComponent error={arrayTabledevice.message} />

	return (
		<>
			<div className='flex justify-between px-0 py-3 pt-2'>
				<Link
					to={
						userData.typeUser === 'factory'
							? '/user/devices-screen/factory-devices-screen'
							: '/user/devices-screen/assign-device-screen'
					}
					className='p-2 bg-black text-white rounded-lg flex justify-center items-center'
				>
					{userData.typeUser === 'factory' ? 'crear dispositivo' : 'Asignar dispositivo'}
				</Link>
				<div className='relative'>
					<form onSubmit={handleSubmit(handlePagination)}>
						<InputSearch register={register} />
					</form>
				</div>
			</div>
			<TitleWithLive title='DISPOSITIVOS' inLive />
			{arrayTabledevice.results.length > 0 && (
				<BoardDevice dataBody={arrayTabledevice?.results} to='devices-screen/device' />
			)}
		</>
	)
}
