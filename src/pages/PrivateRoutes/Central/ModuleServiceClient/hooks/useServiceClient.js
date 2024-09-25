import { useEffect, useState } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import dayjs from 'dayjs'
import { useForm, useWatch } from 'react-hook-form'

import api from '../../../../../Api/api'
import { METHODS_API } from '../../../../../Api/constantsApi'
import { showToast } from '../../../../../helpers/toast'
import { queryClient } from '../../../../../routes/AppRouter'

export const useServiceClient = () => {
	const { register, handleSubmit, control } = useForm()
	const [dateStart, setDateStart] = useState(dayjs('2024-04-17T15:30'))
	const [dateEnd, setDateEnd] = useState(dayjs('2024-04-17T15:30'))
	const [open, setOpen] = useState(false)

	const handleCreateService = (data) => {
		data.date_end = format(dateStart.$d, 'yyyy-MM-dd hh:mm:ss')
		data.date_start = format(dateEnd.$d, 'yyyy-MM-dd hh:mm:ss')

		const sendJsonService = {
			type_device: {
				_id: '',
				name: ''
			},
			id_route: '',
			type_service: {
				_id: '',
				name: ''
			},
			date_start: '',
			date_end: '',
			carrier: {
				name: '',
				number: '',
				driver: {
					name: '',
					licence_plate: '',
					number_document: '',
					phone: '',
					email: ''
				},
				information_container: {
					licence_plate: '',
					type: '',
					number: '',
					seals: ['', '']
				}
			},
			information_aditional: '',
			remarks: ''
		}

		// handleCreateServiceClient(data)
	}

	const handleOpen = () => setOpen(!open)

	const fetchDataServiceClient = (page, search) =>
		useQuery({
			queryKey: ['getServiceClientList', page, search],
			queryFn: async () =>
				await api(
					METHODS_API.GET,
					`module/service/client?page=${page}${search !== '' ? `&search=${search}` : ''}`
				)
		})

	const getDataPreCreateService = () =>
		useQuery({
			queryKey: ['getDataPreCreateService'],
			queryFn: async () => await api(METHODS_API.GET, `module/service/precreate`)
		})

	const getDataRoute = (idRoute) => {
		return useQuery({
			queryKey: ['getDataRoute', idRoute],
			queryFn: async () => await api(METHODS_API.GET, `module/routing/find/${idRoute}`),
			enabled: !!idRoute
		})
	}

	const createServiceClient = useMutation({
		mutationFn: async (data) => await api(METHODS_API.POST, `module/service/`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postCreateServiceClient'] })
	})

	const handleCreateServiceClient = async (data) => {
		const response = await createServiceClient.mutateAsync(data)
		response.completed && showToast('Se a creado de manera exito el servicio', 'success')
		response?.error && showToast('❌ Algo ha salido mal al enviar el comando :' + response?.message, 'error')
	}

	const idRoute = useWatch({
		control,
		id_route: null
	})

	// data precreate service
	const dataPreCreateService = getDataPreCreateService()
	//data of the route
	const { data } = getDataRoute(idRoute?.id_route ? idRoute?.id_route : null)

	return {
		open,
		data,
		register,
		handleOpen,
		getDataRoute,
		handleSubmit,
		handleCreateService,
		dataPreCreateService,
		fetchDataServiceClient,
		handleCreateServiceClient
	}
}
