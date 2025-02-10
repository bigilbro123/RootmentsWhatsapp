import express from 'express';
// import { salesWhatsAppZoho, } from '../controller/WhatsappController.js'
import { WhatsAppZoho } from '../controller/WhatsAppCloudApi.js'
import { WhatsAppSalesZoho } from '../controller/WhatsAppCloudeSales.js';

const router = express.Router();
router.post('/invoice-webhook', WhatsAppZoho);
router.post('/sales-webhook', WhatsAppSalesZoho);


export default router;
