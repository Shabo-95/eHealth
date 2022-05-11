import { Request, Response } from 'express';
import handleError from '../error/handleError';
import * as admin from 'firebase-admin';

//Funktion, die einzelnes Dokument aus Firebase zurückgibt
const get = async (req: Request, res: Response) => {
	//Administrationsrechte auf Firestore
	const db = admin.firestore();

	try {
		//Id des Dokuments
		const { id } = req.params;
		console.log('getPrescription called');

		//Aufruf auf Collection
		const data = await db
			.collection('prescriptions')
			.doc(id)
			.get()
			.then((doc) => {
				//Check, ob Dokument gefunden wurde
				if (doc.exists) {
					return doc.data();
				} else {
					return { message: 'No data available.' };
				}
			})
			.catch((err) => {
				//Fehlerbehandlung, falls Aufruf fehlschlägt
				return { message: `Error getting document: ${err}` };
			});
		// Verschicken der gefundenen Daten
		return res.status(201).json({ ...data });
	} catch (err) {
		//Fehlerbehandlung
		return handleError(res, err);
	}
};

export default get;
