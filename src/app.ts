import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import dotenv from "dotenv";

dotenv.config();
useContainer(Container);

export const app = createExpressServer({
  controllers: [__dirname + "/**/*Controller.[jt]s"],
  cors: true,
});
