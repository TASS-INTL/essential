import { METHODS_API } from '@/Api/constantsApi'
import { useApi } from '@/Api/useApi'
import { showToast } from '@/helpers/toast'
import { queryClient } from '@/routes/AppRouter'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export const useDevice = () => {
	const { register, handleSubmit } = useForm()
	const { requestApi } = useApi()

	//
	const fetchTypeDevice = () =>
		useQuery({
			queryKey: ['getTypeDevice'],
			queryFn: async () => await requestApi(METHODS_API.GET, 'module/device-factory/get-info')
		})
	//

	const assignDeviceMutate = useMutation({
		mutationFn: async (data) => await requestApi(METHODS_API.POST, 'module/device/assign', data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postDevice'] })
	})

	const handleAssignDevice = async (data, event) => {
		event.preventDefault()
		const assignDevice = data
		const response = await assignDeviceMutate.mutateAsync(assignDevice)
		response.completed && showToast(`${response.message}`, 'warning')
		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
	}

	// Sincronizacion de dispositivo
	const syncDevice = useMutation({
		mutationFn: async (data) => await requestApi(METHODS_API.POST, 'module/device-factory/create', data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postSyncDevice'] })
	})

	const handleSyncDevice = async (data, event) => {
		event.preventDefault()
		const syncDeviceData = data
		const response = await syncDevice.mutateAsync(syncDeviceData)
		if (response.completed) {
			showToast(
				'Se a enviado la sincronizacion al sistema en un momento podra validar esa informacion en el apartado de Inventario',
				'warning'
			)
		}
		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
	}

	return {
		handleAssignDevice,
		handleSyncDevice,
		fetchTypeDevice,
		handleSubmit,
		register
	}
}
