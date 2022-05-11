import { Response } from 'express';

//Fehlercode und Fehlermessage wird zurückgegegben
const handleError = (res: Response, err: any) => {
	return res.status(500).json({ message: `${err.code} - ${err.message}` });
};

export default handleError;
