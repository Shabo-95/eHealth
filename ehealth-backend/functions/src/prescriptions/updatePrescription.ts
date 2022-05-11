import { Request, Response } from 'express';
import handleError from '../error/handleError';
import * as admin from 'firebase-admin';

//Funktion, die eine Dokument in Firebase updated
const update = (req: Request, res: Response) => {
	//Administrationsrechte auf Firestore
	const db = admin.firestore();

	try {
		//Id des Dokuments
		const { id } = req.params;
		//Daten die geupdated werden sollen
		const prescriptionData = req.body;

		//Aufruf auf Collection
		console.log('updatePrescription called');
		db.collection('prescriptions')
			.doc(id)
			.update({ ...prescriptionData })
			.then(() => console.log('Document successfully updated!'))
			.catch((err) => console.log(err));

		// Verschicken einer Antwort
		return res
			.status(201)
			.json({ message: 'Successfully updated Prescription' });
	} catch (err) {
		//Fehlerbehandlung
		return handleError(res, err);
	}
};

export default update;
