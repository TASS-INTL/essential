import React from 'react'

import { Route, Routes, useLocation } from 'react-router-dom'

import { pathNavigation } from '@/pages/auth/constants'
import { userStore } from '@/store/userStore'
import { RoutesPublic } from './constants'
import { LoginScreen,	ForgotPasswordScreen,PersonalDataScreen,RegisterScreen,ValidateCodeScreen } from '@/pages/auth'

export const AuthRouter = () => {
	const location = useLocation()
	const { tokenRegister } = userStore((state) => state.userData)

	if (location.pathname === pathNavigation.personalData && tokenRegister === null) {
		return <LoginScreen />
	}

	return (
		<Routes>
			<Route path={RoutesPublic.loginScreen} element={<LoginScreen />} />
			<Route path={RoutesPublic.registerScreen} element={<RegisterScreen />} />
			<Route path={RoutesPublic.validateCodeScreen} element={<ValidateCodeScreen />} />
			<Route path={RoutesPublic.PersonalDataScreen} element={<PersonalDataScreen />} />
			<Route path={RoutesPublic.forgotPasswordScreen} element={<ForgotPasswordScreen />} />
		</Routes>
	)
}
