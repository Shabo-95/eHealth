import { Request, Response } from 'express';
import handleError from '../error/handleError';
import * as admin from 'firebase-admin';

//Funktion, die alle persönlichen Dokumente aus Firebase zurückgibt
const personal = async (req: Request, res: Response) => {
	//Administrationsrechte auf Firestore
	const db = admin.firestore();

	try {
		//Id des Nutzers, der für Dokumente eingetragen ist
		const { id } = req.params;
		console.log('getPersonalPrescription called');

		//Aufruf auf Collection mit Filterung nach Id
		const data = await db
			.collection('prescriptions')
			.where('userId', '==', id)
			.get()
			.then((snapshot) => {
				//Check, ob Dokumente gefunden wurden
				if (snapshot.empty) {
					return { message: 'No data available' };
				}
				//Hinzufügen der Daten in result Array
				const result: Array<any> = [];
				snapshot.forEach((doc) => {
					const id = doc.id;
					const data = doc.data();
					delete data.user;
					result.push({ id, ...data });
				});
				//Rückgabe des Resultarrays
				return result;
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

export default personal;
