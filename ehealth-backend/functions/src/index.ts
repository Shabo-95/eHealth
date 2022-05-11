import * as functions from 'firebase-functions';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import userRoutes from './users/routes-config';
import appointmentRoutes from './appointments/appointment-routes-config';
import prescriptionRoutes from './prescriptions/prescription-routes-config';

//Initialisierung des Firebase Backends
admin.initializeApp(functions.config().firebase);

//Erstellung des Express Servers
const app = express()
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use(cors({ origin: true }));

//Einbindung der ansprechbaren Routen auf dem Server
userRoutes(app);
appointmentRoutes(app);
prescriptionRoutes(app);

//Hochladen der API
export const api = functions.region('europe-west2').https.onRequest(app);
