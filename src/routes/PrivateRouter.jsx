import { Navigate, Route, Routes } from 'react-router-dom'

import { SideBarComponent } from '../Components'
import { pathNavigation } from '../pages/auth/constants'
import {
	AccountScreen,
	ChatScreen,
	DashboardScreen,
	DetailInventoryScreen,
	DevicesScreen,
	FactoryDevicesScreen,
	GroupScreen,
	InventoryScreen,
	NotificationScreen,
	SettingsScreen,
	TestingScreen,
	UsersScreen
} from '../pages/PrivateRoutes'
import { Events } from '../pages/PrivateRoutes/Inventory/Events'
import { General } from '../pages/PrivateRoutes/Inventory/General'
import { TableInventory } from '../pages/PrivateRoutes/Inventory/TableInventory'
import { Test } from '../pages/PrivateRoutes/Inventory/Test'
import { Travels } from '../pages/PrivateRoutes/Inventory/Travels'
import { conectionNameSpace, SocketForNameSpace } from '../pages/PrivateRoutes/sockets/socketForNameSpace'
import { SocketProvider } from '../pages/PrivateRoutes/sockets/socketProvider'
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

					<Route
						path={routesPrivate.InventoryScreen}
						element={
							<SocketForNameSpace type={conectionNameSpace.device}>
								<InventoryScreen />
							</SocketForNameSpace>
						}
					>
						<Route index path='table' element={<TableInventory />} />
						<Route index path='general' element={<General />} />
						<Route path='test' element={<Test />} />
						<Route path='events' element={<Events />} />
						<Route path='travels' element={<Travels />} />
						<Route path={routesPrivate.DetailInventoryScreen} element={<DetailInventoryScreen />} />
					</Route>

					<Route path={routesPrivate.settingsScreen} element={<SettingsScreen />} />
					<Route path={routesPrivate.dashboardScreen} element={<DashboardScreen />} />
					<Route path={routesPrivate.notificationScreen} element={<NotificationScreen />} />
					<Route path={routesPrivate.FactoryDevicesScreen} element={<FactoryDevicesScreen />} />
				</Routes>
			</div>
		</SocketProvider>
	)
}
