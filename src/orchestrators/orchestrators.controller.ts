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
    return "ok";
  }

  @Post("topics/:topicName/messages/")
  @ApiOperation({ summary: "Add a new message" })
  addMessage(
    @Param("topicName") topicName: string,
    @Body() addMessageDto: AddMessageDto,
  ) {
    this.orchestratorService.addMessage(
      topicName,
      addMessageDto.partition,
      addMessageDto.message,
    );
    return "ok";
  }

  @Get("topics/:topicName/consumers/:consumerName/messages")
  @ApiOperation({ summary: "Get messages" })
  getMessages(
    @Param("topicName") topicName: string,
    @Param("consumerName") consumerName: string,
  ) {
    return this.orchestratorService.getMessages(topicName, consumerName);
  }

  @Delete("topics/:topicName/consumers/:consumerId")
  @ApiOperation({ summary: "Delete a consumer group" })
  deleteConsumer(
    @Param("topicName") topicName: string,
    @Param("consumerName") consumerName: string,
  ) {
    return this.orchestratorService.deleteConsumer(topicName, consumerName);
    return "ok";
  }

  @Get("debug")
  debug() {
    return this.orchestratorService.debug();
  }
}
