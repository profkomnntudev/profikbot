const Scene = require("node-vk-bot-api/lib/scene");
const Markup = require("node-vk-bot-api/lib/markup");
const phrase = require("../phrases.json");
const db = require("../helpers/database");
const VkBot = require("node-vk-bot-api");

const bot = new VkBot(db.getToken());

module.exports = new Scene(
	"firstmaytest",
	async ctx => {
		ctx.session.right = 0;
		ctx.scene.next();
		await ctx.reply(
			"В каком году в мире «родился» День международной солидарности трудящихся в борьбе за свои права?",
			null,
			Markup.keyboard([
				[Markup.button("1889")],
				[Markup.button("1792")],
				[Markup.button("2001")],
				[Markup.button("1917")],
			]).oneTime(true)
		);
	},
	async ctx => {
		if (ctx.message.text === "1889") ctx.session.right++;
		ctx.scene.next();
		await ctx.reply(
			"История возникновения праздника 1 мая связана с масштабными митингами и демонстрациями рабочих, которые требовали восьмичасового рабочего дня. Где проходили эти митинги?",
			null,
			Markup.keyboard([
				[Markup.button("В Лондоне")],
				[Markup.button("В Чикаго")],
				[Markup.button(" В Москве")],
				[Markup.button("В Варшаве")],
			]).oneTime(true)
		);
	},
	async ctx => {
		if (ctx.message.text === "В Чикаго") ctx.session.right++;
		ctx.scene.next();
		await ctx.reply(
			"Как назывались народные празднования на природе, проходившие 2 мая?",
			null,
			Markup.keyboard([
				[Markup.button("маевки")],
				[Markup.button("веснянки")],
				[Markup.button("второмайки")],
				[Markup.button("полянки")],
			]).oneTime(true)
		);
	},
	async ctx => {
		if (ctx.message.text === "маевки") ctx.session.right++;
		ctx.scene.next();
		await ctx.reply(
			"Какое название праздник 1 мая носил в СССР с 1918 по 1972 год?",
			null,
			Markup.keyboard([
				[Markup.button("День рабочего класса")],
				[Markup.button("День Интернационала")],
				[Markup.button("Праздник трудового народа")],
				[Markup.button("Международный день равенства")],
			]).oneTime(true)
		);
	},
	async ctx => {
		if (ctx.message.text === "День Интернационала") ctx.session.right++;
		ctx.scene.next();
		await ctx.reply(
			"Где проходил первый парад в Москве, посвященный 1 мая?",
			null,
			Markup.keyboard([
				[Markup.button("На Красной площади")],
				[Markup.button("На Ходынском поле")],
				[Markup.button("На Воробьевых горах")],
				[Markup.button("В Александровском саду")],
			]).oneTime(true)
		);
	},
	async ctx => {
		if (ctx.message.text === "На Ходынском поле") ctx.session.right++;
		ctx.scene.next();
		await ctx.reply(
			"Первым парадом на 1 мая в СССР руководил комиссар по военным делам. Как его звали?",
			null,
			Markup.keyboard([
				[Markup.button("Владимир Ленин")],
				[Markup.button("Лев Троцкий")],
				[Markup.button("Михаил Фрунзе")],
				[Markup.button("Иосиф Сталин")],
			]).oneTime(true)
		);
	},
	async ctx => {
		ctx.scene.next();
		if (ctx.message.text === "Лев Троцкий") ctx.session.right++;
		await ctx.reply(
			"Главный символ первомайской демонстрации в СССР?",
			null,
			Markup.keyboard([
				[Markup.button("Красная звезда")],
				[Markup.button("Кремлевская башня")],
				[Markup.button("Красный флаг")],
				[Markup.button("Серп и молот")],
			]).oneTime(true)
		);
	},
	async ctx => {
		if (ctx.message.text === "Красный флаг") ctx.session.right++;
		ctx.scene.next();
		await ctx.reply(
			"Какие цветы чаще всего дарили на демонстрации 1 мая?",
			null,
			Markup.keyboard([
				[Markup.button("Розы")],
				[Markup.button("Гвоздики")],
				[Markup.button("Сирень")],
				[Markup.button("Тюльпаны")],
			]).oneTime(true)
		);
	},
	async ctx => {
		if (ctx.message.text === "Тюльпаны") ctx.session.right++;
		ctx.scene.next();
		await ctx.reply(
			"Что выдавали всем участникам демонстрации в советское время?",
			null,
			Markup.keyboard([
				[Markup.button("Значок")],
				[Markup.button("Ленточку")],
				[Markup.button("Воздушный шар")],
				[Markup.button("Цветок")],
			]).oneTime(true)
		);
	},
	async ctx => {
		if (ctx.message.text === "Ленточку") ctx.session.right++;
		ctx.scene.next();
		await ctx.reply(
			"Как звучал самый знаменитый первомайский лозунг в СССР?",
			null,
			Markup.keyboard([
				[Markup.button("За работу, товарищи!")],
				[Markup.button("Мир! Труд! Май!")],
				[Markup.button("Будь готов к труду и обороне!")],
				[Markup.button("И жизнь хороша, и жить хорошо!")],
			]).oneTime(true)
		);
	},
	async ctx => {
		if (ctx.message.text === "Мир! Труд! Май!") ctx.session.right++;
		let resultScore = ctx.session.right;
		let result;
		if (resultScore < 3)
			result =
				"Похоже, что кто-то прогуливал пары по истории 😔 Но ничего, у тебя еще есть время исправиться: смотри наше видео и расширяй свой кругозор!";
		if (resultScore >= 3 && resultScore < 6)
			result =
				"Отголоски знаний есть, но этого недостаточно для того, чтобы считать себя истинным знатоком. Может, стоит освежить информацию?";
		if (resultScore >= 6 && resultScore < 9)
			result =
				"Ого, да ты молодец! Почти идеально справился с вопросами — это явно достойно похвалы 👏\nДумаем, посмотрев наше видео, ты точно станешь гуру";
		if (resultScore >= 9)
			result =
				'Не тебя ли мы видели в программе "Самый умный"? Нам точно нужны такие люди, как ты, в Профсоюзе! Давай делиться знаниями вместе)';
		await ctx.reply(
			result,
			null,
			Markup.keyboard([[Markup.button(phrase.start.to_start)], [Markup.button("Попробовать снова!")]]).oneTime(true)
		);
		ctx.scene.leave();
	}
);
