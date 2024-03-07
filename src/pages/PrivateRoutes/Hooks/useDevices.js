import { useMutation, useQuery } from '@tanstack/react-query'

import api from '../../../Api/api'
import { constantsApi } from '../../../Api/constantsApi'
import { showToast } from '../../../helpers/toast'
import { queryClient } from '../../../routes/AppRouter'

export const useDevice = () => {
	const createDevice = useMutation({
		mutationFn: async (data) => await api(constantsApi.POST, 'module/device/assign', data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postDevice'] })
	})

	const handleCreateUser = async (data, event) => {
		event.preventDefault()
		const assignDevice = data
		const response = await createDevice.mutateAsync(assignDevice)
		if (response.completed) {
			showToast(
				'Se a enviado la asignacion al sistema en un momento podra validar esa informacion en el apartado de notificaciones',
				'warning'
			)
			setModalVisible(false)
		}
		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
	}

	return {
		handleCreateUser
	}
}
