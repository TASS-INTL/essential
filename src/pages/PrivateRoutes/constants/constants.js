export const typeStatus = [
	{ _id: 1, name: 'active' },
	{ _id: 2, name: 'deactive' }
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

export const dataForCreateTravel = {
	date_finalization: null,
	date_installation: null,
	installers: null,
	location_finalization: null,
	location_installation: null,
	periods: null,
	remarks: '',
	service: null,
	type: null
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
	location_start: null,
	location_end: null
}
export const initialDataLocation2 = [{ location_start: {} }, { location_end: {} }]

export const API_KEY_GOOGLE_MAPS = import.meta.env.VITE_API_KEY_GOOGLE_MAPS

export const permission = [
	{
		_id: '66625f1a3c6de0255a3eb5fe',
		name: 'entry_close',
		values: {
			value: true
		},
		name_consult: 'Cerrar'
	},
	{
		_id: '66625f263c6de0255a3eb5ff',
		name: 'entry_open',
		values: {
			value: true
		},
		name_consult: 'Abrir'
	},
	{
		_id: '66625f363c6de0255a3eb600',
		name: 'geofence_entry_load',
		values: {
			value: true
		},
		name_consult: 'avisa entrada a la geocerca'
	},
	{
		_id: '66625f523c6de0255a3eb601',
		name: 'geofence_output_load',
		values: {
			value: true
		},
		name_consult: 'Sale de la geocerca'
	},
	{
		_id: '66625f653c6de0255a3eb602',
		name: 'entry_violation',
		values: {
			value: true
		},
		name_consult: 'violaciones'
	},
	{
		_id: '66625f723c6de0255a3eb604',
		name: 'date_entry_load',
		values: {
			value: true,
			date: '2024-04-17T03:30:00.000+0000'
		},
		name_consult: 'Fecha de entrada'
	},
	{
		_id: '66625f783c6de0255a3eb605',
		name: 'date_output_load',
		values: {
			value: true,
			date: '2024-04-17T03:30:00.000+0000'
		},
		name_consult: 'Fecha salida'
	},
	{
		_id: '66bbb472ed6fb16031a0c4d7',
		name: 'receive_commands',
		name_consult: 'Recivir comandos',
		values: {
			value: true
		}
	}
]
