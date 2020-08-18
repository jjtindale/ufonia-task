import { classToPlain } from "class-transformer";
import { mock, MockProxy } from "jest-mock-extended";
import supertest from "supertest";
import Container from "typedi";
import { app } from "../../src/app";
import { CallDto } from "../../src/call/CallDto";
import { CallService } from "../../src/call/CallService";
import { CreateCallRequest } from "../../src/call/CreateCallRequest";

let callService: MockProxy<CallService>;

beforeAll(() => {
  callService = mock<CallService>();
  Container.set(CallService, callService);
});

describe("GET /calls", () => {
  it("should return 200 with calls when CallService returns calls", async () => {
    const call = new CallDto("call-id", "+441234567890");
    const calls = [call];
    callService.listCalls.mockResolvedValue(calls);

    await supertest(app).get("/calls").expect(200, classToPlain(calls));
  });
});

describe("GET /calls/:id", () => {
  it("should return 200 with call when CallService returns a call", async () => {
    const call = new CallDto("call-id", "+441234567890");
    callService.getCall.mockResolvedValue(call);

    await supertest(app)
      .get("/calls/" + call.id)
      .expect(200, classToPlain(call));

    expect(callService.getCall).toHaveBeenCalledWith(call.id);
  });
  it("should return 404 when CallService doesn't return a call", async () => {
    const callId = "1";
    callService.getCall.mockResolvedValue(null);

    await supertest(app)
      .get("/calls/" + callId)
      .expect(404);

    expect(callService.getCall).toHaveBeenCalledWith(callId);
  });
});

describe("POST /calls", () => {
  it("should invoke call service when request has valid phone number", async () => {
    const toPhoneNumber = "+441234567890";
    const createdCall = new CallDto("the-call-id", toPhoneNumber);
    callService.makeCall.mockResolvedValue(createdCall);

    const request = new CreateCallRequest();
    request.toPhoneNumber = toPhoneNumber;

    await supertest(app)
      .post("/calls")
      .send(request)
      .expect(201, classToPlain(createdCall));

    expect(callService.makeCall).toHaveBeenCalledTimes(1);
    expect(callService.makeCall).toHaveBeenCalledWith(request.toPhoneNumber);
  });

  it("should return 400 when request has invalid phone number", async () => {
    const request = new CreateCallRequest();
    request.toPhoneNumber = "invalid phone number";

    await supertest(app).post("/calls").send(request).expect(400);
  });
  it("should return 400 when request has no phone number", async () => {
    const request = new CreateCallRequest();

    await supertest(app).post("/calls").send(request).expect(400);
  });
});
