import useAxios from "axios-hooks"
import yaml from 'js-yaml'
import { useEffect, useState } from "react"
import { Answer, saveProject, useGetProject } from "./projects"

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

export interface UseFreshAf {
  answers: Answer[]
  schema?: Schema
  scores: Scores

  setAnswer(answer: Answer): void
  isAnswered(questionId: string): boolean
  saveAnswers(): Promise<void>
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

function useFreshAfSchema(): { schema?: Schema, error?: Error } {
  const [{ data: freshAfRaw, error }] = useAxios<string>({ url: `/freshaf-${version}.yml`, method: 'get' })
  const [schema, setSchema] = useState<Schema>()

  useEffect(() => {
    if (freshAfRaw) {
      const schema = yaml.load(freshAfRaw) as Schema
      setSchema(schema)
    }
  }, [freshAfRaw, setSchema])

  return { schema, error }
}

export default function useFreshAf({ projectId }: { projectId: string }): UseFreshAf {
  const { schema } = useFreshAfSchema()
  const [answered, setAnswered] = useState<Set<string>>(new Set())
  const [answers, setAnswers] = useState<Answer[]>([])
  const [scores, setScores] = useState(startingScores)
  const [questionsById, setQuestionsById] = useState<Record<string, Question>>()
  const { project } = useGetProject(projectId)

  // Load answers initially from the API
  useEffect(() => {
    if (project?.answers) {
      setAnswers(project?.answers)
    }
  }, [project?.answers])

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
          await Promise.all(answers
            .filter(ans => ans.answer !== 'no')
            .map(async (ans) => {
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
        console.log(newScores)
        setScores(newScores)
      })()
    }
  }, [schema, answers, setScores, questionsById])

  return { 
    schema,
    answers,
    scores,

    setAnswer(answer: Answer) {
      setAnswers(answers => [...answers.filter(ans => ans.questionId !== answer.questionId), answer])
      setAnswered(answered => {
        if (answer.answer === 'yes' || answer.answer === 'n/a') {
          answered.add(answer.questionId)
        } else {
          answered.delete(answer.questionId)
        }
        return answered
      })
    },

    isAnswered(questionId: string) {
      return answered.has(questionId)
    },

    async saveAnswers() {
      if (project) {
        await saveProject({ ...project, answers })
      }
    },
  }
}
