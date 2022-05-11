import { Request, Response } from 'express';
import handleError from '../error/handleError';
import * as admin from 'firebase-admin';

//Funktion, die alle Dokumente aus Firebase zurückgibt
const all = async (req: Request, res: Response) => {
	//Administrationsrechte auf Firestore
	const db = admin.firestore();

	//Hilfsfunktion, die zu dem Dokument noch die Nutzerdaten hinzufügt
	const getPrescriptions = async () => {
		//Aufruf auf Dokument Collection
		const prescriptionsRef = db.collection('prescriptions');
		const prescriptions = await prescriptionsRef.get();

		const result: Array<any> = [];
		for (const prescription of prescriptions.docs) {
			const data = prescription.data();
			//Aufruf auf User Collection
			if (data) {
				const userRef = await db.collection('users').doc(data.userId).get();
				data.user = userRef.data();
			}
			result.push({ id: prescription.id, ...data });
		}
		//Rückgabe des Resultarrays
		return result;
	};

	try {
		//Aufruf der Hilfsfunktion
		const prescriptions = await getPrescriptions();
		// Verschicken der gefundenen Daten
		return res.status(201).json({ ...prescriptions });
	} catch (err) {
		//Fehlerbehandlung
		return handleError(res, err);
	}
};

export default all;
