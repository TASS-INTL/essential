import api from '@/Api/api'
import { constantsApi } from '@/Api/constantsApi'
import { showToast } from '@/helpers/toast'
import { usersStore } from '@/store/usersStore'

export const useUsers = () => {
	const setUserData = usersStore((state) => state.setUserData)

	const getUserData = async () => {
		const response = await api(constantsApi.GET, 'module/users')
		console.log(response)
		if (response?.completed) {
			setUserData({
				users: response.data[0].users,
				policy: response.data[0].policy,
				policies: response.data[0].policies,
				types_profiles: response.data[0].types_profiles
			})
		}
		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
	}

	const createUser = async (data) => {
		const response = await api(constantsApi.POST, 'module/users', data)
		if (response?.completed) {
			showToast('✅ Usuario creado correctamente', 'success')
		}
		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
	}

	return { getUserData, createUser }
}
