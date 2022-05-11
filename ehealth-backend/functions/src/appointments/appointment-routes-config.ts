import { Application } from 'express';
import isAuthenticated from '../auth/authenticated';
import all from './allAppointments';
import create from './createAppointment';
import remove from './deleteAppointment';
import get from './getAppointment';
import personal from './personalAppointments';
import update from './updateAppointment';

const appointmentRoutes = (app: Application) => {
	// Alle appointment zurueckgeben
	app.get('/appointments/', isAuthenticated, all);

	// Alle persönlichen Termine zurueckgeben
	app.get('/appointments/personal/:id', isAuthenticated, personal);

	// appointment mit ID zurueckgeben
	app.get('/appointments/:id', isAuthenticated, get);

	// appointment erstellen
	app.post('/appointments/', isAuthenticated, create);

	// appointment updaten
	app.patch('/appointments/:id', isAuthenticated, update);

	// appointment loeschen
	app.delete('/appointments/:id', isAuthenticated, remove);
};

export default appointmentRoutes;
