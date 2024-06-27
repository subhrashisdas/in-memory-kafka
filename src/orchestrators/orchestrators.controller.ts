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
      createTopicDto.partition,
    );
    return this.orchestratorService.debug();
  }

  @Post("topics/:topicName/partition/:partitionId/messages/")
  @ApiOperation({ summary: "Create a new message" })
  addMessage(@Param("id") id: string) {}

  @Get(
    "consumers-groups/:consumerGroupName/consumers/:consumerId/topics/:topicName/messages/",
  )
  @ApiOperation({ summary: "Get messages" })
  getMessages(@Param("id") id: string) {}

  @Delete("consumers-groups/:consumerGroupName/consumers/:consumerId")
  @ApiOperation({ summary: "Delete a consumer group" })
  deleteConsumer() {}
}
