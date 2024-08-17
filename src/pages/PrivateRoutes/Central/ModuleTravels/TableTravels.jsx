import React, { useState } from 'react'

import { travelsStore } from '@/store/travelsStore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'

import { CreateTravel } from '.'
import { InputSearch } from '../../components'
import { initialStateTravel, styleModal } from '../../constants/constants'
import { BoardDevice } from '../../Inventory/ModuleDevices/BoardDevice'
import { useTravels } from './hooks/useTravels'

export const TableTravels = () => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(!open)
	const { register, handleSubmit } = useForm()
	const arrayTableTravels = travelsStore((state) => state.arrayTableTravels)
	const { fetchDataInfoRegister, handleCreateTravel } = useTravels()

	const dataInfoRegister = fetchDataInfoRegister()

	const handlePagination = (data) => {
		setPageSelected(1)
		setArray([1, 2, 3, 4, 5])
		setDataSearch(data.search)
	}

	const createTravel = (data, e) => {
		e.preventDefault()
		const device = dataInfoRegister?.data?.data?.devices.filter((devices) => devices._id === data.device.id_device)
		const installer = dataInfoRegister?.data?.data?.installers.filter(
			(installers) => installers._id === data.installer.id_installer
		)
		const service = dataInfoRegister?.data?.data?.services.filter((services) => services._id === data.service.did)
		const dataSend = {
			date_end: format(dateEnd.$d, 'yyyy-MM-dd hh:mm:ss'),
			date_start: format(dateStart.$d, 'yyyy-MM-dd hh:mm:ss'),
			devices: [
				{
					did: device[0].did,
					id_device: device[0]._id,
					status: device[0].status,
					type_operation: 'INSTALLATION'
				}
			],
			installers: [
				{
					id_installer: installer[0]._id,
					name: installer[0].name,
					status: installer[0].status,
					type_operation: 'INSTALLATION'
				}
			],
			service: {
				did: service[0].did,
				id_service: service[0]._id
			},
			routes: {
				location_end: {
					location: dataCoordinates.location_end, // objeto de la documentacion
					permissions: {}, // viene del back
					name: 'name geo',
					market: {
						location: {},
						status: true
					}
				},
				location_start: {
					location: dataCoordinates.location_start, // objeto de la documentacion
					permissions: {}, // viene del back
					name: 'name geo',
					market: {
						location: {},
						status: true
					}
				},
				stations: [
					{
						location: dataCoordinates.stations, // objeto de la documentacion
						permissions: {}, // viene del back
						name: 'name geo',
						market: {
							location: {},
							status: true
						}
					}
				],
				coordinatesroute: []
			}
		}
		handleCreateTravel(dataSend)
	}

	return (
		<>
			<div className='flex justify-between pt-5 py-20'>
				<Button variant='contained' onClick={handleOpen}>
					Crear Viaje
				</Button>
				<form onSubmit={handleSubmit(handlePagination)}>
					<InputSearch register={register} />
				</form>
			</div>
			<BoardDevice dataBody={arrayTableTravels?.results} to='travels-screen/travel' />
			<Modal
				open={open}
				onClose={handleOpen}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={styleModal}>
					<Typography id='modal-modal-title' variant='h6' component='h2' className='text-center'>
						Creacion del viaje
					</Typography>
					<CreateTravel dataForm={initialStateTravel} handleCreate={createTravel} />
				</Box>
			</Modal>
		</>
	)
}
