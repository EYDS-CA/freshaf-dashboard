import { Injectable, NotFoundException } from '@nestjs/common';
import dynamoClient, { TABLE_NAME } from 'src/db/dynamo';
import { ProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
  async getAllProjects() {
    const response = await dynamoClient
      .scan({ TableName: TABLE_NAME })
      .promise();
    return response?.Items.map((projectItem) => projectItem.resource) || [];
  }

  async getProjectByName(name: string) {
    const response = await dynamoClient
      .get({
        TableName: TABLE_NAME,
        Key: {
          PK: `PRO#${name}`,
          SK: `#METADATA#${name}`,
        },
      })
      .promise();

    const project: ProjectDto = response?.Item?.resource;
    if (!project) {
      throw new NotFoundException();
    }
    return project;
  }

  async createOrUpdateProject(project: ProjectDto) {
    const response = await dynamoClient
      .put({
        TableName: TABLE_NAME,
        Item: {
          PK: `PRO#${project.name}`,
          SK: `#METADATA#${project.name}`,
          resource: project,
        },
      })
      .promise();
    return response;
  }
}
