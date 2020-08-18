import { Service } from "typedi";

@Service()
export class ConfigService {
  get(key: string): string | undefined {
    return process.env[key];
  }

  twilioAccountSid(): string | undefined {
    return this.get("TWILIO_ACCOUNT_SID");
  }

  twilioAuthToken(): string | undefined {
    return this.get("TWILIO_AUTH_TOKEN");
  }

  fromPhoneNumber(): string | undefined {
    return this.get("FROM_PHONE_NUMBER");
  }
}
