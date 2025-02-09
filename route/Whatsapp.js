import express from 'express';
import { salesWhatsAppZoho, } from '../controller/WhatsappController.js'
import { WhatsAppZoho } from '../controller/WhatsAppCloudApi.js'

const router = express.Router();
router.post('/invoice-webhook', WhatsAppZoho);
router.post('/sales-webhook', salesWhatsAppZoho);


export default router;
