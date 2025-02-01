import React from 'react'

import { ErrorComponent, LoaderComponent, TitleWithLive } from '@/Components'
import { BoardDevice } from '@/Components/BoardDevice'
import { InputSearch } from '@/Components/InputSearch'
import { deviceStore } from '@/store/deviceStore'
import { devicesDetails } from '@/store/devices/devicesDetails'
import { userStore } from '@/store/userStore'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export const TableDeviceScreen = () => {
	const { register, handleSubmit } = useForm()
	const arrayTabledevice = deviceStore((state) => state.arrayTabledevice)
	const devices = devicesDetails((state) => state.devicesDetails)
	console.log('devices', devices?.data)
	const userData = userStore((state) => state.userData)

	const handlePagination = (data) => {}

	if (devices === null) return <LoaderComponent />

	if (devices?.error) return <ErrorComponent error={arrayTabledevice.message} />

	return (
		<div className='px-16 py-4'>
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
						<InputSearch register={register} nameRegister='search'/>
					</form>
				</div>
			</div>
			<TitleWithLive title='DISPOSITIVOS' inLive />
			{devices?.data?.results?.length > 0 && (
				<BoardDevice dataBody={devices?.data?.results} to='devices-screen/device' />
			)}
		</div>
	)
}
