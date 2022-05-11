import { Application } from 'express';
import isAuthenticated from '../auth/authenticated';
import allEmployees from './allEmployees';
import allPatients from './allPatients';
import all from './allUsers';
import create from './createUser';
import remove from './deleteUser';
import get from './getUser';
import update from './updateUser';

const userRoutes = (app: Application) => {
	// Alle User zurueckgeben
	app.get('/users/', isAuthenticated, all);

	// Alle Patienten zurueckgeben
	app.get('/users/patients', isAuthenticated, allPatients);

	// Alle Mitarbeiter zurueckgeben
	app.get('/users/employees', isAuthenticated, allEmployees);

	// User mit ID zurueckgeben
	app.get('/users/:id', isAuthenticated, get);

	// User erstellen
	app.post('/users/:id', isAuthenticated, create);

	// User updaten
	app.patch('/users/:id', isAuthenticated, update);

	// User loeschen
	app.delete('/users/:id', isAuthenticated, remove);
};

export default userRoutes;
