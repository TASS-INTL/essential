import React from 'react'

import { ForgotPasswordScreen, LoginScreen, PersonalDataScreen, RegisterScreen, ValidateCodeScreen } from '@/pages/auth'
import { ValidateCodeRegisterScreen } from '@/pages/auth/ValidateCodeRegisterScreen'
import { pathNavigation } from '@/pages/auth/constants'
import { userStore } from '@/store/userStore'
import { userMasterRegisterStore } from '@/store/users/userMasterRegisterStore'

import { Route, Routes, useLocation } from 'react-router-dom'

import { RoutesPublic } from './constants'

export const AuthRouter = () => {
	const location = useLocation()
	const { tokenRegister } = userStore((state) => state.userData)
	const userMasterRegister = userMasterRegisterStore((state) => state)

	
	if (location.pathname === pathNavigation.personalData && userMasterRegister.token === '') {
		console.log('tokenRegister', userMasterRegister.token)
		return <LoginScreen />
	}

	return (
		<Routes>
			<Route path={RoutesPublic.loginScreen} element={<LoginScreen />} />
			<Route path={RoutesPublic.registerScreen} element={<RegisterScreen />} />
			<Route path={RoutesPublic.validateCodeRegisterScreen} element={<ValidateCodeRegisterScreen />} />
			<Route path={RoutesPublic.validateCodeScreen} element={<ValidateCodeScreen />} />
			<Route path={RoutesPublic.PersonalDataScreen} element={<PersonalDataScreen />} />
			<Route path={RoutesPublic.forgotPasswordScreen} element={<ForgotPasswordScreen />} />
		</Routes>
	)
}
