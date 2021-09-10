const Scene = require('node-vk-bot-api/lib/scene');
const Markup = require('node-vk-bot-api/lib/markup');
const phrase = require("../phrases.json")
const db = require("../helpers/database")
const VkBot = require('node-vk-bot-api');

const bot = new VkBot(db.getToken());

module.exports = new Scene('qai', 
async (ctx) => {
  ctx.scene.next();
  await ctx.reply('С какого ты института?', null, Markup
      .keyboard([
        [
          Markup.button('ИТС', 'primary'),
          Markup.button('ИЯЭиТФ', 'primary'),
        ],
        [
          Markup.button('ИПТМ', 'primary'),
          Markup.button('ИРИТ', 'primary'),
        ],
        [
          Markup.button('ИНЭУ', 'primary'),
          Markup.button('ИНЭЛ', 'primary'),
        ],
        [
          Markup.button('ИФХТиМ', 'primary'),
        ],
        [
          Markup.button(phrase.start.to_start)
        ],
      ])
      .oneTime(true));
},
async (ctx) => {
  switch (ctx.message.text){
    case 'ИРИТ':
      {
        ctx.session.dep = 'irit'
        break;
      }
    case 'ИТС':
      {
        ctx.session.dep = 'its'
        break;
      }
    case 'ИНЭЛ':
      {
        ctx.session.dep = 'inel'
        break;
      }
    case 'ИНЭУ':
      {
        ctx.session.dep = 'ineu'
        break;
      }
    case 'ИФХТиМ':
      {
        ctx.session.dep = 'ifhtim'
        break;
      }
    case 'ИЯЭиТФ':
      {
        ctx.session.dep = 'iyaeitf'
        break;
      }
    case 'ИПТМ':
      {
        ctx.session.dep = 'iptm'
        break;
      }
    case phrase.start.to_start:
      {
        ctx.scene.leave();
        break;
      }
    default:
      {
        ctx.scene.leave();
        await ctx.reply('Не понимаю тебя', null, Markup
        .keyboard([
          [
            Markup.button(phrase.start.to_start)
          ]
        ]))
        break;
      }
  }
  ctx.scene.next()
  await ctx.reply('Что тебя интересует?', null)
},
async (ctx) =>{
  ctx.scene.leave();
  let leader = db.getLeader(ctx.session.dep);
  await ctx.reply('Отлично! Тебе ответит '+leader.place+' [id'+leader.id+'|'+ leader.name+']', null, Markup
    .keyboard([
      [
        Markup.button(phrase.start.to_start)
      ]
    ])).then(
      bot.sendMessage(leader.id, 'Вопрос: '+ctx.message.text+'\nЗадает vk.com/id'+ctx.message.from_id)
    )
}
)