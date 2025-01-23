import { METHODS_API } from '@/Api/constantsApi'
import { useApi } from '@/Api/useApi'
import { userStore } from '@/store/userStore'
import { userMasterRegisterStore } from '@/store/users/userMasterRegisterStore'
import { userLoginStore } from '@/store/users/userLoginStore'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { pathNavigation } from '../constants'

export const useAuthProvider = () => {
	const navigate = useNavigate()
	const { requestApi } = useApi()
	const userData = userStore((state) => state.userData)
	const userMasterRegister = userMasterRegisterStore((state) => state)
	const userLogin = userLoginStore((state) => state)
	const setUserData = userStore((state) => state.setUserData)

	const setFieldChangeUserMasterRegisterStore = (field, value) => {
		userMasterRegister.setField(field, value)
	}

	const setFieldChangeUserLoginStore = (field, value) => {
		userLogin.setField(field, value)
	}

	const resetFieldsUserMasterRegisterStore = () => {
		userMasterRegister.setField('email', '')
		userMasterRegister.setField('username', '')
		userMasterRegister.setField('token', '')
		userMasterRegister.setField('code', '')
		userMasterRegister.setField('validated', false)
	}

	const login = async ({ email, password }) => {
		const response = await requestApi(METHODS_API.POST, 'auth2/login', {
			email,
			password
		})

		if (response?.completed) {
			if (response?.type_ === 'SingInCompleted') {
				localStorage.setItem('token', response?.data?.token)
				setUserData({
					...userData,
					logged: true,
					checking: false,
					uid: response?.data?._id,
					name: response?.data?.name,
					email: response?.data?.email,
					state: response?.data?.state,
					userName: response?.data?.username,
					tokenSesion: response?.data?.token,
					modules: response?.data?.user_policies?.modules,
					typeUser: response?.data?.type_master
				})
			} else {
				localStorage.setItem('token', response?.data?.token)
				setFieldChangeUserLoginStore('email', email)
				setFieldChangeUserLoginStore('token', response?.data?.token)
				
				// setUserData({
				// 	...userData,
				// 	checking: false,
				// 	email,
				// 	tokenSesion: response?.data?.token
				// })
				navigate(pathNavigation.validateCode)
			}
		}
		return response
	}

	const ValidateCodeRegisterApi = async ({ code }) => {
		// const { email, tokenSesion, userName } = userData

		const email = userMasterRegister.email
		const userName = userMasterRegister.username

		const dataSend = {
			code,
			email,
			username: userName
		}
		const response = await requestApi(
			METHODS_API.POST,
			'singup/start/code',
			dataSend
		)

		

		if (response?.completed) {

			setFieldChangeUserMasterRegisterStore('validated', true)
			setFieldChangeUserMasterRegisterStore('token', response?.data?.key_process)
			navigate(pathNavigation.personalData)
		}
		return response
	}

	const ValidateCodeApi = async ({ code }) => {
		const { email, token } = userLogin

		const dataSend = {
			code,
			email
		}

		const response = await requestApi(
			METHODS_API.POST,
			`auth2/login/validateCode?to=${token}`,
			dataSend
		)

		if (response?.completed) {

			localStorage.setItem('token', response?.data?.token)
			setUserData({
				...userData,
				logged: true,
				checking: false,
				uid: response?.data?._id,
				name: response?.data?.name,
				email: response?.data?.email,
				state: response?.data?.state,
				userName: response?.data?.username,
				tokenSesion: response?.data?.token,
				typeUser: response?.data?.type_master,
				modules: response?.data?.user_policies.modules
			})
		}
		return response
	}

	const registerPersonalData = async (personalData) => {
		const { token } = userMasterRegister
		const response = await requestApi(METHODS_API.POST, `singup/finalized/?to=${token}`, personalData)
		if (response.completed) {
			resetFieldsUserMasterRegisterStore()
			navigate(pathNavigation.login)
		}
		return response
	}

	const registerNameAndUserName = async ({ email, username }) => {
		const response = await requestApi(METHODS_API.POST, 'singup/start/email', {
			email,
			username
		})

		if (response?.completed) {
			setFieldChangeUserMasterRegisterStore('email', email)
			setFieldChangeUserMasterRegisterStore('username', username)
			navigate(pathNavigation.validateCodeRegister)
		}
		return response
	}

	const verifyToken = async (state, setUserData) => {
		//  const token = await localStorage.getItem('token')
		//   if (!token) {
		//     setUserData({
		//       uid: null,
		//       checking: false,
		//       logged: false,
		//       name: null,
		//       email: null,
		//     });
		//    return false;
		//  }
		//  const res = await fetchWitchToken("/auth/renow");
		//  if (!res.ok) {
		//    setAuth({
		//      uid: null,
		//      checking: false,
		//      logged: false,
		//      name: null,
		//      email: null,
		//    });
		//    return false;
		//  }
		//  localStorage.setItem("token", res.token);
		//  setAuth({
		//    uid: res.user.uid,
		//    checking: false,
		//    logged: true,
		//    name: res.user.name,
		//    email: res.user.email,
		//  });
		//  return;
	}

	const resendCode = async () => {
		const { email, tokenSesion } = userData
		const response = await requestApi(METHODS_API.POST, 'auth2/login/resendCode', {
			email,
			token: tokenSesion
		})

		return response
	}

	const forgotPassword = async ({ email }) => {
		const response = await requestApi(METHODS_API.GET, `auth2/resetPassword/${email}`, {
			email
		})

		return response
	}

	const logout = async () => {
		const response = await requestApi(METHODS_API.POST, 'auth2/logout')

		if (response?.completed || response?.type_ === 'ErrorServerGetCurrentSession') {
			setUserData({
				uid: null,
				name: null,
				email: null,
				logged: false,
				userName: null,
				checking: false,
				tokenSesion: null,
				modules: null,
				typeUser: null
			})
			localStorage.removeItem('token')
		}
	}

	const queryUserToken = () =>
		useQuery({
			queryKey: ['userHasToken'],
			queryFn: async () => await requestApi(METHODS_API.GET, `auth2/validate-session`)
		})

	return {
		login,
		logout,
		resendCode,
		verifyToken,
		forgotPassword,
		ValidateCodeApi,
		registerPersonalData,
		registerNameAndUserName,
		queryUserToken,
		ValidateCodeRegisterApi
	}
}
