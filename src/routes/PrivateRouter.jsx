import { useContext, useState } from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { SideBarComponent } from '../Components'
import Navbar from '../Components/navBar'
import { pathNavigation } from '../pages/auth/constants'
import { Account } from '../pages/PrivateRoutes/Account/ModuleAccount/Account'
import { UsersScreen } from '../pages/PrivateRoutes/Admin/ModuleUsers/UsersScreen'
import { CentralScreen } from '../pages/PrivateRoutes/Central'
import { Installers } from '../pages/PrivateRoutes/Central/ModuleInstallers/Installers'
import { MonitoringScreen } from '../pages/PrivateRoutes/Central/ModuleMonitoring/MonitoringScreen'
import { ServicesClient } from '../pages/PrivateRoutes/Central/ModuleServiceClient/ServicesClient'
import { TableServiceClient } from '../pages/PrivateRoutes/Central/ModuleServiceClient/TableServiceClient'
import { CreateService, Services, Table } from '../pages/PrivateRoutes/Central/ModuleServices'
import {
	CreateTravel,
	DetailTravel,
	Eventstravel,
	GeneralTravel,
	Monitoring,
	TableTravels,
	Travels
} from '../pages/PrivateRoutes/Central/ModuleTravels'
import { ChatScreen } from '../pages/PrivateRoutes/Chat/ModuleChat/ChatScreen'
import { DevicesScreen } from '../pages/PrivateRoutes/Inventory/ModuleDevices/DevicesScreen'
import { FormAssignDevice } from '../pages/PrivateRoutes/Inventory/ModuleDevices/FormAssignDevice'
import { TableDevice } from '../pages/PrivateRoutes/Inventory/ModuleDevices/TableDevice'
import { FactoryDevicesScreen } from '../pages/PrivateRoutes/Inventory/ModuleFactoryDevices/FactoryDevicesScreen'
import { Device, Events, General, InventoryScreen, Test } from '../pages/PrivateRoutes/Inventory/ModuleInventory'
import { TestingScreen } from '../pages/PrivateRoutes/Inventory/ModuleTesting/TestingScreen'
import { NotificationScreen } from '../pages/PrivateRoutes/Notification/ModuleNotification/NotificationScreen'
import { TableNotification } from '../pages/PrivateRoutes/Notification/ModuleNotification/TableNotification'
import { CONNECTION_NAME_SPACE, SOCKET_EVENTS, SOCKETS_ROOMS } from '../pages/PrivateRoutes/sockets/constants'
import { SocketForNameSpace } from '../pages/PrivateRoutes/sockets/socketForNameSpace'
import { SocketProvider } from '../pages/PrivateRoutes/sockets/socketProvider'
import { deviceStore } from '../store/deviceStore'
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
	const setArrayTableTravels = travelsStore((state) => state.setArrayTableTravels)

	return (
		<div className='flex relative'>
			<div className='fixed w-full z-10'>
				<Navbar />
				<SideBarComponent />
			</div>
			<Routes>
				{/* ============ MODULE CENTRAL =============== */}
				<Route path={routesPrivate.centralScreen} element={<CentralScreen />} />

				{/* Module Installers */}
				<Route path={routesPrivate.installersScreen} element={<Installers />} />
				{/* Module Monitoring */}
				<Route path={routesPrivate.monitoringScreen} element={<MonitoringScreen />} />
				{/* Module Service client*/}
				<Route path={routesPrivate.servicesClientScreen} element={<ServicesClient />}>
					<Route index path={routesPrivate.table} element={<TableServiceClient />} />
					<Route index path={routesPrivate.createService} element={<CreateService />} />
				</Route>
				{/* Module Services  */}
				<Route path={routesPrivate.servicesScreen} element={<Services />}>
					<Route index path={routesPrivate.table} element={<Table />} />
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

				{/* ============ MODULE ADMIN =============== */}

				{/* Module Users */}
				<Route path={routesPrivate.usersScreen} element={<UsersScreen />} />

				{/* ============ MODULE CHAT =============== */}

				{/* Module Chat */}
				<Route path={routesPrivate.chatScreen} element={<ChatScreen />} />

				<Route path={routesPrivate.testingScreen} element={<TestingScreen />} />

				{/* ============ MODULE INVENTORY =============== */}
				<Route path={routesPrivate.inventoryScreen} element={<InventoryScreen />} />

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
				{/* Module Factory Device */}
				<Route path={routesPrivate.factoryDevicesScreen} element={<FactoryDevicesScreen />} />

				{/* ============ MODULE ACCOUNT =============== */}

				{/* Module Account */}
				<Route path={routesPrivate.accountScreen} element={<Account />} />

				{/* ============ MODULE NOTIFICATIONS =============== */}

				{/* Module Notification */}
				<Route path={routesPrivate.notificationScreen} element={<NotificationScreen />}>
					<Route index path={routesPrivate.table} element={<TableNotification />} />
				</Route>
			</Routes>
		</div>
	)
}
