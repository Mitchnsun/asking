import * as utils from '@/utils/string.utils'
import { QuestionType } from '@/types/Question'

export interface Player {
  alias: string
  answer?: string
  id?: string
}

const ANSWER_TOLERANCE = 0.7

const compareAnswer = (answerA: string | undefined, answerB: string | undefined, isPlayer: boolean): boolean => {
  if (!answerA || !answerB) {
    return false
  }

  const normalizeAnswerA = utils.normalize(answerA.trim()).toLowerCase()
  const normalizeAnswerB = utils.normalize(answerB.trim()).toLowerCase()
  const verification = {
    strict: normalizeAnswerA === normalizeAnswerB,
    contains: isPlayer ? normalizeAnswerA.includes(normalizeAnswerB) : false,
    similar: utils.similarity(normalizeAnswerA, normalizeAnswerB),
  }

  return verification.strict || verification.contains || verification.similar > ANSWER_TOLERANCE
}

const compareNumberAnswer = (answerA: number, answerB: number, tolerance: string | undefined): boolean => {
  const formatTolerance = Number(tolerance)
  if (!isNaN(formatTolerance)) {
    return Math.abs(answerA - answerB) <= formatTolerance
  }

  return answerA === answerB
}

export const point = ({ question, you, other }: { question: QuestionType; you: Player | undefined; other: Player }): number => {
  const result =
    question.type === 'number'
      ? compareNumberAnswer(Number(you?.answer), Number(other.answer), question.tolerance)
      : compareAnswer(you?.answer?.toString(), other.answer?.toString(), other.id === question.player)

  if (other.id === question.player) {
    return result ? 2 : 0
  }

  return result ? 1 : 0
}
