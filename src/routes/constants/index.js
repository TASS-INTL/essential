export const pathRoutes = {
	landing: '/',
	auth: '/auth/*',
	user: '/user/*'
}

export const routesPrivate = {
	// General paths
	test: 'test',
	table: 'table',
	events: 'events',
	general: 'general',
	// Service
	createService: 'create-service',
	servicesScreen: 'services-screen',
	servicesClientScreen: 'services-client-screen',
	// Travel
	travels: 'travels',
	monitoring: 'monitoring',
	createTravel: 'create-travel',
	travelsScreen: 'travels-screen',
	travelIdTravel: 'travel/:idTravel',
	// Device
	assignDevice: 'assign-device',
	devicesScreen: 'devices-screen',
	deviceIdDevice: 'device/:idDevice',
	factoryDevicesScreen: 'factory-devices-screen',
	// Notification
	idNotification: ':idNotification',
	notificationScreen: 'notifications-screen',
	// Chat
	chatScreen: 'chat-screen',
	//
	usersScreen: 'users-screen',
	groupScreen: 'group-screen',
	testingScreen: 'testing-screen',
	accountScreen: 'account-screen',
	settingsScreen: 'settings-screen',
	inventoryScreen: 'inventory-screen',
	dashboardScreen: 'dashboard-screen',
	installersScreen: 'installers-screen',
	monitoringScreen: 'monitoring-screen',
	detailInventoryScreen: 'detail-inventory-screen'
}
