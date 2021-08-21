import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type AnswerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProjectMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Answer {
  readonly id: string;
  readonly response?: boolean;
  readonly questionId?: string;
  readonly project?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Answer, AnswerMetaData>);
  static copyOf(source: Answer, mutator: (draft: MutableModel<Answer, AnswerMetaData>) => MutableModel<Answer, AnswerMetaData> | void): Answer;
}

export declare class Project {
  readonly id: string;
  readonly name?: string;
  readonly ProjectAnswers?: (Answer | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Project, ProjectMetaData>);
  static copyOf(source: Project, mutator: (draft: MutableModel<Project, ProjectMetaData>) => MutableModel<Project, ProjectMetaData> | void): Project;
}