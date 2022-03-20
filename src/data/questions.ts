import {IQuestionsType} from "../types/questionType";

//Вопросы брал здесь
//http://gameshows.ru/wiki/%D0%9A%D1%82%D0%BE_%D1%85%D0%BE%D1%87%D0%B5%D1%82_%D1%81%D1%82%D0%B0%D1%82%D1%8C_%D0%BC%D0%B8%D0%BB%D0%BB%D0%B8%D0%BE%D0%BD%D0%B5%D1%80%D0%BE%D0%BC%3F_(%D0%9F%D0%BE%D0%B2%D1%82%D0%BE%D1%80_%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%B0)

const QUESTIONS: IQuestionsType = {
  easy: {
    0: {
      title: 'Как называется популярный рецепт приготовления макарон с мясом?',
      answer: {
        0: 'По-деревенски',
        1: 'По-флотски',
        2: 'По-братски',
        3: 'По-божески',
      },
      rightAnswer: 1
    },
    1: {
      title: 'Что потерял Ослик Иа в сказке про Винни-Пуха?',
      answer: {
        0: 'Память',
        1: 'Совесть',
        2: 'Зубы',
        3: 'Хвост',
      },
      rightAnswer: 3
    },
  },
  medium: {
    0: {
      title: 'Кольцо какого цвета на олимпийском флаге символизирует Европу?',
      answer: {
        0: 'Жёлтого',
        1: 'Голубого',
        2: 'Красного',
        3: 'Зелёного',
      },
      rightAnswer: 1
    },
  },
  hard: {
    0: {
      title: 'Что не входило в рецепт салата оливье в 1894 году?',
      answer: {
        0: 'Картофель',
        1: 'Огурцы',
        2: 'Докторская колбаса',
        3: 'Оливки',
      },
      rightAnswer: 1
    },
  }
}

export function getQuestions() {
  return QUESTIONS
}