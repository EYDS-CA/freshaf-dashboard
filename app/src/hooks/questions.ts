import { useState } from 'react';
import { Schema, useFreshAfSchema } from './freshaf';

export const useQuestionsHook = () => {
  const [isFetching, setFetching] = useState(false);
  const [questions, setQuestions] = useState<Schema>();

  const getQuestions = async () => {
    try {
      // TODO: This is currently not working
      setFetching(true);
      const schema = await useFreshAfSchema();
      setQuestions(schema.schema);
      setFetching(false);
    } catch (e) {
      console.log(JSON.stringify(e));
      setFetching(false);
    }
  };

  return {
    isFetching,
    getQuestions,
    questions,
  };
};
