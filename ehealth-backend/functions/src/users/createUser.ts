import { Request, Response } from 'express';
import handleError from '../error/handleError';
import * as admin from 'firebase-admin';

//Funktion, die Nutzer in Firebase erstellt
const create = (req: Request, res: Response) => {
	//Administrationsrechte auf Firestore
	const db = admin.firestore();

	try {
		//Von Firebase beim Registrieren generierte ID
		const { id } = req.params;
		//Erstellen des aktuellen Zeitpunkts
		const currentDate = Date.now();
		//Zusammenfügen der Daten, die in Firebase hinzugefügt werden sollen
		const userData = {
			...req.body,
			lastLogin: currentDate,
			created_at: currentDate,
		};

		console.log('createUser called');
		//Aufruf auf Collection
		db.collection('users')
			.doc(id)
			.set({ ...userData })
			.then(() => console.log('Document successfully written!'))
			.catch((err) => console.log(err));

		// Verschicken der erstellten Antwort
		return res.status(201).json({ message: 'Successfully created User' });
	} catch (err) {
		//Fehlerbehandlung
		return handleError(res, err);
	}
};

export default create;
