const jwt = require('jsonwebtoken');

const checkAuthorization = async (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({
			error: 401,
			data: {
				message: 'Unauthorized',
			},
		});
	}
	// eslint-disable-next-line no-unused-vars
	const [bearer, token] = authorization.split(' ');
	try {
		const verification = await jwt.verify(token, process.env.JWT_SECRET);
		req.key = verification.key;
	} catch (err) {
		return res.status(401).json({
			error: 401,
			data: {
				message: 'Unauthorized',
			},
		});
	}

	return next();
};

module.exports = { checkAuthorization };