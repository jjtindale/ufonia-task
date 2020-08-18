import { IsPhoneNumber } from "class-validator";

export class CreateCallRequest {
  @IsPhoneNumber(null)
  toPhoneNumber: string | undefined;
}
