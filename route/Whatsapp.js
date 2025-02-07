import express from 'express';
import { salesWhatsAppZoho, WhatsAppZoho } from '../controller/WhatsappController.js'

const router = express.Router();
router.post('/invoice-webhook', WhatsAppZoho);
router.post('/sales-webhook', salesWhatsAppZoho);


export default router;
