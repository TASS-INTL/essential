import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import { useForm, useWatch } from 'react-hook-form'

import api from '../../../../../Api/api'
import { METHODS_API } from '../../../../../Api/constantsApi'
import { calculateCircle } from '../../../../../helpers/routes'
import { initialDataLocation } from '../../../constants/constants'
import { useTravels } from './useTravels'

export const useCreateTravel = (dataForm) => {
	const { register, handleSubmit, control, watch } = useForm(dataForm)

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

	const handleCreateTravel = (data) => {
		const service = dataPreCrateTravel.data.data.services.find((item) => item._id === data.service._id)
		const installer = dataPreCrateTravel.data.data.installers.find(
			(item) => item._id === data.installer.id_installer
		)
		const typeTravel = dataPreCrateTravel.data.data.types_travel.find((item) => item._id === data.type._id)

		const typeOperationInstaller = dataPreCrateTravel.data.data.type_operations.find(
			(item) => item._id === data.installer.type_operation
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
		data.installer = sendInstaller
		data.type = typeTravel
		data.periods = {
			tx: 2,
			sensing: ''
		}

		console.log('data send -->', data)

		const sendDataTravel = {
			location_installation: {
				location: {
					type: 'Polygon',
					coordinates: []
				},
				permissions: [],
				name: 'Sta. Barbara-Caldas, Caldas, Antioquia, Colombia',
				market: {
					location: {
						type: 'Point',
						coordinates: [6.067265199999999, -75.63417930000001]
					},
					status: 'create'
				}
			}, // ✅
			location_finalization: {
				location: {
					type: 'Polygon',
					coordinates: []
				},
				permissions: [],
				name: 'Sta. Barbara-Caldas, Caldas, Antioquia, Colombia',
				market: {
					location: {
						type: 'Point',
						coordinates: [6.067265199999999, -75.63417930000001]
					},
					status: 'create'
				}
			}, // ✅
			service: {
				_id: '',
				did: '',
				status: ''
			}, // ✅
			installers: {
				_id: '',
				name: '',
				status: '',
				type_operation: ''
			}, // ✅
			type: {
				_id: '',
				name: ''
			}, // ✅
			remarks: '', // ✅
			periods: {
				tx: 2,
				sensing: ''
			} // ✅
		}
	}

	const getDataService = (idService) => {
		return useQuery({
			queryKey: ['getDataRoute', idService],
			queryFn: async () => await api(METHODS_API.GET, `module/service/${idService}/routing`),
			enabled: !!idService
		})
	}

	const serviceRouteInformation = getDataService(idService?.service?._id ? idService?.service?._id : null)

	// change permissions
	const handleChangePermissions = ({ location, permissions }) => {
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
		handleChangePermissions,
		handleChangeMarkerDraggable
	}
}
