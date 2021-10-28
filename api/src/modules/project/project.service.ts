import { Injectable } from '@nestjs/common';
import { Project } from './project.model';

@Injectable()
export class ProjectService {
  private testProjects: Project[] = [{ id: '123', name: 'TEST3' }];

  getProjects(): Project[] {
    return this.testProjects;
  }
}
