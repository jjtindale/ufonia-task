import { mock, MockProxy } from "jest-mock-extended";
import { mockFn } from "jest-mock-extended/lib/Mock";
import twilio from "twilio";
import {
  CallInstance,
  CallListInstance,
} from "twilio/lib/rest/api/v2010/account/call";
import { CallService } from "../../src/call/CallService";
import { ConfigService } from "../../src/config/ConfigService";

let mockTwilio: MockProxy<twilio.Twilio> & twilio.Twilio;
let configService: MockProxy<ConfigService>;
let fromPhoneNumber: string;
let callService: CallService;

beforeAll(() => {
  // deepMock doesn't work on Twilio. Needs further investigation. This workaround works fine for these tests.
  mockTwilio = mock<twilio.Twilio>({
    calls: ({ create: mockFn() } as unknown) as CallListInstance,
  });
  configService = mock<ConfigService>();
  fromPhoneNumber = "+44111111111";
  configService.fromPhoneNumber.mockReturnValue(fromPhoneNumber);
  callService = new CallService(mockTwilio, configService);
});

describe("makeCall()", () => {
  it("should call Twilio to create a call and return the id", async () => {
    const toPhoneNumber = "+442222222222";
    const createdCall = {
      sid: "call-sid",
      to: toPhoneNumber,
      from: fromPhoneNumber,
    } as CallInstance;
    ((mockTwilio.calls as unknown) as MockProxy<
      CallListInstance
    >).create.mockResolvedValue(createdCall);

    const call = await callService.makeCall(toPhoneNumber);

    expect(call.id).toEqual(createdCall.sid);
    expect(call.toPhoneNumber).toEqual(createdCall.to);
    expect(mockTwilio.calls.create).toHaveBeenCalledTimes(1);
    expect(mockTwilio.calls.create).toHaveBeenCalledWith({
      to: toPhoneNumber,
      from: fromPhoneNumber,
      twiml:
        '<?xml version="1.0" encoding="UTF-8"?><Response><Say>Hello!</Say></Response>',
    });
  });
});
