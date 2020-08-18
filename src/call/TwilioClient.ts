import twilio from "twilio";
import Container, { Service } from "typedi";
import { ConfigService } from "../config/ConfigService";

@Service()
class TwilioClientFactory {
  constructor(private readonly configService: ConfigService) {}

  create(): twilio.Twilio {
    return twilio(
      this.configService.twilioAccountSid(),
      this.configService.twilioAuthToken()
    );
  }
}

Container.set({ id: twilio.Twilio, factory: [TwilioClientFactory, "create"] });
