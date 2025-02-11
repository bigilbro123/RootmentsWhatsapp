


const VERIFY_TOKEN = "EAAIxXzYDBZAwBOZCZAncmShNjxNevPFMeiToZCnBmFxnD4HC1uzwIdCF8dYZByq1EofKeXQMfSgcdS6rTtwajw4ZCBEa0SevvLJNxldcZCHGqQbuFpaqpV0nTYrqz0T6ibWIakoUIMCYqTqEvcuZBHRJYIgV7Evio8Ckb6y39uA02GIwTuqhLC675RYc6p7llrmjJwZDZD";

// Webhook verification
export const GETWHATSAPP = async (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
};

// Handle incoming messages
export const POSTWHATSAPP = async (req, res) => {
  console.log("Webhook received:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
};


