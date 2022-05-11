import { Request, Response } from 'express';
import handleError from '../error/handleError';
import * as admin from 'firebase-admin';

//Funktion, die Dokument aus Firebase löscht
const remove = async (req: Request, res: Response) => {
	//Administrationsrechte auf Firestore
	const db = admin.firestore();

	try {
		//Id des zu löschenden Dokuments
		const { id } = req.params;
		console.log('deletePrescription called');

		//Aufruf auf Collection
		const response = await db
			.collection('prescriptions')
			.doc(id)
			.delete()
			.then(() => {
				return { message: 'Document successfully deleted!' };
			})
			.catch((err) => {
				return { message: `Error removing document: ${err}` };
			});

		// Verschicken der erstellten Antwort
		return res.status(201).json({ ...response });
	} catch (err) {
		//Fehlerbehandlung
		return handleError(res, err);
	}
};

export default remove;
