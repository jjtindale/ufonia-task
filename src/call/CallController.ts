import {
  Body,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Post,
} from "routing-controllers";
import { CallDto } from "./CallDto";
import { CallService } from "./CallService";
import { CreateCallRequest } from "./CreateCallRequest";

@JsonController("/calls")
export class CallController {
  constructor(private callService: CallService) {}

  @Get()
  getAll(): Promise<CallDto[]> {
    return this.callService.listCalls();
  }

  @Get("/:id")
  async getOne(@Param("id") id: string): Promise<CallDto> {
    const call = await this.callService.getCall(id);
    if (!call) {
      throw new NotFoundError();
    }
    return call;
  }

  @Post()
  @HttpCode(201)
  post(@Body({ required: true }) call: CreateCallRequest): Promise<CallDto> {
    return this.callService.makeCall(call.toPhoneNumber!);
  }
}
