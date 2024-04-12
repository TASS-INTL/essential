export const SOCKETS_ROOMS = {
	ROOM_MONITORING: 'room_monitoring',
	ROOM_SESSION: 'room_session',
	ROOM_TEST: 'room_test',
	ROOM_EVENTS: 'room_events',
	ROOM_DEVICE: 'room_device',
	ROOM_TRAVEL: 'room_travel',
	ROOM_INVENTORY: 'room_inventory'
}

export const SOCKET_EVENTS = {
	JOIN_ROOM: 'join_room',
	JOINED_ROOM: 'joined_room',
	// NOTIFICATION
	R_NOTIFICATION_RECEIVE: 'r_notificatio_receive',
	// DEVICES
	R_TB_DEVICE_FAC: 'r_tb_device_fac',

	//PAGINATION
	TB_DEVICES_FAC: 'tb_devices_fac'
}

export const CONNECTION_NAME_SPACE = {
	SESSION: 'session',
	DEVICE: 'device'
}

export const TRANSPORT_SOCKET = {
	WEBSOCKET: 'websocket',
	POLLING: 'polling'
}
