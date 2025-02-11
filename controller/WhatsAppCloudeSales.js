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

export const WhatsAppSalesZoho = async (req, res) => {
    try {
        const payload = req.body;
        console.log("Zoho Books Sales Order Webhook Data:", payload);

        // Extracting data from webhook payload
        const salesOrderId = payload.SALESORDER_ID || payload.data?.SALESORDER_ID;
        const totalAmount = payload.TOTAL || payload.data?.TOTAL;
        const statusUrl = payload.STATUS_URL || payload.data?.STATUS_URL;
        const salesOrderDate = payload.SALESORDER_DATE || payload.data?.SALESORDER_DATE;
        const hasGoods = payload.HAS_GOODS || payload.data?.HAS_GOODS;
        const name = payload.CONTACT_NAME || payload.data?.CONTACT_NAME || "Customer";
        const phoneNumber = payload.CONTACT_MOBILE_PHONE || payload.data?.CONTACT_MOBILE_PHONE;

        // Validate sales order ID
        if (!salesOrderId) {
            console.error("No Sales Order ID found in payload");
            return res.status(400).send("No Sales Order ID found");
        }

        // Format phone number (assuming Indian numbers)
        let customerPhone = phoneNumber;
        if (phoneNumber && !phoneNumber.startsWith("+91")) {
            customerPhone = `+91${phoneNumber}`;
        }

        // Message template
        const message = `Hello ${name},\nYour sales order ${salesOrderId} has been created on ${salesOrderDate}. \nTotal Amount: ₹${totalAmount}.\nOrder Status: ${statusUrl}.\nGoods Available: ${hasGoods === "true" ? "Yes" : "No"}.`;

        // Send WhatsApp message
        await sendWhatsAppMessage(customerPhone, message);

        return res.status(200).send("OK: Sales order received, WhatsApp message sent");
    } catch (error) {
        console.error("Error handling sales order webhook:", error?.message);
        return res.status(500).send("Error processing sales order webhook");
    }
};


// export const salesWhatsAppZoho = async (req, res) => {
//     try {
//         const payload = req.body;
//         console.log("Zoho Books Sales Webhook Data:", payload);
//         // Add logic to handle sales messages if needed
//         return res.status(200).send("OK: Sales webhook received");
//     } catch (error) {
//         console.error("Error handling sales webhook:", error?.message);
//         return res.status(500).send("Error processing sales webhook");
//     }
// };
