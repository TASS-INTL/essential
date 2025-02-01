import React from 'react'

import { InputComponent, InputSubmitComponent, RemarksInput, TitleWithLive, LoaderComponent } from '@/Components'
import { BoardDevice } from '@/Components/BoardDevice'
import { arrayTapMonitoring, TapBottons } from '@/Components/TapBottons'
import { travelsStore } from '@/store/travelsStore'
import { useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router-dom'
import { travelInfoStore } from '@/store/travels/travelInfoStore'

import { useTravels } from './hooks/useTravels'

export const Reports = () => {
	const location = useLocation()
	const { idTravel } = useParams()
	const { handleSendBinnacleTravel } = useTravels()
	const reportsLogsTravelInfo = travelInfoStore((state) => state.reports)

	const travelInfo = travelsStore((state) => state.travelInfo)

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const sendBinnacle = (data) => {
		handleSendBinnacleTravel(data, idTravel)
	}

	return (
		<div className='bg-white p-3 pt-6 min-w-[500px]'>
			<TapBottons
				location={location}
				idDevice={idTravel}
				path='travels-screen/travel'
				data={arrayTapMonitoring}
			/>
			<div>
				<form className='flex flex-col md:px-20' onSubmit={handleSubmit(sendBinnacle)}>
					<RemarksInput text='!Notas de seguimiento!' register={register} nameRegister='log' />
					{errors.email && showToast('❌ Ingresa correctamente el email ', 'error')}

					<div className='my-3 flex flex-row justify-center items-center'>
						<InputSubmitComponent text='Enviar Bitacora' />
					</div>
				</form>
			</div>
			<div className='p-5'>
				<TitleWithLive title='Notas de seguimiento' inLive />
				{reportsLogsTravelInfo === null ? <LoaderComponent /> : null}
				{/* <BoardDevice dataBody={travelInfo?.data?.logs_register} /> */}
			</div>
		</div>
	)
}
