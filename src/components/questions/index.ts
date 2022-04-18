import { getQuestions, QuestionDifficult, IVariants } from '../../data/questions';

type TgetQuestion = [questionText: string, questionVariants: IVariants[], questionId: number];

const questions = getQuestions();

const getRandom = (length: number = 1) => {
	return Math.floor(Math.random() * length);
};

const getRandomQuestion = (
	difficult: QuestionDifficult,
	passQuestions?: number[]
): TgetQuestion => {
	const questionsCollection = questions.filter(
		(question) => question.difficult === difficult && !passQuestions?.includes(question.id)
	);

	const question = questionsCollection[getRandom(questionsCollection.length)];
	return [question.text, question.variants, question.id];
};

const getQuestionById = (id: number): TgetQuestion => {
	const question = questions.filter((question) => question.id === id)[0];

	return [question.text, question.variants, question.id];
};

const checkAnswer = (id: number, index: number): boolean => {
	const question = questions.filter((question) => question.id === id)[0];
	return index === question?.rightAnswer;
};

export { getRandomQuestion, getQuestionById, checkAnswer };
export type { TgetQuestion };
