import { Application } from 'express';
import isAuthenticated from '../auth/authenticated';
import create from './createPrescription';
import all from './allPrescriptions';
import remove from './deletePrescription';
import get from './getPrescription';
import update from './updatePrescription';
import personal from './personalPrescriptions';

const prescriptionRoutes = (app: Application) => {
	// Alle Rezepte zurueckgeben
	app.get('/prescriptions/', isAuthenticated, all);
	// Alle persönlichen Rezepte zurueckgeben
	app.get('/prescriptions/personal/:id', isAuthenticated, personal);
	// Rezept mit ID zurueckgeben
	app.get('/prescriptions/:id', isAuthenticated, get);
	// Rezept erstellen
	app.post('/prescriptions/', isAuthenticated, create);
	// Rezept updaten
	app.patch('/prescriptions/:id', isAuthenticated, update);
	// Rezept loeschen
	app.delete('/prescriptions/:id', isAuthenticated, remove);
};

export default prescriptionRoutes;
