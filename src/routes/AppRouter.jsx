import React, { useEffect } from 'react'

import { Route, Routes } from 'react-router-dom'

import { useAuthProvider } from '../auth/useAuthProvider'
import { Loader } from '../Components'
import { Landing } from '../pages/LandingPage'
import { userStore } from '../store/userStore'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'

export const AppRouter = () => {
	const setUserData = userStore((state) => state.setUserData)
	const userData = userStore((state) => state.userData)

	const { verifyToken } = useAuthProvider()

	useEffect(() => {
		verifyToken(userData, setUserData)
	}, [userData.logged])

	if (userData.checking) return <Loader />

	return (
		<Routes>
			<Route path='/' element={<Landing />} />
			<Route path='/auth/*' element={<PublicRouter isAuthenticated={userData.logged} />} />
			<Route path='/user/*' element={<PrivateRouter isAuthenticated={userData.logged} />} />
		</Routes>
	)
}
