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
      locks: {}
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

    // if locked, throw error, else create a lock
    if (!this.topics[topicName].partitionConsumerMapping[consumerName]) {
      this.topics[topicName].partitionConsumerMapping[consumerName] = {
        pointer: 0,
        partition: this.topics[topicName].partitionsFree.pop(),
      };
    }

    const { pointer, partition } =
      this.topics[topicName].partitionConsumerMapping[consumerName];
    this.topics[topicName].partitionConsumerMapping[consumerName].pointer += 1;
    // open lock
    return this.topics[topicName].partitions[partition][pointer];
  }

  deleteConsumer(topicName: string, consumerName: string) {
    if (!this.topics[topicName].partitionConsumerMapping[consumerName]) {
      throw Error("Consumer group not found");
    }

    const { pointer, partition } =
      this.topics[topicName].partitionConsumerMapping[consumerName];
    this.topics[topicName].partitionsFree.push(partition);
    delete this.topics[topicName].partitionConsumerMapping[consumerName];
  }

  debug() {
    return this.topics;
  }
}
