import Joi from 'joi';

class Answer {
  readonly id;
  readonly answer;
}

export class ProjectDto {
  id: string;
  name: string;
  answers: Array<Answer>;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

export class ProjectReq {
  readonly name: string;
  readonly answers: Array<Answer>;
  loggedInUser: string;
}

const AnswerJoiSchema = Joi.object({
  id: Joi.string().required(),
  answer: Joi.boolean().required(),
});

export const ProjectReqJoiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  answers: Joi.array().items(AnswerJoiSchema).required(),
  loggedInUser: Joi.string().required().email(),
});
