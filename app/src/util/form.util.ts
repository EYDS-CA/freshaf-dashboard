import { Answer, Project } from '../hooks/projects';

export class FormUtil {
  answers: any = {};

  constructor(project: Project) {
    this.makeInitialFormikValues(project?.answers || []);
  }

  makeInitialFormikValues(answers: Answer[]) {
    for (const answer of answers) {
      switch (answer.answer) {
        case 'yes':
          this.answers[answer.questionId] = true;
          break;
        case 'no':
          this.answers[answer.questionId] = false;
          break;
        case 'n/a':
          break;
      }
    }
  }

  build() {
    return this.answers;
  }
}
