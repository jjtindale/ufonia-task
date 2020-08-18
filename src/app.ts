import dotenv from "dotenv";
import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import twilio from "twilio";
import { Container } from "typedi";
import { TwilioClientFactory } from "./call/TwilioClientFactory";

dotenv.config();
useContainer(Container);
Container.set({ id: twilio.Twilio, factory: [TwilioClientFactory, "create"] });

export const app = createExpressServer({
  controllers: [__dirname + "/**/*Controller.[jt]s"],
  cors: true,
});
