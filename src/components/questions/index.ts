import { getQuestions, QuestionDifficult, IVariants, TAnswerNumbers } from "../../data/questions";

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

const getRightAnswer = (id: number): TAnswerNumbers => {
	const question = questions.filter((question) => question.id === id)[0];
	return question?.rightAnswer;
};

const getCallHint = (id: number, fiftyOption: boolean): number => {
	const question = questions.filter((question) => question.id === id)[0];
	let variants = question.variants
	let countQurstion = 4
	if (fiftyOption){
		console.log(fiftyOption)
		variants =variants.filter((variant) => variant.fiftyHint);
		countQurstion = 2
	}
	const randomAnswer = variants[getRandom(countQurstion)];
	const randomValue = getRandom(10);
	console.log("fiftyOption", fiftyOption, "variants", variants);
	console.log("question.rightAnswer", question.rightAnswer, "randomAnswer", randomAnswer.id, "ranVal", randomValue, randomValue < 5);
	return randomValue < 5	 ? question.rightAnswer : randomAnswer.id;
};

export { getRandomQuestion, getQuestionById, getRightAnswer, getCallHint };
export type { TgetQuestion };
