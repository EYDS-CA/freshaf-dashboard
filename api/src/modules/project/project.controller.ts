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

  @Get(':projectName')
  async getProjectByName(@Param('projectName') projectName: string) {
    return await this.projectService.getProjectByName(projectName);
  }

  @Post()
  async createOrUpdateProject(@Body() project: ProjectDto) {
    return await this.projectService.createOrUpdateProject(project);
  }

  @Get('/health')
  getHealth(): string {
    return "I am fine, thank you for asking"
  }
}
