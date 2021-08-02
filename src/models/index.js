// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Answer, Project } = initSchema(schema);

export {
  Answer,
  Project
};