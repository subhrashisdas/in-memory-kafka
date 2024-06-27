import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly message: string;

  @IsNumber()
  @IsNotEmpty()
  readonly partition: number;
}
