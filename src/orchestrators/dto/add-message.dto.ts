import { IsString } from "class-validator";

export class AddMessageDto {
  @IsString()
  readonly message: string;
}
