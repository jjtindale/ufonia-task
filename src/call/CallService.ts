import twilio from "twilio";
import RestException from "twilio/lib/base/RestException";
import { Service } from "typedi";
import { ConfigService } from "../config/ConfigService";
import { CallDto } from "./CallDto";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

@Service()
export class CallService {
  private readonly fromPhoneNumber: string;

  constructor(
    private readonly twilioClient: twilio.Twilio,
    configService: ConfigService
  ) {
    const fromPhoneNumber = configService.fromPhoneNumber();
    if (!fromPhoneNumber) {
      throw new Error(
        "Cannot instantiate CallService without `fromPhoneNumber`."
      );
    }
    this.fromPhoneNumber = fromPhoneNumber;
  }

  async listCalls(): Promise<CallDto[]> {
    return (await this.twilioClient.calls.list()).map(CallDto.fromCall);
  }

  async getCall(id: string): Promise<CallDto | null> {
    try {
      const call = await this.twilioClient.calls(id).fetch();
      return CallDto.fromCall(call);
    } catch (e) {
      if (e instanceof RestException) {
        if (e.status === 404) {
          return null;
        }
      }
      throw e;
    }
  }

  async makeCall(toPhoneNumber: string): Promise<CallDto> {
    const greetingTwiml = new VoiceResponse();
    greetingTwiml.say("Hello!");

    const call = await this.twilioClient.calls.create({
      from: this.fromPhoneNumber,
      to: toPhoneNumber,
      twiml: greetingTwiml.toString(),
    });
    return CallDto.fromCall(call);
  }
}
