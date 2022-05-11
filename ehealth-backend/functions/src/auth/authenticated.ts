import { Request, Response } from 'express';
// import * as admin from 'firebase-admin';

//Falls Authentifizierung erwünscht ist, würde geprüft werden, ob ein
//Firebase Token mitgegeben wurde. Falls das nicht der Fall ist,
//kann Firebase nicht angesprochen werden

// tslint:disable-next-line: ban-types
const isAuthenticated = async (req: Request, res: Response, next: Function) => {
	// const { authorization } = req.headers;

	// if (!authorization) return res.status(401).send({ message: 'Unauthorized' });

	// if (!authorization.startsWith('Bearer'))
	// 	return res.status(401).send({ message: 'Unauthorized' });

	// const split = authorization.split('Bearer ');
	// if (split.length !== 2)
	// 	return res.status(401).send({ message: 'Unauthorized' });

	// const token = split[1];

	try {
		// const decodedToken: admin.auth.DecodedIdToken = await admin
		// 	.auth()
		// 	.verifyIdToken(token);

		// res.locals = {
		// 	...res.locals,
		// 	uid: decodedToken.uid,
		// 	role: decodedToken.role,
		// 	email: decodedToken.email,
		// };

		return next();
	} catch (err) {
		return res.status(401).send({ message: 'Unauthorized' });
	}
};

export default isAuthenticated;
