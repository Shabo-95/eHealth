import { Request, Response } from 'express';
import handleError from '../error/handleError';
import * as admin from 'firebase-admin';

//Funktion, die Termine in Firebase erstellt
const create = (req: Request, res: Response) => {
	//Administrationsrechte auf Firestore
	const db = admin.firestore();

	try {
		//Erstellen des aktuellen Zeitpunkts
		const currentDate = Date.now();
		//Zusammenfügen der Daten, die in Firebase hinzugefügt werden sollen
		const appointmentData = {
			...req.body,
			created_at: currentDate,
		};

		console.log('createAppointment called');
		//Aufruf auf Collection
		db.collection('appointments')
			.doc()
			.set({ ...appointmentData })
			.then(() => console.log('Document successfully written!'))
			.catch((err) => console.log(err));

		// Verschicken der erstellten Antwort
		return res
			.status(201)
			.json({ message: 'Successfully created Appointment' });
	} catch (err) {
		//Fehlerbehandlung
		return handleError(res, err);
	}
};

export default create;
