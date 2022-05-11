import { Request, Response } from 'express';
import handleError from '../error/handleError';
import * as admin from 'firebase-admin';

//Funktion, die Nutzer aus Firebase löscht
const remove = async (req: Request, res: Response) => {
	//Administrationsrechte auf Firestore
	const db = admin.firestore();

	try {
		//Id des zu löschenden Nutzers
		const { id } = req.params;
		console.log('deleteUser called');

		//Aufruf auf Collection
		const response = await db
			.collection('users')
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
