import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [ConfigModule.forRoot(), ProjectModule],
})
export class AppModule {}
