import express from 'express';
// import { salesWhatsAppZoho, } from '../controller/WhatsappController.js'
import { WhatsAppZoho } from '../controller/WhatsAppCloudApi.js'
import { WhatsAppSalesZoho } from '../controller/WhatsAppCloudeSales.js';
import { GETWHATSAPP, POSTWHATSAPP } from '../controller/Test.js';

const router = express.Router();
router.post('/invoice-webhook', WhatsAppZoho);
router.post('/sales-webhook', WhatsAppSalesZoho);
router.post('/WhatsappApiwebhook', POSTWHATSAPP);
router.get('/WhatsappApiwebhook', GETWHATSAPP);


export default router;
