export const typeStatus = [
	{ id: 1, name: 'active' },
	{ id: 2, name: 'deactive' }
]

export const tableTitle = [
	{
		id: '1',
		title: ''
	},
	{
		id: '2',
		title: 'Descripcion'
	},
	{
		id: '3',
		title: ''
	},
	{
		id: '6',
		title: 'tipo'
	},
	{
		id: '4',
		title: 'Categoria'
	},
	{
		id: '5',
		title: ''
	}
]

export const tableTitleInventory = [
	{
		id: '1',
		title: 'Did'
	},
	{
		id: '2',
		title: 'mid'
	},
	{
		id: '3',
		title: 'fecha'
	},
	{
		id: '4',
		title: 'fecha envio'
	},
	{
		id: '5',
		title: 'long'
	},
	{
		id: '6',
		title: 'latitud'
	}
]

export const initialStateTravel = {
	date_end: '',
	date_start: '',
	devices: [
		{
			did: '',
			id_device: '',
			status: '',
			type_operation: 'INSTALLATION'
		}
	],
	installers: [
		{
			id_installer: '',
			name: '',
			status: '',
			type_operation: 'INSTALLATION'
		}
	],
	service: {
		did: '',
		id_service: ''
	},
	routes: {
		location_end: {
			location: '', // objeto de la documentacion
			permissions: {}, // viene del back
			name: 'name geo',
			market: {
				location: {},
				status: true
			}
		},
		location_start: {
			location: '', // objeto de la documentacion
			permissions: {}, // viene del back
			name: 'name geo',
			market: {
				location: {},
				status: true
			}
		},
		stations: [
			{
				location: '', // objeto de la documentacion
				permissions: {}, // viene del back
				name: 'name geo',
				market: {
					location: {},
					status: true
				}
			}
		],
		coordinatesroute: []
	}
}
export const initialStateService = {
	date_end: '',
	date_start: '',
	driver: {
		email: '',
		license_plate: '',
		name: '',
		number_document: '',
		phone: ''
	},
	routes: {
		location_end: {
			location: '', // objeto de la documentacion
			permissions: {}, // viene del back
			name: 'name geo',
			market: {
				location: {},
				status: true
			}
		},
		location_start: {
			location: '', // objeto de la documentacion
			permissions: {}, // viene del back
			name: 'name geo',
			market: {
				location: {},
				status: true
			}
		},
		stations: [
			{
				location: '', // objeto de la documentacion
				permissions: {}, // viene del back
				name: 'name geo',
				market: {
					location: {},
					status: true
				}
			}
		],
		coordinatesroute: []
	},
	remarks: ''
}

export const initialStateEditTravel = {
	date_end: '',
	date_start: '',
	devices: [
		{
			did: '',
			id_device: '',
			status: '',
			type_operation: 'INSTALLATION'
		}
	],
	installers: [
		{
			id_installer: '',
			name: '',
			status: '',
			type_operation: 'INSTALLATION'
		}
	],
	service: {
		did: '',
		id_service: ''
	},
	driver: {
		email: '',
		license_plate: '',
		name: '',
		number_document: '',
		phone: ''
	},
	routes: {
		location_end: {
			location: '', // objeto de la documentacion
			permissions: {}, // viene del back
			name: 'name geo',
			consecutive: 2,
			validated: false,
			market: {
				location: {},
				status: true
			}
		},
		location_start: {
			location: '', // objeto de la documentacion
			permissions: {}, // viene del back
			consecutive: 1,
			validated: false,
			name: 'name geo',
			market: {
				location: {},
				status: true
			}
		},
		stations: [
			{
				location: '', // objeto de la documentacion
				permissions: {}, // viene del back
				name: 'name geo',
				consecutive: 2,
				validated: false,
				market: {
					location: {},
					status: true
				}
			}
		],
		coordinatesroute: []
	},
	remarks: ''
}

export const styleModal = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	height: '90%',
	bgcolor: 'background.paper',
	border: '2px solid #fff',
	boxShadow: 24,
	p: 1
}

export const initialDataLocation = {
	location_start: {},
	location_end: {}
}

export const API_KEY_GOOGLE_MAPS = import.meta.env.VITE_API_KEY_GOOGLE_MAPS
