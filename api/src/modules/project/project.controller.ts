import { Controller, Get } from '@nestjs/common';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getProjects(): Project[] {
    return this.projectService.getProjects();
  }

  @Get('/health')
  getHealth(): string {
    return "I am fine, thank you for asking"
  }
}
