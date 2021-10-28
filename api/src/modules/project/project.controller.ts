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
}
