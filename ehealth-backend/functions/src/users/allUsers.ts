import { Request, Response } from 'express';
import handleError from '../error/handleError';
import * as admin from 'firebase-admin';

//Funktion, die alle Nutzer aus Firebase zurückgibt
const all = async (req: Request, res: Response) => {
	//Administrationsrechte auf Firestore
	const db = admin.firestore();

	try {
		//Aufruf auf Collection
		const users = await db
			.collection('users')
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
					result.push({ id, ...data });
				});
				//Rückgabe des Resultarrays
				return result;
			})
			.catch((err) => {
				//Fehlerbehandlung, falls Aufruf fehlschlägt
				return { message: `Error getting documents: ${err}` };
			});
		// Verschicken der gefundenen Daten
		return res.status(201).json({ ...users });
	} catch (err) {
		//Fehlerbehandlung
		return handleError(res, err);
	}
};

export default all;
