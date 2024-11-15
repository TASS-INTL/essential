import React from 'react'

import { InputComponent, InputSubmitComponent, RemarksInput, TitleWithLive } from '@/Components'
import { BoardDevice } from '@/Components/BoardDevice'
import { arrayTapMonitoring, TapBottons } from '@/Components/TapBottons'
import { travelsStore } from '@/store/travelsStore'
import { useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router-dom'

import { useTravels } from './hooks/useTravels'

export const Reports = () => {
	const location = useLocation()
	const { idTravel } = useParams()
	const { handleSendBinnacleTravel } = useTravels()

	const travelInfo = travelsStore((state) => state.travelInfo)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	return (
		<div className='absolute top-0 right-0 bg-white h-full w-3/5 p-3 pt-6'>
			<TapBottons
				location={location}
				idDevice={idTravel}
				path='travels-screen/travel'
				data={arrayTapMonitoring}
			/>
			<div>
				<form
					className='flex flex-col md:px-20'
					onSubmit={handleSubmit((data) => {
						handleSendBinnacleTravel(data, idTravel)
					})}
				>
					<RemarksInput text='!Bitacora del viaje!' register={register} nameRegister='log' />
					{errors.email && showToast('❌ Ingresa correctamente el email ', 'error')}

					<div className='my-3 flex flex-row justify-center items-center'>
						<InputSubmitComponent text='Enviar Bitacora' />
					</div>
				</form>
			</div>
			<div className='p-5'>
				<TitleWithLive title='BITACORAS' inLive />
				<BoardDevice dataBody={travelInfo?.data?.logs_register} />
			</div>
		</div>
	)
}
