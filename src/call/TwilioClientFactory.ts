import twilio from "twilio";
import { Service } from "typedi";
import { ConfigService } from "../config/ConfigService";

@Service()
export class TwilioClientFactory {
  constructor(private configService: ConfigService) {}

  create(): twilio.Twilio {
    return twilio(
      this.configService.twilioAccountSid(),
      this.configService.twilioAuthToken()
    );
  }
}
