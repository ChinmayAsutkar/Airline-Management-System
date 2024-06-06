import express from 'express';
import { getFlights } from '../controllers/flightController.js';

const router = express.Router();

router.get('/', getFlights);

export default router;
