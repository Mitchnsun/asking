export interface QuestionType {
  _id?: string
  alias: string
  category?: string
  choices?: string[]
  edition: string
  id: string
  player: string
  question: string
  status: string
  tolerance?: string
  type: 'free' | 'multiple' | 'number'
}
