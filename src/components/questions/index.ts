import { getQuestions, QuestionDifficult, IVariants, TAnswerNumbers } from '../../data/questions';

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

const getRightAnswer = (id: number): TAnswerNumbers | undefined => {
	const question = questions.find((question) => question.id === id);
	return question?.rightAnswer;
};

const getCallHint = (id: number, fiftyOption: boolean): string => {
	const question = questions.filter((question) => question.id === id)[0];
	let variants = question.variants,
		countQuestion = 4;
	if (fiftyOption) {
		variants = variants.filter((variant) => variant.fiftyHint);
		countQuestion = 2;
	}
	const randomAnswer = variants[getRandom(countQuestion)];
	const randomValue = getRandom(10);
	const answerNumber = randomValue < 7 ? question.rightAnswer : randomAnswer.id;

	const switchAnswer = (value: number) => {
		let answer = '';
		switch (value) {
			case 1:
				answer = 'A';
				break;
			case 2:
				answer = 'B';
				break;
			case 3:
				answer = 'C';
				break;
			case 4:
				answer = 'D';
		}
		return answer;
	};
	return switchAnswer(answerNumber);
};

export { getRandomQuestion, getQuestionById, getRightAnswer, getCallHint };
export type { TgetQuestion };
