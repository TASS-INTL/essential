import { useState } from 'react'

import { METHODS_API } from '@/Api/constantsApi'
import { useApi } from '@/Api/useApi'
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
	const { requestApi } = useApi()
    const [selectedInstallers, setSelectedInstallers] = useState([])
	const [idService, setIdService] = useState(null)
	const { register, handleSubmit, control } = useForm(dataForm)
	const [selectedPlace, setSelectedPlace] = useState(null)
	const [dateEnd, setDateEnd] = useState(dayjs('2024-04-17T15:30'))
	const [dateStart, setDateStart] = useState(dayjs('2024-04-17T15:30'))
	const { getDataPreCreateTravel } = useTravels()
	const dataPreCrateTravel = getDataPreCreateTravel()
	const [objectLocations, setObjectLocations] = useState(initialDataLocation)

	// const idService = useWatch({
	// 	control,
	// 	service: {
	// 		_id: null
	// 	}
	// })

	// Adding places location start and location end
	const addPlaces = ({ location, data, radius }) => {
		const { geometry } = calculateCircle({
			lat: data?.geometry?.location?.lat(),
			lng: data?.geometry?.location?.lng(),
			radius
		})
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
		console.log(`GETDATASERVICE ${idService}`)
		return useQuery({
			queryKey: ['getDataRoute', idService],
			queryFn: async () => await requestApi(METHODS_API.GET, `module/service/${idService}/routing`),
			enabled: !!idService
		})
	}

	// const { serviceRouteInformation, isLoading } = useQuery({
	// 	queryKey: ['getDataInfoRegister', idService],
	// 	queryFn: async () => {
	// 		if(idService){
	// 			return await requestApi(METHODS_API.GET, `module/service/${idService}/routing`)
	// 		}
	// 	}
	// })
	// console.log(`SERVICE ROUTE INFORMATION ${JSON.stringify(serviceRouteInformation, null, 2)}`)
	//
	const serviceRouteInformation = getDataService(idService)
	console.log("serviceRouteInformation: ", serviceRouteInformation)
	const hendleServiceRoute = (idService) => {
		console.log(`HANDLE SERVICEROUTE ${idService}`)
		setIdService(idService)
	}

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

	const handleChangeRadiusCircle = ({ location, lat, lng, radius }) => {
		const { geometry } = calculateCircle({
			lat,
			lng,
			radius
		})
		setObjectLocations((state) => ({
			...state,
			[location]: {
				...state[location],
				location: geometry
			}
		}))
	}

	const createTravelMutation = useMutation({
		mutationFn: async (data) => await requestApi(METHODS_API.POST, `module/travel/create`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postCreateServiceClient'] })
	})

	const createTravel = async (data) => {
		const response = await createTravelMutation.mutateAsync(data)
		response?.completed && showToast('Se a creado de manera exito el servicio', 'success')
		response?.error && showToast('❌ Algo ha salido mal al enviar el comando :' + response?.message, 'error')
	}

	const handleCreateTravel = (data) => {
		console.log(`HANDLECREATETRAVEL ${JSON.stringify(data, null, 2) }`)
		const service = dataPreCrateTravel.data.data.services.find((item) => item._id === data.service._id)
		console.log(`SERVICE ${JSON.stringify(service, null, 2) }`)
		const installer = selectedInstallers.length > 0 ? selectedInstallers : null
		console.log(`INSTALLER ${JSON.stringify(installer, null, 2) }`)
		const typeTravel = dataPreCrateTravel.data.data.types_travel.find((item) => item._id === data.type._id)

		// const typeOperationInstaller = dataPreCrateTravel.data.data.type_operations.find(
		// 	(item) => item._id === data.installers.type_operation
		// )

		const serviceSend = {
			_id: service._id,
			did: service.did,
			status: service.status
		}

		let sendInstaller = null;
		if(installer){
			sendInstaller = installer.map((item) => {
				const typeOperationInstaller = dataPreCrateTravel.data.data.type_operations.find(
					(itemType) => itemType._id === item.type_operation
				)
				return {
					_id: item._id,
					name: item.name,
					status: 'CREATED',
					type_operation: typeOperationInstaller.name
				}
			})
		}

		data.date_installation = format(dateStart.$d, 'yyyy-MM-dd hh:mm:ss')
		data.date_finalization = format(dateEnd.$d, 'yyyy-MM-dd hh:mm:ss')
		data.location_installation = objectLocations.location_start
		data.location_finalization = objectLocations.location_end
		data.service = serviceSend
		data.installers = sendInstaller
		data.type = typeTravel
		data.periods = {
			tx: 10,
			sensing: 10
		}
		console.log(" Data for create: " + JSON.stringify(data, null, 2))

		if (data.location_installation && data.location_finalization) {
			createTravel(data)
		}
	}

	return {
		dateEnd,
		register,
		handleChangeRadiusCircle,
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
		handleChangePermissionsForLocationStartAndEnd,
		setSelectedInstallers,
		selectedInstallers,
		hendleServiceRoute
	}
}
