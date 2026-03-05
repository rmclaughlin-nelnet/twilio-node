import { vi } from "vitest";
vi.setConfig({ testTimeout: 15000 });

import { Twilio, ClientCredentialProviderBuilder } from "twilio";

const clientId = process.env.TWILIO_CLIENT_ID;
const clientSecret = process.env.TWILIO_CLIENT_SECRET;
const accountSid = process.env.TWILIO_ACCOUNT_SID;

const clientCredentialProvider = new ClientCredentialProviderBuilder()
  .setClientId(clientId)
  .setClientSecret(clientSecret)
  .build();

const client = new Twilio();
client.setCredentialProvider(clientCredentialProvider);
client.setAccountSid(accountSid);

test("Should fetch message", () => {
  const messageId = process.env.TWILIO_MESSAGE_SID;
  return client
    .messages(messageId)
    .fetch()
    .then((message) => {
      expect(message).not.toBeNull();
      expect(message).not.toBeUndefined();
      expect(message.sid).toEqual(messageId);
    });
});
