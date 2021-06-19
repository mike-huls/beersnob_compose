const getTimeStamp = (() => {
	return new Date().toISOString();
});

const info = (namespace, message, object) => {
	if (object) {
		console.log(`[${getTimeStamp()}] [INFO] ${namespace} ${message}`, object);
	} else {
		console.log(`[${getTimeStamp()}] [INFO] ${namespace} ${message}`);
	}
}
const warn = (namespace, message, object) => {
	if (object) {
		console.warn(`[${getTimeStamp()}] [WARN] ${namespace} ${message}`, object);
	} else {
		console.warn(`[${getTimeStamp()}] [WARN] ${namespace} ${message}`);
	}
}
const error = (namespace, message, object) => {
	if (object) {
		console.error(`[${getTimeStamp()}] [ERROR] ${namespace} ${message}`, object);
	} else {
		console.error(`[${getTimeStamp()}] [ERROR] ${namespace} ${message}`);
	}
}
const debug = (namespace, message, object) => {
	if (object) {
		console.debug(`[${getTimeStamp()}] [DEBUG] ${namespace} ${message}`, object);
	} else {
		console.debug(`[${getTimeStamp()}] [DEBUG] ${namespace} ${message}`);
	}
}


module.exports = {
	info,
	warn,
	error,
	debug
}