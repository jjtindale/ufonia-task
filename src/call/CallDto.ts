import { CallInstance } from "twilio/lib/rest/api/v2010/account/call";

export class CallDto {
  constructor(public id: string, public toPhoneNumber: string) {}

  static fromCall(call: CallInstance): CallDto {
    return new CallDto(call.sid, call.to);
  }
}
