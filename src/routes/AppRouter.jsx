import React from 'react'

import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { pathRoutes } from './constants'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'
import { userStore } from '@/store/userStore'

export const queryClient = new QueryClient()

export const AppRouter = () => {
	const { logged } = userStore((state) => state.userData)

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ToastContainer />
				<Routes>
					<Route path={pathRoutes.auth} element={<PublicRouter isAuthenticated={logged} />} />
					<Route path={pathRoutes.user} element={<PrivateRouter isAuthenticated={logged} />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	)
}
