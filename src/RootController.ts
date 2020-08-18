import { Get, JsonController } from "routing-controllers";

@JsonController("/")
export class RootController {
  @Get()
  get(): string {
    return "Ufonia Task";
  }
}
