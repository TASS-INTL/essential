import React from 'react'

import { Route, Routes, useLocation } from 'react-router-dom'

import { ForgotPassword } from '../pages/auth/ForgotPassword'
import { Login } from '../pages/auth/Login'
import { PersonalData } from '../pages/auth/PersonalData'
import { Register } from '../pages/auth/Register'
import { ValidateCode } from '../pages/auth/ValidateCode'
import { userStore } from '../store/userStore'

const PublicRouter = {
	login: 'login',
	register: 'register',
	PersonalData: 'personal-data',
	validateCode: 'validate-code',
	forgotPassword: 'forgot-password'
}

export const AuthRouter = () => {
	const location = useLocation()
	const {
		userData: { tokenRegister }
	} = userStore()

	if (location.pathname === '/auth/personal-data' && tokenRegister === null) {
		return <Login />
	}

	return (
		<Routes>
			<Route path={PublicRouter.login} element={<Login />} />
			<Route path={PublicRouter.register} element={<Register />} />
			<Route path={PublicRouter.validateCode} element={<ValidateCode />} />
			<Route path={PublicRouter.PersonalData} element={<PersonalData />} />
			<Route path={PublicRouter.forgotPassword} element={<ForgotPassword />} />
		</Routes>
	)
}
