import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleModule } from './modules/google/google.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [ConfigModule.forRoot(), ProjectModule, GoogleModule],
})
export class AppModule {}
