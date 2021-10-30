import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import dynamoClient, { TABLE_NAME } from 'src/db/dynamo';
import { ProjectDto, ProjectReq } from './project.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class ProjectService {
  async getAllProjects() {
    const response = await dynamoClient
      .scan({ TableName: TABLE_NAME })
      .promise();
    return response?.Items.map((projectItem) => projectItem.resource) || [];
  }

  async getProjectById(id: string) {
    if (!id) {
      throw new BadRequestException();
    }

    const response = await dynamoClient
      .get({
        TableName: TABLE_NAME,
        Key: {
          PK: `PRO#${id}`,
          SK: `#METADATA#${id}`,
        },
      })
      .promise();

    const project: ProjectDto = response?.Item?.resource;
    if (!project) {
      throw new NotFoundException();
    }
    return project;
  }

  async createProject(projectReq: ProjectReq) {
    const project: ProjectDto = {
      id: nanoid(),
      answers: projectReq.answers,
      name: projectReq.name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: projectReq.loggedInUser,
      updated_by: projectReq.loggedInUser,
    };

    await dynamoClient
      .put({
        TableName: TABLE_NAME,
        Item: {
          PK: `PRO#${project.id}`,
          SK: `#METADATA#${project.id}`,
          resource: project,
        },
      })
      .promise();
  }

  async updateProject(id: string, projectReq: ProjectReq) {
    const project = await this.getProjectById(id);

    project.name = projectReq.name;
    project.answers = projectReq.answers;
    project.updated_by = projectReq.loggedInUser;
    project.updated_at = new Date().toISOString();

    await dynamoClient
      .put({
        TableName: TABLE_NAME,
        Item: {
          PK: `PRO#${project.id}`,
          SK: `#METADATA#${project.id}`,
          resource: project,
        },
      })
      .promise();
  }
}
