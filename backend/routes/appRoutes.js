import express from 'express';
import {
  getProcedures,
  getAppointments,
  getProcedure,
} from '../controllers/appController.js';

const router = express.Router();

router.get('/procedures', getProcedures);
router.get('/procedures/:id', getProcedure);
router.get('/appointments/:id', getAppointments);

export default router;
