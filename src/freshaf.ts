import useAxios from "axios-hooks"
import { useCallback, useEffect, useState } from "react"
import yaml from 'js-yaml'

const version = '0.1'

export type Level = 'paper' | 'bronze' | 'silver' | 'gold'
export type Category = 'quality' | 'velocity' | 'resilience' | 'security'
export type Scores = Record<Category, { total: number, level: Level, nextThreshold?: number }>

export interface Question {
  id: string,
  summary: string,
  description?: string,
  points: Record<Category, number>
}

export interface Schema {
  version: string,
  questions: Question[]
  thresholds: Record<Category, Record<Level, number>>
}

export interface Answer {
  questionId: string
}

export interface UseFreshAf {
  answers: Answer[]
  schema?: Schema
  scores: Scores

  addAnswer(answer: Answer): void
  deleteAnswer(questionId: string): void
  isAnswered(questionId: string): boolean
}

const startingScores: Scores = {
  quality: { total: 0, level: 'paper' },
  velocity: { total: 0, level: 'paper' },
  resilience: { total: 0, level: 'paper' },
  security: { total: 0, level: 'paper' }
}

export const levels: Level[] = ['paper', 'bronze', 'silver', 'gold']
export const categories: Category[] = ['quality', 'velocity', 'resilience', 'security']

function highestThresholdPassed(thresholds: Record<Level, number>, score: number): { level: Level, nextThreshold?: number } {
  for (let i = 1; i < levels.length; i++) {
    const nextThreshold = thresholds[levels[i]]
    if (score < nextThreshold) {
      return { level: levels[i - 1], nextThreshold }
    }
  }
  return { level: 'gold' }
}

function useFreshAfSchema() {
  const [{ data: freshAfRaw, error }] = useAxios<string>({ url: `./freshaf-${version}.yml`, method: 'get' })
  const [schema, setSchema] = useState<Schema>()

  useEffect(() => {
    if (freshAfRaw) {
      const schema = yaml.load(freshAfRaw) as Schema
      setSchema(schema)
    }
  }, [freshAfRaw, setSchema])

  return { schema, error }
}

export default function useFreshAf(): UseFreshAf {
  const { schema } = useFreshAfSchema()
  const [answered, setAnswered] = useState<Set<string>>(new Set())
  const [answers, setAnswers] = useState<Answer[]>([])
  const [scores, setScores] = useState(startingScores)
  const [questionsById, setQuestionsById] = useState<Record<string, Question>>()

  // Populate the mapping in questionsById
  useEffect(() => {
    if (schema) {
      const result: {[id: string]: Question} = {}
      for (const q of schema.questions) {
        result[q.id] = q
      }
      setQuestionsById(result)
    }
  }, [schema, setQuestionsById])

  // Calculate score totals
  useEffect(() => {
    if (schema && questionsById) {
      (async () => {
        const newScores: Scores = { ...startingScores }
        for (const category of categories) {
          let total = 0
          await Promise.all(answers.map(async (ans) => {
            const question = questionsById[ans.questionId]
            if (question && question.points[category]) {
              total += question.points[category]
            }
          }))
          newScores[category] = {
            total,
            ...highestThresholdPassed(schema.thresholds[category], total)
          }
        }
        setScores(newScores)
      })()
    }
  }, [schema, answers, setScores, questionsById])

  return { 
    schema,
    answers,
    scores,

    addAnswer: useCallback((answer: Answer) => {
      setAnswers(answers => [...answers.filter(ans => ans.questionId !== answer.questionId), answer])
      setAnswered(a => {
        a.add(answer.questionId)
        return a
      })
    }, [setAnswers]),

    deleteAnswer: useCallback((questionId: string) => {
      setAnswers(answers => answers.filter(ans => ans.questionId !== questionId))
      setAnswered(a => {
        a.delete(questionId)
        return a
      })
    }, [setAnswers]),

    isAnswered: useCallback((questionId: string) => {
      return answered.has(questionId)
    },[answered])
  }
}
