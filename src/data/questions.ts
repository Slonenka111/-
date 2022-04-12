//Вопросы брал здесь
//http://gameshows.ru/wiki/%D0%9A%D1%82%D0%BE_%D1%85%D0%BE%D1%87%D0%B5%D1%82_%D1%81%D1%82%D0%B0%D1%82%D1%8C_%D0%BC%D0%B8%D0%BB%D0%BB%D0%B8%D0%BE%D0%BD%D0%B5%D1%80%D0%BE%D0%BC%3F_(%D0%9F%D0%BE%D0%B2%D1%82%D0%BE%D1%80_%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%B0)

export enum QuestionDifficult {
	easy = 'easy',
	medium = 'medium',
	hard = 'hard',
}

type TAnswerNumbers = 1 | 2 | 3 | 4;

export interface IVariants {
	id: TAnswerNumbers;
	text: string;
}

interface IQuestions {
	id: number;
	difficult: QuestionDifficult;
	text: string;
	variants: IVariants[];
	rightAnswer: TAnswerNumbers;
}

const Questions: IQuestions[] = [
	{
		id: 1000,
		difficult: QuestionDifficult.easy,
		text: 'Как называется популярный рецепт приготовления макарон с мясом?',
		variants: [
			{
				id: 1,
				text: 'По-деревенски',
			},
			{
				id: 2,
				text: 'По-флотски',
			},
			{
				id: 3,
				text: 'По-братски',
			},
			{
				id: 4,
				text: 'По-божески',
			},
		],
		rightAnswer: 2,
	},
	{
		id: 1001,
		difficult: QuestionDifficult.easy,
		text: 'Что потерял Ослик Иа в сказке про Винни-Пуха?',
		variants: [
			{
				id: 1,
				text: 'Память',
			},
			{
				id: 2,
				text: 'Совесть',
			},
			{
				id: 3,
				text: 'Зубы',
			},
			{
				id: 4,
				text: 'Хвост',
			},
		],
		rightAnswer: 4,
	},
	{
		id: 1002,
		difficult: QuestionDifficult.easy,
		text: 'Какое слово пропущено в названии пиратского флага «… Роджер»?',
		variants: [
			{
				id: 1,
				text: 'Весёлый',
			},
			{
				id: 2,
				text: 'Одноногий',
			},
			{
				id: 3,
				text: 'Солёный',
			},
			{
				id: 4,
				text: 'Непотопляемый',
			},
		],
		rightAnswer: 1,
	},
	{
		id: 1003,
		difficult: QuestionDifficult.easy,
		text: 'Что является характеристикой коллекционного вина?',
		variants: [
			{
				id: 1,
				text: 'Стойкость',
			},
			{
				id: 2,
				text: 'Выдержка',
			},
			{
				id: 3,
				text: 'Выносливость',
			},
			{
				id: 4,
				text: 'Трезвость',
			},
		],
		rightAnswer: 2,
	},
	{
		id: 1004,
		difficult: QuestionDifficult.easy,
		text: 'Чему равна сумма углов треугольника?',
		variants: [
			{
				id: 1,
				text: '90 градусов',
			},
			{
				id: 2,
				text: '100 градусов',
			},
			{
				id: 3,
				text: '180 градусов',
			},
			{
				id: 4,
				text: '360 градусов',
			},
		],
		rightAnswer: 3,
	},
	{
		id: 1005,
		difficult: QuestionDifficult.easy,
		text: 'Как называют микроавтобусы, совершающие поездки по определённым маршрутам?',
		variants: [
			{
				id: 1,
				text: 'Рейсовка',
			},
			{
				id: 2,
				text: 'Путёвка',
			},
			{
				id: 3,
				text: 'Курсовка',
			},
			{
				id: 4,
				text: 'Маршрутка',
			},
		],
		rightAnswer: 4,
	},
	{
		id: 1006,
		difficult: QuestionDifficult.easy,
		text: 'О чём писал Грибоедов, отмечая, что он «нам сладок и приятен» ?',
		variants: [
			{
				id: 1,
				text: 'Дым Отечества',
			},
			{
				id: 2,
				text: 'Дух купечества',
			},
			{
				id: 3,
				text: 'Дар пророчества',
			},
			{
				id: 4,
				text: 'Пыл девичества',
			},
		],
		rightAnswer: 1,
	},
	{
		id: 1007,
		difficult: QuestionDifficult.easy,
		text: 'Какой специалист занимается изучением неопознанных летающих объектов?',
		variants: [
			{
				id: 1,
				text: 'Кинолог',
			},
			{
				id: 2,
				text: 'Уфолог',
			},
			{
				id: 3,
				text: 'Сексопатолог',
			},
			{
				id: 4,
				text: 'Психиатр',
			},
		],
		rightAnswer: 2,
	},
	{
		id: 2000,
		difficult: QuestionDifficult.medium,
		text: 'Кольцо какого цвета на олимпийском флаге символизирует Европу?',
		variants: [
			{
				id: 1,
				text: 'Жёлтого',
			},
			{
				id: 2,
				text: 'Голубого',
			},
			{
				id: 3,
				text: 'Красного',
			},
			{
				id: 4,
				text: 'Зелёного',
			},
		],
		rightAnswer: 2,
	},
	{
		id: 2001,
		difficult: QuestionDifficult.medium,
		text: 'Как заканчивается первая строчка считалочки: «Аты-баты…»?',
		variants: [
			{
				id: 1,
				text: 'Шли солдаты',
			},
			{
				id: 2,
				text: 'Плыли моряки',
			},
			{
				id: 3,
				text: 'Скакали кавалеристы',
			},
			{
				id: 4,
				text: 'Кричали депутаты',
			},
		],
		rightAnswer: 1,
	},
	{
		id: 2002,
		difficult: QuestionDifficult.medium,
		text: 'Из меха какого животного шьют шапки королевских гвардейцев Великобритании?',
		variants: [
			{
				id: 1,
				text: 'Соболь',
			},
			{
				id: 2,
				text: 'Медведь',
			},
			{
				id: 3,
				text: 'Лиса',
			},
			{
				id: 4,
				text: 'Лама',
			},
		],
		rightAnswer: 2,
	},
	{
		id: 2003,
		difficult: QuestionDifficult.medium,
		text: 'В каком виде спорта разыгрывается Кубок Стэнли?',
		variants: [
			{
				id: 1,
				text: 'Футбол',
			},
			{
				id: 2,
				text: 'Теннис',
			},
			{
				id: 3,
				text: 'Велоспорт',
			},
			{
				id: 4,
				text: 'Хоккей',
			},
		],
		rightAnswer: 4,
	},
	{
		id: 2004,
		difficult: QuestionDifficult.medium,
		text: 'Какой напиток получают из сахарного тростника?',
		variants: [
			{
				id: 1,
				text: 'Джин',
			},
			{
				id: 2,
				text: 'Коньяк',
			},
			{
				id: 3,
				text: 'Ром',
			},
			{
				id: 4,
				text: 'Кальвадос',
			},
		],
		rightAnswer: 3,
	},
	{
		id: 2005,
		difficult: QuestionDifficult.medium,
		text: 'Как называется разновидность воды, в которой атом водорода замещён его изотопом дейтерием?',
		variants: [
			{
				id: 1,
				text: 'Лёгкая',
			},
			{
				id: 2,
				text: 'Средняя',
			},
			{
				id: 3,
				text: 'Тяжёлая',
			},
			{
				id: 4,
				text: 'Невесомая',
			},
		],
		rightAnswer: 3,
	},
	{
		id: 2006,
		difficult: QuestionDifficult.medium,
		text: 'Что такое десница?',
		variants: [
			{
				id: 1,
				text: 'Бровь',
			},
			{
				id: 2,
				text: 'Глаз',
			},
			{
				id: 3,
				text: 'Шея',
			},
			{
				id: 4,
				text: 'Рука',
			},
		],
		rightAnswer: 4,
	},
	{
		id: 2007,
		difficult: QuestionDifficult.medium,
		text: 'В какое море впадает река Урал?',
		variants: [
			{
				id: 1,
				text: 'Каспийское',
			},
			{
				id: 2,
				text: 'Чёрное',
			},
			{
				id: 3,
				text: 'Азовское',
			},
			{
				id: 4,
				text: 'Средиземное',
			},
		],
		rightAnswer: 1,
	},
	{
		id: 3000,
		difficult: QuestionDifficult.hard,
		text: 'Что не входило в рецепт салата оливье в 1894 году?',
		variants: [
			{
				id: 1,
				text: 'Картофель',
			},
			{
				id: 2,
				text: 'Огурцы',
			},
			{
				id: 3,
				text: 'Докторская колбаса',
			},
			{
				id: 4,
				text: 'Оливки',
			},
		],
		rightAnswer: 2,
	},
	{
		id: 3001,
		difficult: QuestionDifficult.hard,
		text: 'В каком конструкторском бюро создали самолёт АНТ-25, на котором экипажи Чкалова и Громова достигли США?',
		variants: [
			{
				id: 1,
				text: 'Туполева',
			},
			{
				id: 2,
				text: 'Антонова',
			},
			{
				id: 3,
				text: 'Ильюшина',
			},
			{
				id: 4,
				text: 'Лавочкина',
			},
		],
		rightAnswer: 1,
	},
	{
		id: 3002,
		difficult: QuestionDifficult.hard,
		text: 'Какой камень венчает Большую императорскую корону Российской империи, хранящуюся в Алмазном фонде?',
		variants: [
			{
				id: 1,
				text: 'Алмаз',
			},
			{
				id: 2,
				text: 'Сапфир',
			},
			{
				id: 3,
				text: 'Благородная шпинель',
			},
			{
				id: 4,
				text: 'Рубин',
			},
		],
		rightAnswer: 3,
	},
	{
		id: 3003,
		difficult: QuestionDifficult.hard,
		text: 'Какой была настоящая фамилия Штирлица, если верить книгам Юлиана Семёнова?',
		variants: [
			{
				id: 1,
				text: 'Исаев',
			},
			{
				id: 2,
				text: 'Тихонов',
			},
			{
				id: 3,
				text: 'Петров',
			},
			{
				id: 4,
				text: 'Владимиров',
			},
		],
		rightAnswer: 4,
	},
	{
		id: 3004,
		difficult: QuestionDifficult.hard,
		text: 'С какой фигуры начинаются соревнования по городошному спорту?',
		variants: [
			{
				id: 1,
				text: 'Часовые',
			},
			{
				id: 2,
				text: 'Артиллерия',
			},
			{
				id: 3,
				text: 'Пулемётное гнездо',
			},
			{
				id: 4,
				text: 'Пушка',
			},
		],
		rightAnswer: 4,
	},
	{
		id: 3005,
		difficult: QuestionDifficult.hard,
		text: 'Каким был самый разгромный счет в истории официальных футбольных матчей?',
		variants: [
			{
				id: 1,
				text: '23:4',
			},
			{
				id: 2,
				text: '46:2',
			},
			{
				id: 3,
				text: '100:1',
			},
			{
				id: 4,
				text: '149:0',
			},
		],
		rightAnswer: 4,
	},
	{
		id: 3006,
		difficult: QuestionDifficult.hard,
		text: 'Сколько раз в сутки подзаводят куранты Спасской башни Кремля?',
		variants: [
			{
				id: 1,
				text: 'Один',
			},
			{
				id: 2,
				text: 'Два',
			},
			{
				id: 3,
				text: 'Три',
			},
			{
				id: 4,
				text: 'Четыре',
			},
		],
		rightAnswer: 2,
	},
	{
		id: 3007,
		difficult: QuestionDifficult.hard,
		text: 'Как назывался каменный монолит, на котором установлен памятник Петру I в Санкт-Петербурге?',
		variants: [
			{
				id: 1,
				text: 'Гром-камень',
			},
			{
				id: 2,
				text: 'Дом-камень',
			},
			{
				id: 3,
				text: 'Гора-камень',
			},
			{
				id: 4,
				text: 'Разрыв-камень',
			},
		],
		rightAnswer: 1,
	},
];

export function getQuestions() {
	return Questions;
}
