import React from 'react'

import { userStore } from '@/store/userStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { pathRoutes } from './constants'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'

export const queryClient = new QueryClient()

export const AppRouter = () => {
	const userData = userStore((state) => state.userData)

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ToastContainer />
				<Routes>
					<Route path={pathRoutes.auth} element={<PublicRouter isAuthenticated={userData.logged} />} />
					<Route path={pathRoutes.user} element={<PrivateRouter isAuthenticated={userData.logged} />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	)
}
