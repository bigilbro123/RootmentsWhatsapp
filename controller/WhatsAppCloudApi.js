import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const WHATSAPP_CLOUD_API_URL = "https://graph.facebook.com/v18.0/";
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const sendWhatsAppMessage = async (phone, message) => {
    try {
        const response = await axios.post(
            `${WHATSAPP_CLOUD_API_URL}${WHATSAPP_PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: phone,
                type: "text",
                text: { body: message },
            },
            {
                headers: {
                    Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(`WhatsApp message sent to ${phone}`, response.data);
    } catch (error) {
        console.error("Error sending WhatsApp message:", error.response?.data || error.message);
    }
};

export const WhatsAppZoho = async (req, res) => {
    try {
        const payload = req.body;
        console.log("Zoho Books Invoice Webhook Data:", payload);

        const invoiceId = payload.invoice_id || payload.data?.invoice_id;
        const invoiceUrl = payload.Invoice_Url || payload.data?.Invoice_Url;
        const name = payload.name || payload.data?.name;
        const phoneNumber = payload.contact_mobile_phone || payload.data.contact_mobile_phone

        if (!invoiceId) {
            console.error("No invoice ID found in payload");
            return res.status(400).send("No invoice ID found");
        }

        const customerPhone = phoneNumber.length < 10 ? `91${phoneNumber}` : phoneNumber;

        const message = `Hello ${name},\nYour invoice ${invoiceId} has been created in Zoho Books! Here is your invoice URL: ${invoiceUrl}`;
        await sendWhatsAppMessage(customerPhone, message);

        return res.status(200).send("OK: Invoice received, WhatsApp message sent");
    } catch (error) {
        console.error("Error handling invoice webhook:", error?.message);
        return res.status(500).send("Error processing invoice webhook");
    }
};

export const salesWhatsAppZoho = async (req, res) => {
    try {
        const payload = req.body;
        console.log("Zoho Books Sales Webhook Data:", payload);
        // Add logic to handle sales messages if needed
        return res.status(200).send("OK: Sales webhook received");
    } catch (error) {
        console.error("Error handling sales webhook:", error?.message);
        return res.status(500).send("Error processing sales webhook");
    }
};
