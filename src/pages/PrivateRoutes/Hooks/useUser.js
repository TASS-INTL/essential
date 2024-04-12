import api from '@/Api/api'
import { METHODS_API } from '@/Api/constantsApi'
import { showToast } from '@/helpers/toast'
import { usersStore } from '@/store/usersStore'
import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '../../../routes/AppRouter'

export const useUsers = () => {
	const setModalVisible = usersStore((state) => state.setModalVisible)

	const fetchDataUser = () =>
		useQuery({
			queryKey: ['getUserList'],
			queryFn: async () => await api(METHODS_API.GET, 'module/users')
		})

	const createUser = useMutation({
		mutationFn: async (data) => await api(METHODS_API.POST, 'module/users/create', data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getUserList'] })
	})

	const deleteUser = useMutation({
		mutationFn: async (idUser) => await api(METHODS_API.DELETE, `module/users/delete/${idUser}`),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getUserList'] })
	})

	const updateUser = useMutation({
		mutationFn: async ({ idUser, data }) => await api(METHODS_API.PUT, `module/users/update/${idUser}`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getUserList'] })
	})

	const handleCreateUser = async (data, event) => {
		event.preventDefault()
		const newUser = data
		const response = await createUser.mutateAsync(newUser)
		if (response.completed) {
			showToast('Se a Creado el usuario de manera exitosa', 'success')
			setModalVisible(false)
		}
		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
	}

	const handleDeleteUser = async (idUserDelete) => {
		const response = await deleteUser.mutateAsync(idUserDelete)
		response.completed && showToast('Se a Eliminado el usuario de manera exitosa', 'success')
		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
	}

	const handleUpdateUser = async (data, event) => {
		event.preventDefault()

		const response = await updateUser.mutateAsync({ idUser: data._id, data: data })
		if (response.completed) {
			showToast('Se a Actualizado el usuario de manera exitosa', 'success')
			setModalVisible(false)
		}
		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
	}

	return {
		fetchDataUser,
		handleCreateUser,
		handleDeleteUser,
		handleUpdateUser
	}
}
