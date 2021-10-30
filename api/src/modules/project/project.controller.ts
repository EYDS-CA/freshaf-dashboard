import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UsePipes,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/joi-validation.pipe';
import { ProjectDto, ProjectReq, ProjectReqJoiSchema } from './project.dto';
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
  @UsePipes(new JoiValidationPipe(ProjectReqJoiSchema))
  async createProject(@Body() projectReq: ProjectReq) {
    return await this.projectService.createProject(projectReq);
  }

  @Put(':id')
  @UsePipes(new JoiValidationPipe(ProjectReqJoiSchema))
  async updateProject(@Req() req, @Body() projectReq: ProjectReq) {
    return await this.projectService.updateProject(req.params?.id, projectReq);
  }

  @Get('/health/check')
  getHealth(): string {
    return 'I am fine, thank you for asking';
  }
}
