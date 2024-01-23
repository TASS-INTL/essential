import { useState } from 'react'

import api from '@/Api/api'
import { constantsApi } from '@/Api/constantsApi'
import { useMutation, useQuery } from '@tanstack/react-query'

import { queryClient } from '../../../main'

const initialStateEmpty = {
	name: '',
	username: '',
	email: '',
	address: ' ',
	country: '',
	region: '',
	city: '',
	id_policies: '',
	id_type_user: '',
	type_document_personal: '',
	number_document_personal: '',
	key: '',
	phone_number: {
		code: '+57',
		number: '123456789'
	}
}

export const useUsers = () => {
	const [inputs, setInputs] = useState(initialStateEmpty)

	const handleValuesCreateUser = (key, value) => {
		setInputs({
			...inputs,
			[key]: value
		})
	}

	const fetchDataUser = () =>
		useQuery({
			queryKey: ['getUserList'],
			queryFn: async () => await api(constantsApi.GET, 'module/users')
		})

	const createUser = useMutation({
		mutationFn: async (data) => await api(constantsApi.POST, 'module/users/create', data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getUserList'] })
	})

	const deleteUser = useMutation({
		mutationFn: async (idUser) => await api(constantsApi.DELETE, `module/users/delete/${idUser}`),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getUserList'] })
	})

	const updateUser = useMutation({
		mutationFn: async ({ idUser, data }) => await api(constantsApi.PUT, `module/users/update/${idUser}`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['getUserList'] })
	})

	const handleCreateUser = async (event) => {
		event.preventDefault()
		const newUser = inputs
		await createUser.mutateAsync(newUser)
	}

	const handleDeleteUser = async (idUserDelete) => {
		await deleteUser.mutateAsync(idUserDelete)
	}

	const handleUpdateUser = async (event) => {
		event.preventDefault()
		delete inputs.created_at
		delete inputs.updated_at
		await updateUser.mutateAsync({ idUser: inputs._id, data: inputs })
	}

	return {
		inputs,
		fetchDataUser,
		handleValuesCreateUser,
		handleCreateUser,
		handleDeleteUser,
		setInputs,
		handleUpdateUser
	}
}
