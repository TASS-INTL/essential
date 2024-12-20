import { useEffect, useState } from 'react'

import { METHODS_API } from '@/Api/constantsApi'
import { useApi } from '@/Api/useApi'
import { showToast } from '@/helpers/toast'
import { queryClient } from '@/routes/AppRouter'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export const useCreatePolicie = () => {
	const { requestApi } = useApi()
	const { register, handleSubmit } = useForm()

	const [dataProcessinForCreatePolicies, setDataProcessinForCreatePolicies] = useState(null)

	const getDataPreCreatePolicies = () =>
		useQuery({
			queryKey: ['getDataPreCreatePolicies'],
			queryFn: async () => await requestApi(METHODS_API.GET, `module/policies/info-for-create`)
		})

	const dataPreCreatePolicie = getDataPreCreatePolicies()

	const handleProccessingModules = (modules) => {
		const dataProcessingModules = modules?.map((modules) => {
			const subModulesNews = modules.submodules?.map((submodules) => {
				return {
					...submodules,
					isActive: false
				}
			})
			return {
				...modules,
				isActive: false,
				submodules: subModulesNews || []
			}
		})
		setDataProcessinForCreatePolicies(dataProcessingModules)
	}

	useEffect(() => {
		if (dataPreCreatePolicie.isFetched) {
			handleProccessingModules(dataPreCreatePolicie?.data?.data?.modules)
		}
	}, [dataPreCreatePolicie?.data?.data?.modules])

	const createPolicies = useMutation({
		mutationFn: async (data) => await requestApi(METHODS_API.POST, `module/policies/create`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postCreatePolicie'] })
	})

	const handleCreatePolicies = async (data) => {
		console.log('data -->', data)
		const dataSend = {
			...data,
			modules: dataProcessinForCreatePolicies
		}

		const response = await createPolicies.mutateAsync(dataSend)

		console.log(response)
		response?.completed && showToast('Se a creado de manera exito la politica', 'success')
		response?.error && showToast('❌ Algo ha salido mal al momento de crear la' + response?.message, 'error')
	}

	const handleCheckboxChange = (event, idModule) => {
		const newArray = dataProcessinForCreatePolicies.map((item) =>
			item._id === idModule ? { ...item, isActive: event.target.checked } : item
		)
		setDataProcessinForCreatePolicies(newArray)
	}

	const handleCheckboxChangeSubItem = (event, idModule, idSubModule) => {
		const newArray = dataProcessinForCreatePolicies.map((item) => {
			if (item._id === idModule) {
				const newSubItemms = item.submodules.map((subItem) =>
					subItem._id === idSubModule ? { ...subItem, isActive: event.target.checked } : subItem
				)
				item.submodules = newSubItemms
			}
			return { ...item }
		})
		setDataProcessinForCreatePolicies(newArray)
	}

	return {
		dataPreCreatePolicie,
		dataProcessinForCreatePolicies,
		setDataProcessinForCreatePolicies,
		register,
		handleSubmit,
		handleCreatePolicies,
		handleCheckboxChange,
		handleCheckboxChangeSubItem
	}
}
