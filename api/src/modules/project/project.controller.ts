import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectDto } from './project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async getAllProjects(): Promise<ProjectDto[]> {
    return await this.projectService.getAllProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') projectId: string) {
    return await this.projectService.getProjectById(projectId);
  }

  @Post()
  async createOrUpdateProject(@Body() project: ProjectDto) {
    return await this.projectService.createOrUpdateProject(project);
  }

  @Get('/health/check')
  getHealth(): string {
    return "I am fine, thank you for asking"
  }
}
