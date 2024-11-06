import api from '@/Api/api'
import { METHODS_API } from '@/Api/constantsApi'
import { showToast } from '@/helpers/toast'
import { queryClient } from '@/routes/AppRouter'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useDevice = () => {
	//
	const fetchTypeDevice = () =>
		useQuery({
			queryKey: ['getTypeDevice'],
			queryFn: async () => await api(METHODS_API.GET, 'module/device-factory/get-info')
		})

	const assignDeviceMutate = useMutation({
		mutationFn: async (data) => await api(METHODS_API.POST, 'module/device/assign', data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postDevice'] })
	})

	const handleAssignDevice = async (data, event) => {
		event.preventDefault()
		const assignDevice = data
		const response = await assignDeviceMutate.mutateAsync(assignDevice)
		if (response.completed) {
			showToast(
				'Se a enviado la asignacion al sistema en un momento podra validar esa informacion en el apartado de notificaciones',
				'warning'
			)
		}
		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
	}

	// Sincronizacion de dispositivo
	const createDevice = useMutation({
		mutationFn: async (data) => await api(METHODS_API.POST, 'module/device-factory/create', data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postCreateDevice'] })
	})

	const handleCreateDevice = async (data, event) => {
		event.preventDefault()

		const response = await createDevice.mutateAsync(data)
		if (response.completed) {
			showToast(`${response.message}`, 'warning')
		}
		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
	}

	return {
		handleAssignDevice,
		handleCreateDevice,
		fetchTypeDevice
	}
}
