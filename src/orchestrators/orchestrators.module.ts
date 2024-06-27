import { Module } from "@nestjs/common";
import { OrchestratorsController } from "./orchestrators.controller";
import { OrchestratorsService } from "./orchestrators.service";

@Module({
  controllers: [OrchestratorsController],
  providers: [OrchestratorsService],
})
export class OrchestratorsModule {}
