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
	NotificationScreen,
	SettingsScreen,
	TestingScreen,
	UsersScreen
} from '../pages/PrivateRoutes'
import {
	Device,
	Events,
	General,
	InventoryScreen,
	TableInventory,
	Test,
	Travels
} from '../pages/PrivateRoutes/Inventory'
import { DetailNotification } from '../pages/PrivateRoutes/Notification/DetailNotification'
import { TableNotification } from '../pages/PrivateRoutes/Notification/TableNotification'
import { CreateService, Services, Table } from '../pages/PrivateRoutes/Services'
import { CONNECTION_NAME_SPACE } from '../pages/PrivateRoutes/sockets/constants'
import { SocketForNameSpace } from '../pages/PrivateRoutes/sockets/socketForNameSpace'
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
					<Route path={routesPrivate.ServicesScreen} element={<Services />}>
						<Route index path='table' element={<Table />} />
						<Route index path='create-service' element={<CreateService />} />
					</Route>
					<Route path={routesPrivate.usersScreen} element={<UsersScreen />} />
					<Route path={routesPrivate.groupScreen} element={<GroupScreen />} />
					<Route path={routesPrivate.TestingScreen} element={<TestingScreen />} />
					<Route path={routesPrivate.accountScreen} element={<AccountScreen />} />
					<Route path={routesPrivate.devicesScreen} element={<DevicesScreen />} />
					<Route
						path={routesPrivate.InventoryScreen}
						element={
							<SocketForNameSpace nameSpace={CONNECTION_NAME_SPACE.DEVICE}>
								<InventoryScreen />
							</SocketForNameSpace>
						}
					>
						<Route index path='table' element={<TableInventory />} />

						<Route path='device/:idDevice' element={<Device />}>
							<Route index path='general' element={<General />} />
							<Route path='test' element={<Test />} />
							<Route path='events' element={<Events />} />
							<Route path='travels' element={<Travels />} />
						</Route>
					</Route>
					<Route path={routesPrivate.settingsScreen} element={<SettingsScreen />} />
					<Route path={routesPrivate.dashboardScreen} element={<DashboardScreen />} />
					<Route path={routesPrivate.notificationScreen} element={<NotificationScreen />}>
						<Route index path='table' element={<TableNotification />} />
						<Route path=':idNotification' element={<DetailNotification />} />
					</Route>
					<Route path={routesPrivate.FactoryDevicesScreen} element={<FactoryDevicesScreen />} />
				</Routes>
			</div>
		</SocketProvider>
	)
}
