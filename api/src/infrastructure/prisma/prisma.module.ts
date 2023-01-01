import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaModule],
  exports: [PrismaModule]
})
export class PrismaModule {
}
