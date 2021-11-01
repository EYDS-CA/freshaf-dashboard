import useAxios from 'axios-hooks';
import yaml from 'js-yaml';
import { useEffect, useState } from 'react';
import { Answer, isEmptyAnswer, saveProject, useGetProject } from './projects';
import deepEqual from 'deep-equal';
import rawYAML from '../constants/freshaf-2.0.yml';

const version = '0.1';

export type Level = 'paper' | 'bronze' | 'silver' | 'gold';
export type Category = 'quality' | 'velocity' | 'resilience' | 'security';
export type Theme =
  | 'environments'
  | 'access controls'
  | 'security'
  | 'privacy'
  | 'deployment'
  | 'availability'
  | 'backups'
  | 'logging'
  | 'alerting'
  | 'testing & debugging'
  | 'accessibility'
  | 'documentation';
export type Scores = Record<Category, { total: number; level: Level; nextThreshold?: number }>;

export interface Question {
  id: string;
  summary: string;
  description?: string;
  points: Record<Category, number>;
}

export interface Schema {
  version: string;
  questions: Question[];
  thresholds: Record<Category, Record<Level, number>>;
}

export interface UseFreshAf {
  answers: Answer[];
  schema?: Schema;
  scores: Scores;
  hasUnsavedChanges: boolean;

  setAnswer(answer: Answer): void;
  getAnswer(questionId: string): Answer;
  saveChanges(): Promise<void>;
}

const startingScores: Scores = {
  quality: { total: 0, level: 'paper' },
  velocity: { total: 0, level: 'paper' },
  resilience: { total: 0, level: 'paper' },
  security: { total: 0, level: 'paper' },
};

export const levels: Level[] = ['paper', 'bronze', 'silver', 'gold'];
export const categories: Category[] = ['quality', 'velocity', 'resilience', 'security'];
export const themes: Theme[] = [
  'environments',
  'access controls',
  'security',
  'privacy',
  'deployment',
  'availability',
  'backups',
  'logging',
  'alerting',
  'testing & debugging',
  'accessibility',
  'documentation',
];

function highestThresholdPassed(
  thresholds: Record<Level, number>,
  score: number,
): { level: Level; nextThreshold?: number } {
  for (let i = 1; i < levels.length; i++) {
    const nextThreshold = thresholds[levels[i]];
    if (score < nextThreshold) {
      return { level: levels[i - 1], nextThreshold };
    }
  }
  return { level: 'gold' };
}

export function useFreshAfSchema(): { schema?: Schema; error?: Error } {
  const [{ data: freshAfRaw, error }] = useAxios<string>({
    url: rawYAML,
    method: 'get',
  });
  const [schema, setSchema] = useState<Schema>();

  useEffect(() => {
    if (freshAfRaw) {
      const schema = yaml.load(freshAfRaw) as Schema;
      setSchema(schema);
    }
  }, [freshAfRaw, setSchema]);

  return { schema, error };
}

export default function useFreshAf({ projectId }: { projectId: string }): UseFreshAf {
  const { schema } = useFreshAfSchema();
  const [answersById, setAnswersById] = useState<Record<string, Answer>>({});
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [scores, setScores] = useState(startingScores);
  const [questionsById, setQuestionsById] = useState<Record<string, Question>>();
  const [unsaved, setUnsaved] = useState<boolean>(false);
  const { project, refetch } = useGetProject(projectId);

  // Load answers initially from the API
  useEffect(() => {
    if (project) {
      setAnswers(project.answers);
      const byId: Record<string, Answer> = {};
      for (const ans of project.answers) {
        byId[ans.questionId] = ans;
      }
      setAnswersById(byId);
    }
  }, [project]);

  // Are there any unsaved changes?
  useEffect(() => {
    if (project) {
      if (answers.length !== project.answers.length) {
        setUnsaved(true);
      } else {
        let foundChange = false;
        for (const savedAnswer of project.answers) {
          const newAnswer = answersById[savedAnswer.questionId];
          if (!deepEqual(savedAnswer, newAnswer)) {
            foundChange = true;
            break;
          }
        }
        setUnsaved(foundChange);
      }
    }
  }, [answers, answersById, project]);

  // Populate the mapping in questionsById
  useEffect(() => {
    if (schema) {
      const result: { [id: string]: Question } = {};
      for (const q of schema.questions) {
        result[q.id] = q;
      }
      setQuestionsById(result);
    }
  }, [schema, setQuestionsById]);

  // Calculate score totals
  useEffect(() => {
    if (schema && questionsById) {
      (async () => {
        const newScores: Scores = { ...startingScores };
        for (const category of categories) {
          let total = 0;
          await Promise.all(
            answers
              .filter((ans) => ans.answer !== 'no')
              .map(async (ans) => {
                const question = questionsById[ans.questionId];
                if (question && question.points[category]) {
                  total += question.points[category];
                }
              }),
          );
          newScores[category] = {
            total,
            ...highestThresholdPassed(schema.thresholds[category], total),
          };
        }
        setScores(newScores);
      })();
    }
  }, [schema, answers, setScores, questionsById]);

  return {
    schema,
    answers,
    scores,
    hasUnsavedChanges: unsaved,

    setAnswer(answer: Answer) {
      setAnswers((answers) => {
        const filtered = [...answers.filter((ans) => ans.questionId !== answer.questionId)];
        if (isEmptyAnswer(answer)) {
          return filtered;
        } else {
          return [...filtered, answer];
        }
      });
      setAnswersById((byId) => {
        if (isEmptyAnswer(answer)) {
          delete byId[answer.questionId];
        } else {
          byId[answer.questionId] = answer;
        }
        return byId;
      });
    },

    getAnswer(questionId: string) {
      return answersById[questionId] || { questionId, answer: 'no' };
    },

    async saveChanges() {
      if (project) {
        await saveProject({ ...project, answers });
        await refetch();
      }
    },
  };
}
