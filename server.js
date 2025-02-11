import dotenv from 'dotenv';
import express from 'express'
import router from './route/Whatsapp.js';
import cookieParser from 'cookie-parser';
import axios from 'axios'
import bodyParser from 'body-parser'


import { sendWhatsAppMessage } from './controller/WhatsappController.js';
dotenv.config();


const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());




app.get('/', (req, res) => {
    res.send('App is running');
});


app.use('/zoho', router)










// cron.schedule("* * * * *", async () => {
//   console.log("Running AlertNotification every minute for testing...");
//   try {
//     await AlertNotification();
//   } catch (error) {
//     console.error("Error executing AlertNotification:", error);
//   }
// });



// AlertNotification();

// sendWhatsAppMessage('917736724727', 'Running AlertNotification every minute for testing...')

const port = 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

