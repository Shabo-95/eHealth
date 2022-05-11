import { Request, Response } from 'express';
import handleError from '../error/handleError';
import * as admin from 'firebase-admin';

//Funktion, die alle Termine aus Firebase zurückgibt
const all = async (req: Request, res: Response) => {
	//Administrationsrechte auf Firestore
	const db = admin.firestore();

	try {
		console.log('allAppointments called');
		//Aufruf auf Collection
		const appointments = await db
			.collection('appointments')
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
		return res.status(201).json({ ...appointments });
	} catch (err) {
		//Fehlerbehandlung
		return handleError(res, err);
	}
};

export default all;
