import express from 'express';
import {
  getProcedures,
  getProcedure,
  getProcedureAppointments,
} from '../controllers/procedures.controller.js';

const router = express.Router();

router.get('/', getProcedures);
router.get('/:id/appointments', getProcedureAppointments);
router.get('/:id', getProcedure);

export default router;
