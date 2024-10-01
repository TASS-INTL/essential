import { useEffect, useState } from 'react'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import { useForm, useWatch } from 'react-hook-form'

import api from '../../../../../Api/api'
import { METHODS_API } from '../../../../../Api/constantsApi'
import { showToast } from '../../../../../helpers/toast'
import { queryClient } from '../../../../../routes/AppRouter'

export const useServiceClient = () => {
	const { register, handleSubmit, control, watch } = useForm()
	const [dateStart, setDateStart] = useState(dayjs('2024-04-17T15:30'))
	const [dateEnd, setDateEnd] = useState(dayjs('2024-04-17T15:30'))
	const [open, setOpen] = useState(false)
	const idRoute = useWatch({
		control,
		id_route: null
	})

	const handleOpen = () => setOpen(!open)

	const getDataTableServiceClient = (page, search) =>
		useQuery({
			queryKey: ['getDataTableServiceClient', page, search],
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

	const dataPreCreateService = getDataPreCreateService()

	const getDataRoute = (idRoute) => {
		return useQuery({
			queryKey: ['getDataRoute', idRoute],
			queryFn: async () => await api(METHODS_API.GET, `module/routing/find/${idRoute}`),
			enabled: !!idRoute
		})
	}

	const { data } = getDataRoute(idRoute?.id_route ? idRoute?.id_route : null)

	const createServiceClient = useMutation({
		mutationFn: async (data) => await api(METHODS_API.POST, `module/service/travel-client/create`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postCreateServiceClient'] })
	})

	const handleCreateServiceClient = async (data) => {
		const response = await createServiceClient.mutateAsync(data)
		response.completed && showToast('Se a creado de manera exito el servicio', 'success')
		response?.error && showToast('❌ Algo ha salido mal al enviar el comando :' + response?.message, 'error')
	}

	const handleCreateService = (data) => {
		data.date_end = format(dateStart.$d, 'yyyy-MM-dd hh:mm:ss')
		data.date_start = format(dateEnd.$d, 'yyyy-MM-dd hh:mm:ss')
		data.information_aditional = [{}]

		const typeDevice = dataPreCreateService?.data?.data?.types_devices.find((e) => e._id === data.type_device._id)
		const typeService = dataPreCreateService?.data?.data?.types_services.find(
			(e) => e._id === data.type_service._id
		)

		data.type_device = typeDevice
		data.type_service = typeService

		handleCreateServiceClient(data)
	}

	return {
		open,
		data,
		register,
		handleOpen,
		getDataRoute,
		handleSubmit,
		handleCreateService,
		setDateEnd,
		setDateStart,
		dataPreCreateService,
		getDataTableServiceClient,
		handleCreateServiceClient
	}
}
