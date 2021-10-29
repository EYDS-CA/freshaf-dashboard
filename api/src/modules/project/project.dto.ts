class Question {
  readonly id;
  readonly text;
  readonly answer;
}

export class ProjectDto {
  readonly name: string;
  readonly questions: Array<Question>;
}
