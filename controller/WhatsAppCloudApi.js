import axios from "axios";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// 1. WhatsApp Cloud API Credentials
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN || "YOUR_WHATSAPP_ACCESS_TOKEN";
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID || "YOUR_PHONE_NUMBER_ID";
const WHATSAPP_API_URL = `https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

export const WhatsAppZoho = async (req, res) => {
    try {
        // (A) Parse Zoho invoice data
        const payload = req.body;
        console.log("Zoho Books Invoice Webhook Data:", payload);

        // (B) Extract necessary data
        const invoiceId = payload.invoice_id || payload.data?.invoice_id;
        const invoiceUrl = payload.Invoice_Url || payload.data?.Invoice_Url;
        const name = payload.name || payload.data?.name;
        const phone = payload.contact_mobile_phone || "1234567890";

        if (!invoiceId || !phone) {
            console.error("Missing required data");
            return res.status(400).send("Missing required data");
        }

        // (C) Format phone number (E.164 format)
        const formattedPhone = `${phone}`;

        // (D) Send WhatsApp Message via Cloud API
        const messageData = {
            messaging_product: "whatsapp",
            to: formattedPhone,
            type: "text",
            text: {
                body: `Hello ${name},\nYour invoice ${invoiceId} has been created in Zoho Books!\nView your invoice here: ${invoiceUrl}`,
            },
        };

        const response = await axios.post(WHATSAPP_API_URL, messageData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
            },
        });

        console.log("WhatsApp Message Sent:", response.data);
        return res.status(200).send("OK: WhatsApp message sent via Cloud API");

    } catch (error) {
        console.error("Error handling invoice webhook:", error?.message);
        return res.status(500).send("Error processing invoice webhook");
    }
};

export const sendWhatsAppMessage = async (phone, message) => {
    try {
        const formattedPhone = `+91${phone}`;

        const messageData = {
            messaging_product: "whatsapp",
            to: formattedPhone,
            type: "text",
            text: { body: message },
        };

        const response = await axios.post(WHATSAPP_API_URL, messageData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
            },
        });

        console.log(`WhatsApp message sent to ${phone}:`, response.data);
    } catch (error) {
        console.error("Error sending WhatsApp message:", error);
    }
};
