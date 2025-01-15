import { METHODS_API } from '@/Api/constantsApi'
import { useApi } from '@/Api/useApi'
import { queryClient } from '@/routes/AppRouter'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export const useCreateProfile = () => {
	const { requestApi } = useApi()
	const { register, handleSubmit } = useForm()

	const getDataPreCreateProfile = () =>
		useQuery({
			queryKey: ['getDataPreCreateProfile'],
			queryFn: async () => await requestApi(METHODS_API.GET, 'module/profiles/info-for-create')
		})

	const dataPreCreate = getDataPreCreateProfile()

	const createProfile = useMutation({
		mutationFn: async (data) => await requestApi(METHODS_API.POST, `module/profiles/create`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postCreateProfile'] })
	})

	const handleCreateProfile = async (data) => {
		const response = await createProfile.mutateAsync(data)
		console.log(response)
		response?.completed && showToast('Se a creado de manera exito la politica', 'success')
		response?.error && showToast('❌ Algo ha salido mal al momento de crear la' + response?.message, 'error')
	}

	return { dataPreCreate, register, handleSubmit, handleCreateProfile }
}
