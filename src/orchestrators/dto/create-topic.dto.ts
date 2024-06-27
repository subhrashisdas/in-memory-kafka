import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTopicDto {
  @IsNotEmpty()
  @IsString()
  readonly topicName: string;

  @IsNumber()
  @IsNotEmpty()
  readonly partitions: number;
}
