import * as utils from '@/utils/string.utils'

export interface Player {
  alias: string
  answer?: string
  id?: string
}

const ANSWER_TOLERANCE = 0.75

const compareAnswer = (answerA: string | undefined, answerB: string | undefined): boolean => {
  if (!answerA || !answerB) {
    return false
  }

  const normalizeAnswerA = utils.normalize(answerA).toLowerCase()
  const normalizeAnswerB = utils.normalize(answerB).toLowerCase()
  const verification = {
    strict: normalizeAnswerA === normalizeAnswerB,
    contain: normalizeAnswerA.includes(normalizeAnswerB) || normalizeAnswerB.includes(normalizeAnswerA),
    similar: utils.similarity(normalizeAnswerA, normalizeAnswerB),
  }

  return verification.strict || verification.contain || verification.similar > ANSWER_TOLERANCE
}

export const point = ({ you, other, idToQuestion }: { you?: Player; other: Player; idToQuestion: string }): number => {
  if (other.id === idToQuestion) {
    return compareAnswer(you?.answer, other.answer) ? 2 : 0
  }

  return compareAnswer(you?.answer, other.answer) ? 1 : 0
}
