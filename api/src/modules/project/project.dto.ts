class Answer {
  readonly id;
  readonly answer;
}

export class ProjectDto {
  id: string;
  readonly name: string;
  readonly answers: Array<Answer>;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}
