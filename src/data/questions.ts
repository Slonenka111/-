//Вопросы брал здесь
//http://gameshows.ru/wiki/%D0%9A%D1%82%D0%BE_%D1%85%D0%BE%D1%87%D0%B5%D1%82_%D1%81%D1%82%D0%B0%D1%82%D1%8C_%D0%BC%D0%B8%D0%BB%D0%BB%D0%B8%D0%BE%D0%BD%D0%B5%D1%80%D0%BE%D0%BC%3F_(%D0%9F%D0%BE%D0%B2%D1%82%D0%BE%D1%80_%D0%B2%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%B0)

export enum QuestionDifficult {
	easy = "easy",
	medium = "medium",
	hard = "hard",
}

type TAnswerNumbers = 0 | 1 | 2 | 3;

interface IQuestions {
	id: number;
	difficult: QuestionDifficult;
	text: string;
	variants: [string, string, string, string];
	rightAnswer: TAnswerNumbers;
}

const Questions: IQuestions[] = [
	{
		id: 1000,
		difficult: QuestionDifficult.easy,
		text: "Как называется популярный рецепт приготовления макарон с мясом?",
		variants: ["По-деревенски", "По-флотски", "По-братски", "По-божески"],
		rightAnswer: 1,
	},
	{
		id: 1001,
		difficult: QuestionDifficult.easy,
		text: "Что потерял Ослик Иа в сказке про Винни-Пуха?",
		variants: ["Память", "Совесть", "Зубы", "Хвост"],
		rightAnswer: 3,
	},
	{
		id: 1002,
		difficult: QuestionDifficult.easy,
		text: "Какое слово пропущено в названии пиратского флага «… Роджер»?",
		variants: ["Весёлый", "Одноногий", "Солёный", "Непотопляемый"],
		rightAnswer: 0,
	},
	{
		id: 1003,
		difficult: QuestionDifficult.easy,
		text: "Что является характеристикой коллекционного вина?",
		variants: ["Стойкость", "Выдержка", "Выносливость", "Трезвость"],
		rightAnswer: 1,
	},
	{
		id: 1004,
		difficult: QuestionDifficult.easy,
		text: "Чему равна сумма углов треугольника?",
		variants: ["90 градусов", "100 градусов", "180 градусов", "360 градусов"],
		rightAnswer: 2,
	},
	{
		id: 1005,
		difficult: QuestionDifficult.easy,
		text: "Как называют микроавтобусы, совершающие поездки по определённым маршрутам?",
		variants: ["Рейсовка", "Путёвка", "Курсовка", "Маршрутка"],
		rightAnswer: 3,
	},
	{
		id: 1006,
		difficult: QuestionDifficult.easy,
		text: "О чём писал Грибоедов, отмечая, что он «нам сладок и приятен» ?",
		variants: ["Дым Отечества", "Дух купечества", "Дар пророчества", "Пыл девичества"],
		rightAnswer: 0,
	},
	{
		id: 1007,
		difficult: QuestionDifficult.easy,
		text: "Какой специалист занимается изучением неопознанных летающих объектов?",
		variants: ["Кинолог", "Уфолог", "Сексопатолог", "Психиатр"],
		rightAnswer: 1,
	},
	{
		id: 2000,
		difficult: QuestionDifficult.medium,
		text: "Кольцо какого цвета на олимпийском флаге символизирует Европу?",
		variants: ["Жёлтого", "Голубого", "Красного", "Зелёного"],
		rightAnswer: 1,
	},
	{
		id: 2001,
		difficult: QuestionDifficult.medium,
		text: "Как заканчивается первая строчка считалочки: «Аты-баты…»?",
		variants: ["Шли солдаты", "Плыли моряки", "Скакали кавалеристы", "Кричали депутаты"],
		rightAnswer: 0,
	},
	{
		id: 2002,
		difficult: QuestionDifficult.medium,
		text: "Из меха какого животного шьют шапки королевских гвардейцев Великобритании?",
		variants: ["Соболь", "Медведь", "Лиса", "Лама"],
		rightAnswer: 1,
	},
	{
		id: 2003,
		difficult: QuestionDifficult.medium,
		text: "В каком виде спорта разыгрывается Кубок Стэнли?",
		variants: ["Футбол", "Теннис", "Велоспорт", "Хоккей"],
		rightAnswer: 3,
	},
	{
		id: 2004,
		difficult: QuestionDifficult.medium,
		text: "Какой напиток получают из сахарного тростника?",
		variants: ["Джин", "Коньяк", "Ром", "Кальвадос"],
		rightAnswer: 2,
	},
	{
		id: 2005,
		difficult: QuestionDifficult.medium,
		text: "Как называется разновидность воды, в которой атом водорода замещён его изотопом дейтерием?",
		variants: ["Лёгкая", "Средняя", "Тяжёлая", "Невесомая"],
		rightAnswer: 2,
	},
	{
		id: 2006,
		difficult: QuestionDifficult.medium,
		text: "Что такое десница?",
		variants: ["Бровь", "Глаз", "Шея", "Рука"],
		rightAnswer: 3,
	},
	{
		id: 2007,
		difficult: QuestionDifficult.medium,
		text: "В какое море впадает река Урал?",
		variants: ["Каспийское", "Чёрное", "Азовское", "Средиземное"],
		rightAnswer: 0,
	},
	{
		id: 3000,
		difficult: QuestionDifficult.hard,
		text: "Что не входило в рецепт салата оливье в 1894 году?",
		variants: ["Картофель", "Огурцы", "Докторская колбаса", "Оливки"],
		rightAnswer: 1,
	},
	{
		id: 3001,
		difficult: QuestionDifficult.hard,
		text: "В каком конструкторском бюро создали самолёт АНТ-25, на котором экипажи Чкалова и Громова достигли США?",
		variants: ["Туполева", "Антонова", "Ильюшина", "Лавочкина"],
		rightAnswer: 0,
	},
	{
		id: 3002,
		difficult: QuestionDifficult.hard,
		text: "Какой камень венчает Большую императорскую корону Российской империи, хранящуюся в Алмазном фонде?",
		variants: ["Алмаз", "Сапфир", "Благородная шпинель", "Рубин"],
		rightAnswer: 2,
	},
	{
		id: 3003,
		difficult: QuestionDifficult.hard,
		text: "Какой была настоящая фамилия Штирлица, если верить книгам Юлиана Семёнова?",
		variants: ["Исаев", "Тихонов", "Петров", "Владимиров"],
		rightAnswer: 3,
	},
	{
		id: 3004,
		difficult: QuestionDifficult.hard,
		text: "С какой фигуры начинаются соревнования по городошному спорту?",
		variants: ["Часовые", "Артиллерия", "Пулемётное гнездо", "Пушка"],
		rightAnswer: 3,
	},
	{
		id: 3005,
		difficult: QuestionDifficult.hard,
		text: "Каким был самый разгромный счет в истории официальных футбольных матчей?",
		variants: ["23:4", "46:2", "100:1", "149:0"],
		rightAnswer: 3,
	},
	{
		id: 3006,
		difficult: QuestionDifficult.hard,
		text: "Сколько раз в сутки подзаводят куранты Спасской башни Кремля?",
		variants: ["Один", "Два", "Три", "Четыре"],
		rightAnswer: 1,
	},
	{
		id: 3007,
		difficult: QuestionDifficult.hard,
		text: "Как назывался каменный монолит, на котором установлен памятник Петру I в Санкт-Петербурге?",
		variants: ["Гром-камень", "Дом-камень", "Гора-камень", "Разрыв-камень"],
		rightAnswer: 0,
	},
];

export function getQuestions() {
	return Questions;
}
