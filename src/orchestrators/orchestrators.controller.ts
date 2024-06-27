import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { OrchestratorsService } from "./orchestrators.service";
import { AddMessageDto } from "./dto/add-message.dto";
import { CreateTopicDto } from "./dto/create-topic.dto";

@ApiBearerAuth()
@ApiTags("orchestration")
@Controller()
export class OrchestratorsController {
  constructor(private readonly orchestratorService: OrchestratorsService) {}

  @Post("topics")
  @ApiOperation({ summary: "Create a new topic" })
  async createTopic(@Body() createTopicDto: CreateTopicDto) {
    this.orchestratorService.createTopic(
      createTopicDto.topicName,
      createTopicDto.partitions,
    );
    return this.orchestratorService.debug();
  }

  @Post("topics/:topicName/messages/")
  @ApiOperation({ summary: "Create a new message" })
  addMessage(
    @Param("topicName") topicName: string,
    @Body() addMessageDto: AddMessageDto,
  ) {
    this.orchestratorService.addMessage(
      topicName,
      addMessageDto.partition,
      addMessageDto.message,
    );
  }

  @Get("topics/:topicName/consumers/:consumerId/messages")
  @ApiOperation({ summary: "Get messages" })
  getMessages(@Param("id") id: string) {}

  @Delete("topics/:topicName/consumers/:consumerId/messages")
  @ApiOperation({ summary: "Delete a consumer group" })
  deleteConsumer() {}

  @Get()
  debug() {
    return this.orchestratorService.debug();
  }
}
