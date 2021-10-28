import { Module } from '@nestjs/common';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [ProjectModule],
})
export class AppModule {}
