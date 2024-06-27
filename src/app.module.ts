import { Module } from "@nestjs/common";
import { OrchestratorsModule } from "./orchestrators/orchestrators.module";

@Module({
  imports: [OrchestratorsModule],
})
export class AppModule {}
