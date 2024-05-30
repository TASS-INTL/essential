export const SOCKETS_ROOMS = {
	ROOM_TEST: 'room_test',
	ROOM_EVENTS: 'room_events',
	ROOM_DEVICE: 'room_device',
	ROOM_DEVICE_CLI: 'room_device_cli',
	ROOM_TRAVELS: 'room_travels',
	ROOM_TRAVEL_INFO: 'room_travel_info',
	ROOM_SESSION: 'room_session',
	ROOM_MONITORING: 'room_monitoring',
	ROOM_INVENTORY: 'room_inventory',
	ROOM_REAL_TIME_JOIN: 'room_real_time_join',
	ROOM_REAL_TIME_LEAVE: 'room_real_time_leave'
}

export const SOCKET_EVENTS = {
	JOIN_ROOM: 'join_room',
	LEFT_ROOM: 'left_room',
	LEAVE_ROOM: 'leave_room',
	JOINED_ROOM: 'joined_room',

	// NOTIFICATION
	R_NOTIFICATION_RECEIVE: 'r_notificatio_receive',
	NOTIFICATION_READ: 'notification_read',

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
	TB_EVENTS_TRAVELS: 'tb_events_travel',
	R_TB_EVENTS_TRAVEL: 'r_tb_events_travel',
	TB_MONITORING_TRAVEL: 'tb_monitoring_travel',
	R_TB_MONITORING_TRAVEL: 'r_tb_monitoring_travel',
	REAL_TIME_MONITORING: 'real_time_monitoring',
	R_TRAVEL_MONITORING_REAL_TIME: 'r_travel_monitoring_real_time',

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
