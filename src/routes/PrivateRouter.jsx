import { useContext, useState } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { SideBarComponent } from '../Components'
import Navbar from '../Components/navBar'
import { pathNavigation } from '../pages/auth/constants'
import { Account } from '../pages/PrivateRoutes/ModuleAccount'
import { ChatScreen } from '../pages/PrivateRoutes/ModuleChat'
import { DevicesScreen, FormAssignDevice, TableDevice } from '../pages/PrivateRoutes/ModuleDevices'
import { FactoryDevicesScreen } from '../pages/PrivateRoutes/ModuleFactoryDevices/FactoryDevicesScreen'
import { Installers } from '../pages/PrivateRoutes/ModuleInstallers'
import { Device, Events, General, InventoryScreen, TableInventory, Test } from '../pages/PrivateRoutes/ModuleInventory'
import { MonitoringScreen } from '../pages/PrivateRoutes/ModuleMonitoring/MonitoringScreen'
import { DetailNotification, NotificationScreen, TableNotification } from '../pages/PrivateRoutes/ModuleNotification'
import { ServicesClient, TableServiceClient } from '../pages/PrivateRoutes/ModuleServiceClient'
import { CreateService, Services, Table } from '../pages/PrivateRoutes/ModuleServices'
import { SettingsScreen } from '../pages/PrivateRoutes/ModuleSettings/SettingsScreen'
import { TestingScreen } from '../pages/PrivateRoutes/ModuleTesting/TestingScreen'
import {
	CreateTravel,
	DetailTravel,
	Eventstravel,
	GeneralTravel,
	Monitoring,
	TableTravels,
	Travels
} from '../pages/PrivateRoutes/ModuleTravels'
import { UsersScreen } from '../pages/PrivateRoutes/ModuleUsers/UsersScreen'
import { CONNECTION_NAME_SPACE, SOCKET_EVENTS, SOCKETS_ROOMS } from '../pages/PrivateRoutes/sockets/constants'
import { SocketForNameSpace } from '../pages/PrivateRoutes/sockets/socketForNameSpace'
import { SocketContext, SocketProvider } from '../pages/PrivateRoutes/sockets/socketProvider'
import { deviceStore } from '../store/deviceStore'
import { inventoryStore } from '../store/inventoryStore'
import { travelsStore } from '../store/travelsStore'
import { routesPrivate } from './constants'

export const PrivateRouter = ({ isAuthenticated }) => {
	return isAuthenticated ? (
		<SocketProvider>
			<RoutesPrivate />
		</SocketProvider>
	) : (
		<Navigate to={pathNavigation.login} />
	)
}

export const RoutesPrivate = () => {
	const setArrayTabledevice = deviceStore((state) => state.setArrayTabledevice)
	const setArrayTableInventory = inventoryStore((state) => state.setArrayTableInventory)
	const setArrayTableTravels = travelsStore((state) => state.setArrayTableTravels)
	const { activeMenu } = useContext(SocketContext)

	return (
		<div className='flex relative'>
			<div className='fixed w-full'>
				<Navbar />
				<SideBarComponent />
			</div>
			<Routes>
				{/* Module Chat */}
				<Route path={routesPrivate.chatScreen} element={<ChatScreen />} />
				{/* Module Installers */}
				<Route path={routesPrivate.installersScreen} element={<Installers />} />
				{/* Module Monitoring */}
				<Route path={routesPrivate.monitoringScreen} element={<MonitoringScreen />} />
				{/* Module Services  */}
				<Route path={routesPrivate.servicesScreen} element={<Services />}>
					<Route index path={routesPrivate.table} element={<Table />} />
				</Route>
				{/* Module Service client*/}
				<Route path={routesPrivate.servicesClientScreen} element={<ServicesClient />}>
					<Route index path={routesPrivate.table} element={<TableServiceClient />} />
					<Route index path={routesPrivate.createService} element={<CreateService />} />
				</Route>
				{/* Module Travels */}
				<Route
					path={routesPrivate.travelsScreen}
					element={
						<SocketForNameSpace
							nameSpace={CONNECTION_NAME_SPACE.TRAVEL}
							typeJoin={SOCKETS_ROOMS.ROOM_TRAVELS}
							socketsEvents={SOCKET_EVENTS.R_TB_TRAVELS}
							functionListening={setArrayTableTravels}
						>
							<Travels />
						</SocketForNameSpace>
					}
				>
					<Route index path={routesPrivate.table} element={<TableTravels />} />
					<Route path={routesPrivate.createTravel} element={<CreateTravel />} />
					<Route path={routesPrivate.travelIdTravel} element={<DetailTravel />}>
						<Route index path={routesPrivate.general} element={<GeneralTravel />} />
						<Route index path={routesPrivate.monitoring} element={<Monitoring />} />
						<Route index path={routesPrivate.events} element={<Eventstravel />} />
					</Route>
				</Route>
				{/* Module Users */}
				<Route path={routesPrivate.usersScreen} element={<UsersScreen />} />
				{/* Module Testing */}
				<Route path={routesPrivate.testingScreen} element={<TestingScreen />} />

				{/* Module Devices */}
				<Route
					path={routesPrivate.devicesScreen}
					element={
						<SocketForNameSpace
							nameSpace={CONNECTION_NAME_SPACE.DEVICE}
							typeJoin={SOCKETS_ROOMS.ROOM_DEVICE_CLI}
							functionListening={setArrayTabledevice}
							socketsEvents={SOCKET_EVENTS.R_TB_DEVICE_CLI}
						>
							<DevicesScreen />
						</SocketForNameSpace>
					}
				>
					<Route index path={routesPrivate.table} element={<TableDevice />} />
					<Route index path={routesPrivate.assignDevice} element={<FormAssignDevice />} />
					<Route path={routesPrivate.deviceIdDevice} element={<Device />}>
						<Route index path={routesPrivate.general} element={<General />} />
						<Route path={routesPrivate.test} element={<Test />} />
						<Route path={routesPrivate.events} element={<Events />} />
						<Route path={routesPrivate.travels} element={<Travels />} />
					</Route>
				</Route>
				{/* Module Inventory */}
				<Route path={routesPrivate.inventoryScreen} element={<InventoryScreen />} />

				{/* <Route
					path={routesPrivate.inventoryScreen}
					// element={
					// 	<SocketForNameSpace
					// 		nameSpace={CONNECTION_NAME_SPACE.DEVICE}
					// 		typeJoin={SOCKETS_ROOMS.ROOM_INVENTORY}
					// 		socketsEvents={SOCKET_EVENTS.R_TB_DEVICE_FAC}
					// 		functionListening={setArrayTableInventory}
					// 	>
					// 		<InventoryScreen />
					// 	</SocketForNameSpace>
					// }
					element={<InventoryScreen />}
				>
					<Route index path={routesPrivate.inventoryScreen} element={<InventoryMain />} />
					<Route path={routesPrivate.table} element={<TableInventory />} />
					<Route path={routesPrivate.deviceIdDevice} element={<Device />}>
						<Route index path={routesPrivate.general} element={<General />} />
						<Route path={routesPrivate.test} element={<Test />} />
						<Route path={routesPrivate.events} element={<Events />} />
						<Route path={routesPrivate.travels} element={<Travels />} />
					</Route>
				</Route> */}
				{/* Module Settings */}
				<Route path={routesPrivate.settingsScreen} element={<SettingsScreen />} />
				{/* Module Account */}
				<Route path={routesPrivate.accountScreen} element={<Account />} />
				{/* Module Notification */}
				<Route path={routesPrivate.notificationScreen} element={<NotificationScreen />}>
					<Route index path={routesPrivate.table} element={<TableNotification />} />
					<Route path={routesPrivate.idNotification} element={<DetailNotification />} />
				</Route>
				{/* Module Factory Device */}
				<Route path={routesPrivate.factoryDevicesScreen} element={<FactoryDevicesScreen />} />
			</Routes>
		</div>
	)
}
