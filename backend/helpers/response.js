const { enumResponse } = require('../helpers/enumResponse');

const response = (res, type, body) => {
	if (type == 500) {
		return res.status(500).json({
			ok: false,
			msg: enumResponse.msgAdmin
		});
	} else {
		return res.status(type).json({
			body
		});
	}
};

module.exports = {
	response
};
