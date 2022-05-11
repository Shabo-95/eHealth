import { Request, Response } from 'express';
import handleError from '../error/handleError';
import * as admin from 'firebase-admin';

//Funktion, die Dokumente in Firebase erstellt
const create = (req: Request, res: Response) => {
	//Administrationsrechte auf Firestore
	const db = admin.firestore();

	try {
		//Erstellen des aktuellen Zeitpunkts
		const currentDate = Date.now();
		//Zusammenfügen der Daten, die in Firebase hinzugefügt werden sollen
		const prescriptionData = {
			...req.body,
			created_at: currentDate,
		};

		//Aufruf auf Collection
		console.log('createPrescription called');
		db.collection('prescriptions')
			.doc()
			.set({ ...prescriptionData })
			.then(() => console.log('Document successfully written!'))
			.catch((err) => console.log(err));

		// Verschicken der erstellten Antwort
		return res
			.status(201)
			.json({ message: 'Successfully created Prescription' });
	} catch (err) {
		//Fehlerbehandlung
		return handleError(res, err);
	}
};

export default create;
