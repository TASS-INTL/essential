import { Navigate, Route, Routes } from 'react-router-dom'

import { SideBarComponent } from '../Components'
import { pathNavigation } from '../pages/auth/constants'
import {
	AccountScreen,
	ChatScreen,
	DashboardScreen,
	DevicesScreen,
	FactoryDevicesScreen,
	GroupScreen,
	InventoryScreen,
	NotificationScreen,
	SettingsScreen,
	TestingScreen,
	UsersScreen
} from '../pages/PrivateRoutes'
import { SocketProvider } from '../pages/PrivateRoutes/socketNotification/socketProvider'
import { routesPrivate } from './constants'

export const PrivateRouter = ({ isAuthenticated }) => {
	return isAuthenticated ? <RoutesPrivate /> : <Navigate to={pathNavigation.login} />
}

export const RoutesPrivate = () => {
	return (
		<SocketProvider>
			<div className='flex'>
				<SideBarComponent />
				<Routes>
					<Route path={routesPrivate.chatScreen} element={<ChatScreen />} />
					<Route path={routesPrivate.usersScreen} element={<UsersScreen />} />
					<Route path={routesPrivate.groupScreen} element={<GroupScreen />} />
					<Route path={routesPrivate.TestingScreen} element={<TestingScreen />} />
					<Route path={routesPrivate.accountScreen} element={<AccountScreen />} />
					<Route path={routesPrivate.devicesScreen} element={<DevicesScreen />} />
					<Route path={routesPrivate.InventoryScreen} element={<InventoryScreen />} />
					<Route path={routesPrivate.settingsScreen} element={<SettingsScreen />} />
					<Route path={routesPrivate.dashboardScreen} element={<DashboardScreen />} />
					<Route path={routesPrivate.notificationScreen} element={<NotificationScreen />} />
					<Route path={routesPrivate.FactoryDevicesScreen} element={<FactoryDevicesScreen />} />
				</Routes>
			</div>
		</SocketProvider>
	)
}
