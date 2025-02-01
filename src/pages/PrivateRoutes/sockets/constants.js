export const SOCKETS_ROOMS = {
	ROOM_TEST: 'room_test',
	ROOM_EVENTS: 'room_events',
	ROOM_DEVICE: 'room_device',
	ROOM_DEVICE_CLI: 'room_device_cli',
	ROOM_TRAVELS: 'room_travels',
	ROOM_TRAVEL_INFO: 'room_travel_info',
	SESSION_INFO: 'SESSION_INFO',
	TRAVEL_INFO: 'TRAVEL_INFO',
	DEVICE_INVENTORY: 'DEVICE_INVENTORY',
	TRAVEL_INVENTORY: 'TRAVEL_INVENTORY',
	DEVICE_INFO: 'DEVICE_INFO',
	ROOM_MONITORING: 'room_monitoring',
	ROOM_INVENTORY: 'room_inventory',
	ROOM_REAL_TIME_JOIN: 'room_real_time_join',
	ROOM_REAL_TIME_LEAVE: 'room_real_time_leave'
}

export const SOCKET_EVENTS = {
	// GENERAL
	CONNECT: 'connect',
	DISCONNECT: 'disconnect',

	// SESSION
	JOIN_ROOM_SESSION_INFO : 'join_room_session_info',
	LEAVE_ROOM_SESSION_INFO : 'leave_room_session_info',
	JOINED_ROOM_SESSION_INFO: 'joined_room_session_info',
	LEFT_ROOM_SESSION_INFO: 'left_room_session_info',
	
	JOIN_ROOM: 'join_room',

	// NOTIFICATION
	R_NOTIFICATION_RECEIVE: 'r_notificatio_receive',
	NOTIFICATION_READ: 'notification_read',

	// DEVICES
	JOIN_ROOM_DEVICE_INVENTORY: 'join_room_device_inventory',
	JOINED_ROOM_DEVICE_INVENTORY: 'joined_room_device_inventory',
	LEAVE_ROOM_DEVICE_INVENTORY: 'leave_room_device_inventory',
	LEFT_ROOM_DEVICE_INVENTORY: 'left_room_device_inventory',
	// DEVICE INFO
	JOIN_ROOM_DEVICE_INFO: 'join_room_device_info',
	JOINED_ROOM_DEVICE_INFO: 'joined_room_device_info',
	LEAVE_ROOM_DEVICE_INFO: 'leave_room_device_info',
	LEFT_ROOM_DEVICE_INFO: 'left_room_device_info',
	R_DEVICE_INVENTORY: 'r_device_inventory',
	R_DEVICE_INFO: 'r_device_info',
	R_TB_DEVICE_FAC: 'r_tb_device_fac',
	TB_EVENTS_DEVICE_INFO: 'tb_events_device_info',
	R_TB_EVENTS_DEVICE_INFO: 'r_tb_events_device_info',
	R_TB_DEVICE_CLI: 'r_tb_device_cli',

	// DEVICES TEST
	TB_TESTINGS_DEVICE: 'tb_testings_device',
	R_TB_TESTINGS_DEVICE: 'r_tb_testings_device',

	// TRAVELS
	JOIN_ROOM_TRAVEL_INFO: 'join_room_travel_info',
	JOINED_ROOM_TRAVEL_INFO: 'joined_room_travel_info',
	LEAVE_ROOM_TRAVEL_INFO: 'leave_room_travel_info',
	LEFT_ROOM_TRAVEL_INFO: 'left_room_travel_info',
	JOIN_ROOM_TRAVELS_INVENTORY: 'join_room_travels_inventory',
	JOINED_ROOM_TRAVELS_INVENTORY: 'joined_room_travels_inventory',
	LEAVE_ROOM_TRAVELS_INVENTORY: 'leave_room_travels_inventory',
	LEFT_ROOM_TRAVELS_INVENTORY: 'left_room_travels_inventory',
	TRAVELS_INVENTORY: 'travels_inventory',
	R_TRAVEL_INFO: 'r_travel_info',
	TB_MONITORING_TRAVEL: 'tb_monitoring_travel',
	TB_EVENTS_TRAVEL: 'tb_events_travel',
	R_TB_EVENTS_TRAVEL_INFO : 'r_tb_events_travel_info',
	R_TB_LOGS_REGISTER_TRAVEL_INFO: 'r_tb_logs_register_travel_info',
	R_TB_PROCESSES_TRAVEL_INFO: 'r_tb_processes_travel_info',
	R_TB_MONITORING_TRAVEL_INFO: 'r_tb_monitoring_travel_info',
	JOIN_ROOM_REALTIME_MONITORING: 'join_room_realtime_monitoring',
	JOINED_ROOM_REALTIME_MONITORING: 'joined_room_realtime_monitoring',
	LEAVE_ROOM_REALTIME_MONITORING: 'leave_room_realtime_monitoring',
	LEFT_ROOM_REALTIME_MONITORING: 'left_room_realtime_monitoring',
	TB_LOGS_REGISTER: 'tb_logs_register',

	
	

	// PAGINATION
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
