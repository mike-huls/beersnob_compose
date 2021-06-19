

const raise = (errorcode=500, errormessage="") => {
	let throwObj = { 
		code: errorcode, 
		msg: errormessage 
	};
	throw throwObj;
}

const send = (res, err) => {
	let errcode = (err.code) ? err.code : 500;
	let errmsg;
	if (err.msg) {
		errmsg = err.msg
	} else if (err) {
		errmsg = err;
	} else {
		errmsg = "Unspecified error"
	}
	res.status(errcode).json(errmsg);
}


module.exports = {
	raise,
	send
}