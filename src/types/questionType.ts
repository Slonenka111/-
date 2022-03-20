enum QUESTIONS_LEVEL {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

interface IAnswerType {
  0: string,
  1: string,
  2: string,
  3: string
}

interface IQuestionBody {
  title: string,
  answer: IAnswerType,
  rightAnswer: 0 | 1 | 2 | 3,
}

interface IQuestionsType {
  [QUESTIONS_LEVEL.Easy]: {[key: number]: IQuestionBody},
  [QUESTIONS_LEVEL.Medium]: {[key: number]: IQuestionBody},
  [QUESTIONS_LEVEL.Hard]:  {[key: number]: IQuestionBody},
}

export type {
  IQuestionsType,
}