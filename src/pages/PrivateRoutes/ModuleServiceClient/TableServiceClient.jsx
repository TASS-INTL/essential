import React, { useState } from 'react'

import { Box, Button, Modal, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { BoardComponent, LoaderComponent } from '../../../Components'
import { InputSearch } from '../components'
import { initialStateService, styleModal } from '../constants/constants'
import { BoardDevice } from '../ModuleDevices/BoardDevice'
import { tableHeaderService } from '../ModuleServices/constants'
import { CreateTravel } from '../ModuleTravels'
import { useServiceClient } from './hooks/useServiceClient'

export const TableServiceClient = () => {
	const [page, setPage] = useState(1)
	const { fetchDataServiceClient } = useServiceClient()
	const { register, handleSubmit } = useForm()
	const [dataSearch, setDataSearch] = useState('')
	const [array, setArray] = useState([1, 2, 3, 4, 5])

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(!open)

	const dataTableServicesClient = fetchDataServiceClient(page, '')

	dataTableServicesClient.isLoading && <LoaderComponent />

	const createService = (data) => {
		data.date_end = format(dateStart.$d, 'yyyy-MM-dd hh:mm:ss')
		data.date_start = format(dateEnd.$d, 'yyyy-MM-dd hh:mm:ss')
		data.place_end = dataCoordinates.place_end
		data.place_start = dataCoordinates.place_start
		data.station = dataCoordinates.station
		handleCreateServiceClient(data)
	}

	return (
		<>
			<div className='flex justify-between pt-5 py-20'>
				<Button variant='contained' onClick={handleOpen}>
					Crear Servicio
				</Button>
				<form
					onSubmit={handleSubmit((data) => {
						setPageSelected(1)
						setArray([1, 2, 3, 4, 5])
						setDataSearch(data.search)
					})}
				>
					<InputSearch register={register} />
				</form>
			</div>
			<BoardDevice dataBody={dataTableServicesClient?.data?.data?.results} />
			<Modal
				open={open}
				onClose={handleOpen}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={styleModal}>
					<Typography id='modal-modal-title' variant='h6' component='h2' className='text-center'>
						Creacion del servicio
					</Typography>
					<CreateTravel dataForm={initialStateService} handleCreate={createService} />
				</Box>
			</Modal>
		</>
	)
}
