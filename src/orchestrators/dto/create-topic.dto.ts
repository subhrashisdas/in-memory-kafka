import { IsNumber, IsString } from "class-validator";

export class CreateTopicDto {
  @IsString()
  readonly topicName: string;

  @IsNumber()
  readonly partition: number;
}
