import { webhook, MessagingResponse } from "twilio";
import bodyParser from "body-parser";
import express from "express";

const authToken = process.env.TWILIO_AUTH_TOKEN;

const app = express();
const port = 3000;

app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/message", webhook(authToken), (req, res) => {
  // Twilio Messaging URL - receives incoming messages from Twilio
  const response = new MessagingResponse();

  response.message(`Your text to me was ${req.body.Body}.
                    Webhooks are neat :)`);

  res.set("Content-Type", "text/xml");
  res.send(response.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
