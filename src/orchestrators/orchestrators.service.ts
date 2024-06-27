import { Injectable } from "@nestjs/common";

@Injectable()
export class OrchestratorsService {
  private topics: any = {};

  createTopic(topicName: string, partitions: number) {
    this.topics[topicName as string] = {
      partitionConsumerMapping: {},
      partitionsFree: Array.from(
        { length: partitions as number },
        (_, index) => index,
      ),
      partitions: {},
    };
  }

  addMessage(topicName: string, partition: number, message: String) {
    if (!this.topics[String(topicName)]?.partitions[String(partition)]) {
      this.topics[String(topicName)].partitions[String(partition)] = [];
    }
    this.topics[String(topicName)]?.partitions[String(partition)].push(message);
  }

  getMessages(topicName: string, consumerName: string) {
    if (!this.topics[topicName]) {
      throw new Error("Topic not found");
    }

    if (!this.topics[topicName].partitionConsumerMapping[consumerName]) {
      this.topics[topicName].partitionConsumerMapping[consumerName] = {
        pointer: 0,
        partition: this.topics[topicName].partitionsFree.pop(),
      };
    }

    const { pointer, partition } =
      this.topics[topicName].partitionConsumerMapping[consumerName];
    this.topics[topicName].partitionConsumerMapping[consumerName].pointer += 1;
    return this.topics[topicName].partitions[partition][pointer];
  }

  deleteConsumer() {}

  debug() {
    return this.topics;
  }
}
