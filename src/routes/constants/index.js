export const pathRoutes = {
	landing: '/',
	auth: '/auth/*',
	user: '/user/*'
}

export const routesPrivate = {
	// GENERAL PATHS
	test: 'test',
	table: 'table',
	events: 'events',
	general: 'general',
	centralScreen: 'central-screen',
	// SERVICES
	createService: 'create-service',
	servicesMasterScreen: 'services-master-screen',
	servicesClientScreen: 'services-client-screen',
	tableServicesMasterScreen: 'table-services-master-screen',
	tableServicesClientScreen: 'table-services-client-screen',
	// TRAVELS
	reports: 'reports',
	travels: 'travels',
	monitoring: 'monitoring',
	createTravel: 'create-travel',
	travelsScreen: 'travels-screen',
	travelIdTravel: 'travel/:idTravel',
	tableTravelsScreen: 'table-travels-screen',
	// DEVICE
	assignDeviceScreen: 'assign-device-screen',
	devicesScreen: 'devices-screen',
	deviceIdDevice: 'device/:idDevice',
	factoryDevicesScreen: 'factory-devices-screen',
	// NOTIFICATION
	idNotification: ':idNotification',
	notificationScreen: 'notifications-screen',
	// CHAT
	chatScreen: 'chat-screen',
	usersScreen: 'users-screen',
	groupScreen: 'group-screen',
	testingScreen: 'testing-screen',
	accountScreen: 'account-screen',
	settingsScreen: 'settings-screen',
	inventoryScreen: 'inventory-screen',
	dashboardScreen: 'dashboard-screen',
	monitoringScreen: 'monitoring-screen',
	detailInventoryScreen: 'detail-inventory-screen',
	// ROUTING
	routingScreen: 'routing-screen',
	// INSTALLERS
	installersScreen: 'installers-screen'
}

export const RoutesPublic = {
	loginScreen: 'login-screen',
	registerScreen: 'register-screen',
	PersonalDataScreen: 'personal-data-screen',
	validateCodeScreen: 'validate-code-screen',
	forgotPasswordScreen: 'forgot-password-screen'
}

export const routesRedirect = {
	redirectUser: '/user/account-screen'
}
