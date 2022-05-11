import { Request, Response } from 'express';
import handleError from '../error/handleError';
import * as admin from 'firebase-admin';

//Funktion, die einen Termin in Firebase updated
const update = (req: Request, res: Response) => {
	//Administrationsrechte auf Firestore
	const db = admin.firestore();

	try {
		//Id des Termins
		const { id } = req.params;
		//Daten die geupdated werden sollen
		const appointmentData = req.body;

		//Aufruf auf Collection
		console.log('updateAppointment called');
		db.collection('appointments')
			.doc(id)
			.update({ ...appointmentData })
			.then(() => console.log('Document successfully updated!'))
			.catch((err) => console.log(err));

		// Verschicken einer Antwort
		return res
			.status(201)
			.json({ message: 'Successfully updated Appointment' });
	} catch (err) {
		//Fehlerbehandlung
		return handleError(res, err);
	}
};

export default update;
