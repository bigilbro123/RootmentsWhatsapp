import express from 'express';
import { WhatsAppZoho } from '../controller/WhatsappController.js'

const router = express.Router();
router.post('/invoice-webhook', WhatsAppZoho);

export default router;
