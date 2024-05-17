export const SOCKETS_ROOMS = {
	ROOM_TEST: 'room_test',
	ROOM_EVENTS: 'room_events',
	ROOM_DEVICE: 'room_device',
	ROOM_DEVICE_CLI: 'room_device_cli',
	ROOM_TRAVELS: 'room_travels',
	ROOM_TRAVEL_INFO: 'room_travel_info',
	ROOM_SESSION: 'room_session',
	ROOM_MONITORING: 'room_monitoring',
	ROOM_INVENTORY: 'room_inventory'
}

export const SOCKET_EVENTS = {
	JOIN_ROOM: 'join_room',
	LEFT_ROOM: 'left_room',
	LEAVE_ROOM: 'leave_room',
	JOINED_ROOM: 'joined_room',

	// NOTIFICATION
	R_NOTIFICATION_RECEIVE: 'r_notificatio_receive',

	// DEVICES GENERAL
	R_DEVICE_INFO: 'r_device_info',
	R_TB_DEVICE_FAC: 'r_tb_device_fac',
	TB_EVENTS_DEVICE: 'tb_events_device',
	R_TB_EVENTS_DEVICE: 'r_tb_events_device',
	R_TB_DEVICE_CLI: 'r_tb_device_cli',

	// DEVICES TEST
	TB_TESTINGS_DEVICE: 'tb_testings_device',
	R_TB_TESTINGS_DEVICE: 'r_tb_testings_device',

	// TRAVELS
	R_TB_TRAVELS: 'r_tb_travels',
	R_INFO_TRAVEL: 'r_info_travel',

	//PAGINATION
	TB_DEVICES_FAC: 'tb_devices_fac'
}

export const CONNECTION_NAME_SPACE = {
	DEVICE: 'device',
	SESSION: 'session',
	TRAVEL: 'travel'
}

export const TRANSPORT_SOCKET = {
	POLLING: 'polling',
	WEBSOCKET: 'websocket'
}
