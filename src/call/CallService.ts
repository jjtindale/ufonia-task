import twilio from "twilio";
import { Service } from "typedi";
import { ConfigService } from "../config/ConfigService";
import { CallDto } from "./CallDto";

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
    const call = await this.twilioClient.calls(id).fetch();
    return call ? CallDto.fromCall(call) : null;
  }

  async makeCall(toPhoneNumber: string): Promise<CallDto> {
    const call = await this.twilioClient.calls.create({
      from: this.fromPhoneNumber,
      to: toPhoneNumber,
    });
    return CallDto.fromCall(call);
  }
}
