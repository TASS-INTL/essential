import { useState } from 'react'

import api from '@/Api/api'
import { METHODS_API } from '@/Api/constantsApi'
import { calculateCircle } from '@/helpers/routes'
import { showToast } from '@/helpers/toast'
import { initialDataLocation } from '@/pages/PrivateRoutes/constants/constants'
import { queryClient } from '@/routes/AppRouter'
import { useMutation, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import { useForm, useWatch } from 'react-hook-form'

import { useTravels } from './useTravels'

export const useCreateTravel = (dataForm) => {
	const { register, handleSubmit, control } = useForm(dataForm)
	const [selectedPlace, setSelectedPlace] = useState(null)
	const [dateEnd, setDateEnd] = useState(dayjs('2024-04-17T15:30'))
	const [dateStart, setDateStart] = useState(dayjs('2024-04-17T15:30'))
	const { getDataPreCreateTravel } = useTravels()
	const dataPreCrateTravel = getDataPreCreateTravel()
	const [objectLocations, setObjectLocations] = useState(initialDataLocation)

	const idService = useWatch({
		control,
		service: {
			_id: null
		}
	})

	// Adding places location start and location end
	const addPlaces = ({ location, data }) => {
		const { geometry } = calculateCircle(data?.geometry?.location?.lat(), data?.geometry?.location?.lng())
		setSelectedPlace(data)
		setObjectLocations((state) => ({
			...state,
			[location]: {
				location: geometry,
				permissions: null,
				name: data?.formatted_address,
				info: { status: location === 'location_start' ? 'current' : 'created', order: 1 },
				market: {
					location: {
						type: 'Point',
						coordinates: [data?.geometry?.location?.lng(), data?.geometry?.location?.lat()]
					},
					status: 'create'
				}
			}
		}))
	}
	//
	const getDataService = (idService) => {
		return useQuery({
			queryKey: ['getDataRoute', idService],
			queryFn: async () => await api(METHODS_API.GET, `module/service/${idService}/routing`),
			enabled: !!idService
		})
	}
	//
	const serviceRouteInformation = getDataService(idService?.service?._id ? idService?.service?._id : null)

	// change permissions
	const handleChangePermissionsForLocationStartAndEnd = ({ location, permissions }) => {
		setObjectLocations((state) => ({
			...state,
			[location]: {
				...state[location],
				permissions
			}
		}))
	}

	// change values merker when draggable is activate
	const handleChangeMarkerDraggable = ({ location, data }) => {
		setObjectLocations((state) => ({
			...state,
			[location]: {
				...state[location],
				market: {
					location: {
						type: 'Point',
						coordinates: [data?.lng, data?.lat]
					},
					status: 'create'
				}
			}
		}))
	}

	const createTravelMutation = useMutation({
		mutationFn: async (data) => await api(METHODS_API.POST, `module/travel/create`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postCreateServiceClient'] })
	})

	const createTravel = async (data) => {
		const response = await createTravelMutation.mutateAsync(data)
		response?.completed && showToast('Se a creado de manera exito el servicio', 'success')
		response?.error && showToast('❌ Algo ha salido mal al enviar el comando :' + response?.message, 'error')
	}

	const handleCreateTravel = (data) => {
		const service = dataPreCrateTravel.data.data.services.find((item) => item._id === data.service._id)
		const installer = dataPreCrateTravel.data.data.installers.find(
			(item) => item._id === data.installers.id_installer
		)
		const typeTravel = dataPreCrateTravel.data.data.types_travel.find((item) => item._id === data.type._id)

		const typeOperationInstaller = dataPreCrateTravel.data.data.type_operations.find(
			(item) => item._id === data.installers.type_operation
		)

		const serviceSend = {
			_id: service._id,
			did: service.did,
			status: service.status
		}

		const sendInstaller = {
			_id: installer._id,
			name: installer.name,
			status: 'CREATED',
			type_operation: typeOperationInstaller.name
		}

		data.date_installation = format(dateStart.$d, 'yyyy-MM-dd hh:mm:ss')
		data.date_finalization = format(dateEnd.$d, 'yyyy-MM-dd hh:mm:ss')
		data.location_installation = objectLocations.location_start
		data.location_finalization = objectLocations.location_end
		data.service = serviceSend
		data.installers = [sendInstaller]
		data.type = typeTravel
		data.periods = {
			tx: 10,
			sensing: 10
		}

		if (data.location_installation && data.location_finalization) {
			createTravel(data)
		}
	}

	return {
		dateEnd,
		register,
		dateStart,
		addPlaces,
		setDateEnd,
		setDateStart,
		handleSubmit,
		selectedPlace,
		objectLocations,
		handleCreateTravel,
		dataPreCrateTravel,
		serviceRouteInformation,
		handleChangeMarkerDraggable,
		handleChangePermissionsForLocationStartAndEnd
	}
}
